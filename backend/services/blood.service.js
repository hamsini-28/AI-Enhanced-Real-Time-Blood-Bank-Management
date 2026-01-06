const DonateBloodModel = require("../models/donateBlood.model");
const EventModel = require("../models/event.model");
const MatchModel = require("../models/match.model");
const OrgModel = require("../models/org.model");
const RequestBloodModel = require("../models/requestBlood.model");
const { getAddressCoordinates, getUsersInTheRadius, getOrgsInTheRadius, getDistanceTime } = require("./location.service");


const getEvents = async (range, types, daysRange) => {
  const query = {};

  // ✅ type filter
if (Array.isArray(types)) {
  if (types.length > 0) {
    query.type = { $in: types };
  } else {
    // Empty array should mean "no events"
    query.type = { $in: [] };
  }
}

  // ✅ days filter
  if (daysRange) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Number(daysRange));
    query.date = { $gte: startDate, $lte: endDate };
    query.status = { $in: ['upcoming', 'ongoing'] };
  }

  // ✅ location + range filter
  if (range && range.coordinates && range.radius) {
    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [range.coordinates.lng, range.coordinates.lat]
        },
        $maxDistance: range.radius * 1000 // km → meters
      }
    };
  }

  // ✅ Fetch events after all filters applied
  const events = await EventModel.find(query)
    .populate("organizerId", "orgName contactNumber email");

  const filteredEvents = events.map(event => ({
    title: event.title,
    date: event.date.toDateString(),
    time: event.time,
    venue: event.venue,
    address: event.location.address,
    organizer: event.organizerId.orgName,
    goal: event.goal,
    registered: event.registered,
    progress: Math.min((event.registered / event.goal) * 100, 100).toFixed(2),
    status: event.status,
    description: event.description,
    id: event._id
  }));

  return filteredEvents;
};


const getEventById = async (eventId) => {
    const event = await EventModel.findById(eventId).populate("organizerId", "orgName contactNumber email ");
    if (!event) {
        throw new Error("Event not found");
    }
    const filteredEvent = {
        title: event.title,
        date: event.date.toDateString(),
        time: event.time,
        venue: event.venue,
        address: event.location.address,
        organizer: event.organizerId.orgName,
        goal: event.goal,
        registered: event.registered,
        progress: Math.min((event.registered / event.goal) * 100, 100).toFixed(2),
        status: event.status,
        description: event.description,
        id: event._id
    }
    return filteredEvent;
}

const getDonateBloodForms = async (eventId, orgId) => {
    if (!eventId) {
        throw new Error("Event ID is required");
    }
    const event = await EventModel.find({ _id: eventId, organizerId: orgId });
    if (!event) {
        throw new Error("Event not found");
    }
    const donateBloodForms = await DonateBloodModel.find({ eventId: eventId }).populate("user", "fullname email");
    return donateBloodForms;
}

const donateBloodForm = async ({ user, fullname, bloodType, lastDonationDate ,phone, eventId, eventModel }) => {
    if (!user || !fullname || !bloodType || !phone || !eventId) {
        throw new Error("All fields are Required");
    }

    const donateBloodResponse = await DonateBloodModel.create({
        user,
        fullname,
        bloodType,
        lastDonationDate,
        phone,
        eventId,
        eventModel
    });
    return donateBloodResponse;
}

const deleteDonateBloodForm = async ({ user, formId }) => {
    const response = await DonateBloodModel.deleteOne({ user, _id: formId })
    return response;
}

const allOrgs = async (query) => {
    if (!query.location) {
        const orgs = await OrgModel.find({ recievingBlood: true });
        return orgs;
    }
    const pinCodeCoordinates = await getAddressCoordinates(query.location);
    if (!pinCodeCoordinates) {
        throw new Error("Invalid Pin Code");
    }

    const orgs = await OrgModel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [pinCodeCoordinates.lng, pinCodeCoordinates.lat] // [lng, lat]
                },
                distanceField: "distance",
                spherical: true,
                maxDistance: query.maxDistance * 1000 // 30 km radius
            }
        },
        {
            $match: {
                recievingBlood: true
            }
        },
        {
            $sort: {
                distance: 1 // nearest first
            }
        }
    ]);

    return orgs;


}

const getOrgById = async (orgId) => {
    const org = await OrgModel.findById(orgId);
    if (!org) {
        throw new Error("Organization not found");
    }
    const filteredOrg = {
        OrgId : org._id,
        orgType: org.orgType,
        orgName: org.orgName,
        contactNumber: org.contactNumber,
        email: org.email,
        address: org.location.address,
        timings: org.timings,
    }
    return filteredOrg;
}

// const requestBloodForm = async ({ requesterId, bloodType, amount, address, description, urgencyLevel, requiredByDate }) => {
//     if (!requesterId || !bloodType || !amount || !address || !description || !urgencyLevel || requiredByDate) {
//         throw new Error("All Fields are required");
//     }
//     await RequestBloodModel.findOneAndDelete({ user });
//     const location = await getAddressCoordinates(address);

//     const requestBloodResponse = await RequestBloodModel.create({
//         requesterId,
//         bloodType,
//         amount,
//         description,
//         urgencyLevel,
//         requiredByDate,
//         location: {
//             type: "Point",
//             coordinates: [location.lng, location.ltd]
//         }
//     });
//     return requestBloodResponse;
// }

// const findRequestIdByUserId = async (userId,formId) => {
//     const request = await RequestBloodModel.findOne({ requesterId : userId, _id : formId });
//     return request ? request._id : null;
// }

// const updateRequestBloodForm = async (formId,requesterId, updateData) => {
//     if (!formId || !requesterId || !updateData ) {
//         throw new Error("Request ID and update data are required");
//     }
//     const updatedRequest = await RequestBloodModel.findOneAndUpdate({_id : formId, requesterId }, updateData, { new: true, runValidators: true });
//     return updatedRequest;
// }

// const deleteRequestBloodForm = async (userId,formId) => {
//     if(!userId || !formId){
//         throw new Error("All feilds are required");
//     }
//     const response = await RequestBloodModel.deleteOne({ requesterId : userId , _id : formId });
//     return response;
// }

// const nearbyDonorsByBloodType = async (location, bloodType) => {
//     const users = await getUsersInTheRadius(location.coordinates[0], location.coordinates[1], 30);
//     const filteredUsers = users.filter(user => user.bloodType === bloodType);
//     const updatedUsers = await Promise.all(filteredUsers.map(async (user) => {
//         const distanceData = await getDistanceTime(
//             `${location.coordinates[1]},${location.coordinates[0]}`,
//             `${user.location.coordinates[1]},${user.location.coordinates[0]}`
//         );
//         return {
//             ...user.toObject(),
//             distance: distanceData.distance.text,
//             duration: distanceData.duration.text
//         };
//     }));
//     return updatedUsers;
// };

// const nearbyOrgsByBloodType = async (location, bloodType) => {
//     const orgs = await getOrgsInTheRadius(location.coordinates[0], location.coordinates[1], 30);
//     const filteredOrgs = orgs.filter(org =>
//         org.donateBlood &&
//         org.donateBlood.bloodGroups &&
//         org.donateBlood.bloodGroups[bloodType] > 0
//     );
//     const updatedOrgs = await Promise.all(filteredOrgs.map(async (org) => {
//         const distanceData = await getDistanceTime(
//             `${location.coordinates[1]},${location.coordinates[0]}`,
//             `${org.location.coordinates[1]},${org.location.coordinates[0]}`
//         );
//         return {
//             ...org.toObject(),
//             distance: distanceData.distance.text,
//             duration: distanceData.duration.text
//         };
//     }));
//     return updatedOrgs;
// };



module.exports = {
    getEvents,
    getEventById,
    allOrgs,
    getDonateBloodForms,
    donateBloodForm,
    deleteDonateBloodForm,
    getOrgById
};