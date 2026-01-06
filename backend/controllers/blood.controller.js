const OrgModel = require("../models/org.model");
const { default: mongoose } = require("mongoose");
const bloodServices = require("../services/blood.service");
const StoryModel = require("../models/story.model");

module.exports.getEvents = async (req, res) => {
  try {
    let { range, types, daysRange } = req.query;
    range = range ? parseInt(range) : 2000;
    daysRange = daysRange ? parseInt(daysRange) : 200;
    const events = await bloodServices.getEvents(range, types, daysRange);
    if (!events) {
      return res.status(404).json({ msg: "No events found" });
    }
    res.status(200).json({ msg: "Events fetched successfully", events });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ msg: "Invalid event ID" });
    }
    const event = await bloodServices.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json({ msg: "Event fetched successfully", event });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// ✅ New automatic location-based nearby center fetch (Only 3)
module.exports.allOrgs = async (req, res) => {
  try {
    const { location } = req.query; // lat,lng

    if (!location) {
      return res.status(400).json({ msg: "Location is required" });
    }

    const [lat, lng] = location.split(",").map(Number);

    const orgs = await OrgModel.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 10000 // 10 km radius
        }
      },
      { $sort: { distance: 1 } },
      { $limit: 3 } // ✅ Only show 3 nearest
    ]);

    res.status(200).json({ msg: "Organizations fetched successfully", orgs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports.getOrgById = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    if (!mongoose.Types.ObjectId.isValid(orgId)) {
      return res.status(400).json({ msg: "Invalid organization ID" });
    }
    const org = await bloodServices.getOrgById(orgId);
    if (!org) {
      return res.status(404).json({ msg: "Organization not found" });
    }
    res.status(200).json({ msg: "Organization fetched successfully", org });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports.getAllStories = async (req, res) => {
  try {
    const stories = await StoryModel.find().populate("user", "fullname email");
    const filteredStories = stories.map((x) => ({
      name: x.user.fullname,
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
      comment: x.story,
      tag: x.tag,
      timeStamp: x.createdAt.toDateString(),
    }));
    res
      .status(200)
      .json({ msg: "Stories fetched successfully", stories: filteredStories });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
