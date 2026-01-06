const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: [3, "Name should be more than 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [8, "Email should be more than 8 characters"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be more than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
});

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare password during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Generate JWT token with ENV secret (not hardcoded)
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id }, // 🔥 match middleware (id field)
    process.env.JWT_SECRET, // 🔥 use environment secret
    { expiresIn: "7d" }
  );
};

// ✅ Static method for password hashing if needed elsewhere
userSchema.statics.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
