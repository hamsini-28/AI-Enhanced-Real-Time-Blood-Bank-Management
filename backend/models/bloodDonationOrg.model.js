const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodDonationOrgSchema = new Schema({
    totalUnits: {
        type: Number,
        required: true
    },
    bloodGroups: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("BloodDonationOrg", bloodDonationOrgSchema);
