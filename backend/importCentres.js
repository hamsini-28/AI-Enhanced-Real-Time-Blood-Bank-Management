const mongoose = require("mongoose");
require("dotenv").config();

const OrgModel = require("./models/org.model");
const BloodStock = require("./models/bloodStock.model");
const centres = require("./data/centres.json");

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected ✅");
}

async function importCentres() {
    try {
        await connectDB();

        // Clean existing data
        await OrgModel.deleteMany({});
        await BloodStock.deleteMany({});
        console.log("Old centres deleted ✅");

        for (let centre of centres) {

            // 1️⃣ Create organization
            const org = await OrgModel.create({
                orgName: centre.name,
                email: `org${centre.id}@gmail.com`,
                password: "Password123",
                orgType: "Bloodbank",
                timings: centre.timings,
                contactNumber: centre.phone,
                location: {
                    type: "Point",
                    address: centre.address,
                    coordinates: [centre.longitude, centre.latitude]
                }
            });

            // 2️⃣ Create blood stock for this org
            await BloodStock.create({
                organization: org._id,
                "A+": 10,
                "B+": 8,
                "O+": 12
            });
        }

        console.log("✅ NEW centres imported successfully!");
        process.exit();
    } catch (err) {
        console.log("Error", err);
        process.exit(1);
    }
}

importCentres();
