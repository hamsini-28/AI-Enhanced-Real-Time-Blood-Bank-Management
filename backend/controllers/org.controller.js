// backend/controllers/org.controller.js

const { validationResult } = require("express-validator");
const OrgModel = require("../models/org.model");
const BloodStockModel = require("../models/bloodStock.model");
const BloodDonationOrgModel = require("../models/donateBloodOrg.model");
const EventModel = require("../models/event.model");
const orgService = require("../services/org.service");
const { getAutoSuggestions, getAddressCoordinates } = require("../services/location.service");


// ✅ SIGNUP — Organization Registration
module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ msg: "Invalid input", errors: errors.array() });

  try {
    const { orgName, email, password, registrationNumber, orgType } = req.body;

    const existingOrg = await OrgModel.findOne({ email });
    if (existingOrg) return res.status(400).json({ msg: "Organization already exists" });

    const org = new OrgModel({ orgName, email, password, registrationNumber, orgType });
    await org.save();

    const bloodStock = await BloodStockModel.create({ organization: org._id });
    const donation = await BloodDonationOrgModel.create({ organization: org._id });

    org.bloodStock = bloodStock._id;
    org.donateBlood = donation._id;
    await org.save();

    const token = org.generateAuthToken();

    res.status(201).json({
      msg: "Organization created successfully ✅",
      org,
      token,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// ✅ SIGNIN — Organization Login
module.exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ msg: "Invalid input", errors: errors.array() });

  try {
    const { email, password } = req.body;
    const org = await OrgModel.findOne({ email }).select("+password");

    if (!org) return res.status(400).json({ msg: "Organization not found" });

    const isMatch = await org.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = org.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      msg: "Organization logged in successfully ✅",
      org,
      token,
    });
  } catch (error) {
    console.error("❌ Signin error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// ✅ UPDATE Organization Info
module.exports.updateOrg = async (req, res) => {
  try {
    const org = req.org;
    const { address, timings, contactNumber, recievingBlood, recievingBloodTypes } = req.body;

    if (!address || !timings || !contactNumber) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const autoComplete = await getAutoSuggestions(address);
    const location = await getAddressCoordinates(autoComplete[0].display_name);

    const updatedOrg = await orgService.updateOrg(org._id, {
      timings,
      contactNumber,
      recievingBlood,
      recievingBloodTypes,
      location: {
        type: "Point",
        address,
        coordinates: [location.lng, location.lat],
      },
    });

    res.status(200).json({ msg: "Organization updated successfully", org: updatedOrg });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// ✅ CREATE EVENT
module.exports.createEvent = async (req, res) => {
  try {
    const org = req.org;
    const { title, description, type, date, time, venue, goal, address } = req.body;

    if (!title || !description || !type || !date || !time || !venue || !address || !goal)
      return res.status(400).json({ msg: "All fields are required" });

    const event = await orgService.createEvent(org._id, title, type, description, date, time, venue, address, goal);

    res.status(201).json({ msg: "Event created successfully ✅", event });
  } catch (error) {
    console.error("❌ Event creation error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// ✅ GET ORG EVENTS
module.exports.getEvents = async (req, res) => {
  try {
    const org = req.org;
    const events = await EventModel.find({ organizerId: org._id }).sort({ date: 1 });

    res.status(200).json({ msg: "Events fetched successfully", events });
  } catch (error) {
    console.error("❌ Get events error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// ✅ GET UPCOMING BLOOD DRIVES (Next 7 days + 20 km radius)
module.exports.getUpcomingDrives = async (req, res) => {
  try {
    const org = req.org;

    // Fallback location if org doesn't have coords
    let lng = 78.4867, lat = 17.3850; // Default: Hyderabad
    if (org?.location?.coordinates?.length >= 2) {
      [lng, lat] = org.location.coordinates;
    }

    const now = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(now.getDate() + 7);

    // Optional type filter
    const { type } = req.query;

    const filter = {
      date: { $gte: now, $lte: sevenDaysLater },
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 20000, // 20 km
        },
      },
      status: "upcoming",
    };

    if (type) filter.type = type;

    const upcomingEvents = await EventModel.find(filter).sort({ date: 1 });

    // ✅ Summarize results
    const summary = {
      totalUpcoming: upcomingEvents.length,
      schoolDrives: upcomingEvents.filter((e) => e.type === "School Drives").length,
      communityDrives: upcomingEvents.filter((e) => e.type === "Community Drives").length,
      corporateEvents: upcomingEvents.filter((e) => e.type === "Corporate Events").length,
    };

    res.status(200).json({
      msg: "Upcoming drives within next 7 days and 20 km",
      summary,
      events: upcomingEvents,
    });
  } catch (error) {
    console.error("❌ getUpcomingDrives error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

/*const { validationResult } = require("express-validator");
const OrgModel = require("../models/org.model");
const BloodStockModel = require("../models/bloodStock.model");
const BloodDonationOrgModel = require("../models/donateBloodOrg.model");
const EventModel = require("../models/event.model");
const orgService = require("../services/org.service");
const { getAutoSuggestions, getAddressCoordinates } = require("../services/location.service");

// ✅ SIGNUP — Organization Registration
module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ msg: "Invalid input", errors: errors.array() });

  try {
    const { orgName, email, password, registrationNumber, orgType } = req.body;
    const existingOrg = await OrgModel.findOne({ email });
    if (existingOrg) return res.status(400).json({ msg: "Organization already exists" });

    const org = new OrgModel({ orgName, email, password, registrationNumber, orgType });
    await org.save();

    const bloodStock = await BloodStockModel.create({ organization: org._id });
    const donation = await BloodDonationOrgModel.create({ organization: org._id });

    org.bloodStock = bloodStock._id;
    org.donateBlood = donation._id;
    await org.save();

    const token = org.generateAuthToken();
    res.status(201).json({ msg: "Organization created successfully ✅", org, token });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ SIGNIN — Organization Login
module.exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ msg: "Invalid input", errors: errors.array() });

  try {
    const { email, password } = req.body;
    const org = await OrgModel.findOne({ email }).select("+password");
    if (!org) return res.status(400).json({ msg: "Organization not found" });

    const isMatch = await org.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = org.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ msg: "Organization logged in successfully ✅", org, token });
  } catch (error) {
    console.error("❌ Signin error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ UPDATE Organization Info
module.exports.updateOrg = async (req, res) => {
  try {
    const org = req.org;
    const { address, timings, contactNumber, recievingBlood, recievingBloodTypes } = req.body;
    if (!address || !timings || !contactNumber) return res.status(400).json({ msg: "All fields are required" });

    const autoComplete = await getAutoSuggestions(address);
    const location = await getAddressCoordinates(autoComplete[0].display_name);

    const updatedOrg = await orgService.updateOrg(org._id, {
      timings,
      contactNumber,
      recievingBlood,
      recievingBloodTypes,
      location: {
        type: "Point",
        address,
        coordinates: [location.lng, location.lat],
      },
    });

    res.status(200).json({ msg: "Organization updated successfully", org: updatedOrg });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ CREATE EVENT
module.exports.createEvent = async (req, res) => {
  try {
    const org = req.org;
    const { title, description, type, date, time, venue, goal, address } = req.body;

    if (!title || !description || !type || !date || !time || !venue || !address || !goal)
      return res.status(400).json({ msg: "All fields are required" });

    const event = await orgService.createEvent(org._id, title, type, description, date, time, venue, address, goal);
    res.status(201).json({ msg: "Event created successfully ✅", event });
  } catch (error) {
    console.error("❌ Event creation error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ GET ORG EVENTS
module.exports.getEvents = async (req, res) => {
  try {
    const org = req.org;
    const events = await EventModel.find({ organizerId: org._id }).sort({ date: 1 });
    res.status(200).json({ msg: "Events fetched successfully", events });
  } catch (error) {
    console.error("❌ Get events error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ GET UPCOMING BLOOD DRIVES (Filter by date, range, and type)
module.exports.getUpcomingDrives = async (req, res) => {
  try {
    const org = req.org;
    if (!org?.location?.coordinates || org.location.coordinates.length < 2) {
      return res.status(400).json({ msg: "Organization location not found" });
    }

    const [lng, lat] = org.location.coordinates;
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(now.getMonth() + 3);

    // Optional filters
    const { type } = req.query;

    const filter = {
      date: { $gte: now, $lte: threeMonthsLater },
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 20000, // 20km
        },
      },
      status: "upcoming",
    };
    if (type) filter.type = type; // filter by checkbox type (e.g., School Drives)

    const nearbyEvents = await EventModel.find(filter).sort({ date: 1 });

    // ✅ Summarize for quick UI
    const summary = {
      totalUpcoming: nearbyEvents.length,
      schoolDrives: nearbyEvents.filter(e => e.type === "School Drives").length,
      communityDrives: nearbyEvents.filter(e => e.type === "Community Drives").length,
      corporateEvents: nearbyEvents.filter(e => e.type === "Corporate Events").length,
    };

    res.status(200).json({
      msg: "Upcoming events within 20 km and next 3 months",
      summary,
      events: nearbyEvents,
    });
  } catch (error) {
    console.error("❌ getUpcomingDrives error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};
*/