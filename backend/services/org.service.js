// backend/services/org.service.js
const EventModel = require("../models/event.model");
const OrgModel = require("../models/org.model");
const { getAddressCoordinates, getAutoSuggestions } = require("./location.service");

// ✅ Create Org (handled in controller usually)
module.exports.createOrg = async (orgName, email, password, orgType, registrationNumber) => {
  if (!orgName || !email || !password || !orgType) {
    throw new Error("All fields are required");
  }

  // Mongoose pre-save will hash password
  const org = new OrgModel({ orgName, email, password, orgType, registrationNumber });
  await org.save();
  return org;
};


// ✅ Update Organization Info
module.exports.updateOrg = async (orgId, orgData) => {
  if (!orgId || !orgData) throw new Error("Organization ID and data are required");

  const updatedOrg = await OrgModel.findByIdAndUpdate(orgId, orgData, { new: true });
  if (!updatedOrg) throw new Error("Organization not found");

  return updatedOrg;
};


// ✅ Create Event
module.exports.createEvent = async (orgId, title, type, description, date, time, venue, address, goal) => {
  if (!orgId || !title || !type || !description || !date || !time || !venue || !address || !goal) {
    throw new Error("All fields are required");
  }

  try {
    const fullAddress = `${venue}, ${address}`;
    const autoComplete = await getAutoSuggestions(fullAddress);
    let coordinates = [78.4867, 17.385]; // default Hyderabad coords

    if (autoComplete?.length > 0) {
      const loc = await getAddressCoordinates(autoComplete[0].display_name);
      coordinates = [loc.lng, loc.lat];
    }

    const eventData = {
      organizerId: orgId,
      title,
      type,
      description,
      date,
      time,
      venue,
      address,
      goal,
      location: {
        type: "Point",
        address,
        coordinates,
      },
    };

    const event = await EventModel.create(eventData);
    return event;
  } catch (error) {
    console.error("❌ Error in createEvent service:", error);
    throw new Error("Failed to create event");
  }
};
