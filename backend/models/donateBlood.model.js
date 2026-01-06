const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const donateBloodSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    fullname: {
        type: String,
        required: true,
        minLength: [3, "Name should be more than 3 characters"]
    },
    bloodType: {
        type: String,
        enum: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
        required: true
    },
    lastDonationDate: {
        type: Date,
        default: null,
        max: new Date(),
        set: (val) => val ? new Date(val) : null
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'],
        set: value => value.replace(/[^0-9+]/g, '')
    },
    eventId : {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'eventModel',
        required: true
    },
    eventModel: {
        type: String,
        required: true,
        enum: ['Event','Organization']
    },
    status : {
        type: String,
        enum: ['pending', 'approved', 'rejected','completed'],
        default: 'pending'}
});

donateBloodSchema.index({ location: '2dsphere' });
const DonateBloodModel = mongoose.model("Donate", donateBloodSchema);

module.exports = DonateBloodModel;