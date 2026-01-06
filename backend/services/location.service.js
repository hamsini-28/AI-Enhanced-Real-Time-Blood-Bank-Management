const axios = require("axios");
// const DonateBloodModel = require("../models/donateBlood.model");
// const OrgModel = require("../models/org.model");

// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error("Origin and Destination are required");
//     }
//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
//     try {
//         const response = await axios.get(url);
//         const data = response.data;
//         if (data.status === "OK") {
//             if (data.rows[0].elements[0].status === "Zero_results") {
//                 throw new Error("Invalid Origin or Destination");
//             }
//             return data.rows[0].elements[0];
//         } else {
//             throw new Error("Error fetching data from Google Maps API");
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// module.exports.getAutoSuggestions = async (input) => {
//     if (!input) {
//         throw new Error("Input is required");
//     }
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
//     try {
//         const response = await axios.get(url);
//         const data = response.data;
//         if (data.status === "OK") {
//             return data.predictions;
//         } else {
//             throw new Error("Error fetching data from Google Maps API");
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// module.exports.getAddressCoordinates = async (address) => {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
//     try {
//         const response = await axios.get(url);
//         const data = response.data;
//         if (data.status === "OK") {
//             const location = data.results[0].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             }
//         } else {
//             throw new Error("Error fetching data from Google Maps API");
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// module.exports.getAddressFromCoordinates = async (ltd, lng) => {
//     if (!ltd || !lng) {
//         throw new Error("Latitude and longitude are required");
//     }

//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${ltd},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

//     try {
//         const response = await axios.get(url);
//         const data = response.data;

//         if (data.status === "OK") {
//             // Return the formatted address from the first result
//             return data.results[0].formatted_address;
//         } else {
//             throw new Error("Error fetching data from Google Maps API: " + data.status);
//         }
//     } catch (error) {
//         console.error("Error in getAddressFromCoordinates:", error);
//         throw error;
//     }
// };


// module.exports.getUsersInTheRadius = async (lng, lat, radiusInKm) => {
//     if (!lng || !lat || !radius) {
//         throw new Error("Latitude, Longitude and Radius are required");
//     }
//     const radiusInMeters = radiusInKm * 1000;

//     const donors = await DonateBloodModel.find({
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [lng, lat] // [longitude, latitude]
//                 },
//                 $maxDistance: radiusInMeters
//             }
//         },
//         isAvailable: true // Optional: only available donors
//     });

//     return donors;
// }

// module.exports.getOrgsInTheRadius = async (lng, lat, radius) => {
//     if (!lng || !lat || !radius) {
//         throw new Error("Latitude, Longitude and Radius are required");
//     }
//     const orgs = await OrgModel.find({
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [lng, lat] // [longitude, latitude]
//                 },
//                 $maxDistance: radiusInMeters
//             }
//         },
//         isAvailable: true // Optional: only available donors
//     }).populate('donateBlood');

//     return orgs;
// }

const isCoordinates = (input) => {
    return /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(input.trim());
};


// ✅ Get distance + time between two locations
const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and Destination are required");
    }

    try {
        // Convert addresses to coordinates
        const originCoords = await getAddressCoordinates(origin);
        const destCoords = await getAddressCoordinates(destination);

        const originStr = `${originCoords.lng},${originCoords.lat}`;
        const destStr = `${destCoords.lng},${destCoords.lat}`;

        // Call LocationIQ Directions API
        const url = `https://us1.locationiq.com/v1/directions/driving/${originStr};${destStr}?key=${process.env.LOCATIONIQ_API_KEY}&overview=false`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            return {
                distance: route.distance / 1000,
                duration: route.duration / 60
            };
        } else {
            throw new Error("No route found between given locations");
        }
    } catch (error) {
        console.error("Error in getDistanceTime:", error.message);
        throw error;
    }
};

// ✅ Get autocomplete suggestions for a place
const getAutoSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }

    const url = `https://api.locationiq.com/v1/autocomplete?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(input)}&limit=5`;

    try {
        const response = await axios.get(url);
        return response.data; // returns array of place suggestions
    } catch (error) {
        console.error("Error in getAutoSuggestions:", error.message);
        throw error;
    }
};

// ✅ Get coordinates (lat/lng) from address
const getAddressCoordinates = async (address) => {
    if (!address) {
        throw new Error("Address is required");
    }

    const url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(url);
        if (response.data.length > 0) {
            const loc = response.data[0];
            return {
                lng: parseFloat(loc.lon),
                lat: parseFloat(loc.lat)
            };
        } else {
            throw new Error("No coordinates found for this address");
        }
    } catch (error) {
        console.error("Error in getAddressCoordinates:", error.message);
        throw error;
    }
};

// ✅ Get address from coordinates (Reverse Geocoding)
const getAddressFromCoordinates = async (lat, lng) => {
    if (!lat || !lng) {
        throw new Error("Latitude and longitude are required");
    }

    const url = `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json`;

    try {
        const response = await axios.get(url);
        return response.data.display_name; // formatted address
    } catch (error) {
        console.error("Error in getAddressFromCoordinates:", error.message);
        throw error;
    }
};

module.exports = {
    getDistanceTime,
    getAutoSuggestions,
    getAddressCoordinates,
    getAddressFromCoordinates
};