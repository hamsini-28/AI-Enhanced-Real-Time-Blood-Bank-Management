const mongoose = require('mongoose');

const donationRequestSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]
  },
  amount: {
    type: Number,
    required: true
  },
  urgencyLevel: {
    type: String,
    required: true,
    enum: ["low", "medium", "high", "critical"]
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  requiredByDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'expired', 'cancelled'],
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

donationRequestSchema.index({ location: '2dsphere' });

const RequestBloodModel = mongoose.model('DonationRequest', donationRequestSchema);
module.exports = RequestBloodModel;