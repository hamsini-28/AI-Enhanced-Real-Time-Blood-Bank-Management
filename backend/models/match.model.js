const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    donationRequestFormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonationRequest',
        required: true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['User', 'Organization']
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    chat_room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const MatchModel = mongoose.model('Match', matchSchema);
module.exports = MatchModel