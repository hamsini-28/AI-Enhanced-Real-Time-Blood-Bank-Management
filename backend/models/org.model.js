// backend/models/org.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const orgSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Organization name should have at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // prevent password from returning in queries
    },
    registrationNumber: { type: String, trim: true },
    orgType: {
      type: String,
      enum: ["Bloodbank", "Hospital", "Ngo"],
      required: true,
    },
    role: { type: String, default: "org" },
    timings: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      address: { type: String, default: "" },
      coordinates: {
        type: [Number],
        default: [78.4867, 17.3850], // default Hyderabad coordinates
        validate: {
          validator: function (arr) {
            // ensure both lat/lng are numbers
            return (
              Array.isArray(arr) &&
              arr.length === 2 &&
              typeof arr[0] === "number" &&
              typeof arr[1] === "number"
            );
          },
          message: "Coordinates must be an array of two numeric values [lng, lat]",
        },
      },
    },
    recievingBlood: { type: Boolean, default: false },
    recievingBloodTypes: { type: [String], default: [] },
  },
  { timestamps: true }
);

// ✅ Ensure 2dsphere index for location queries
orgSchema.index({ location: "2dsphere" });

// ✅ Hash password before saving
orgSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ✅ Instance method: compare password
orgSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Instance method: generate JWT token
orgSchema.methods.generateAuthToken = function () {
  const payload = { _id: this._id, role: this.role };
  const secret = process.env.JWT_SECRET || "mysecret123"; // fallback to ensure no crash
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return token;
};

// ✅ Static helper (optional) for hashing password manually in services
orgSchema.statics.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

const OrgModel = mongoose.model("Organization", orgSchema);
module.exports = OrgModel;
