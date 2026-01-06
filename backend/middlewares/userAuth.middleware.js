const jwt = require("jsonwebtoken");
const { BlacklistTokenModel } = require("../models/blacklist.model");
const UserModel = require("../models/user.model");

module.exports.userAuth = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized access - No token" });
  }

  try {
    // Check if token is blacklisted
    const blacklisted = await BlacklistTokenModel.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ msg: "Unauthorized access - Token blacklisted" });
    }

    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Handle both 'id' and '_id'
    const userId = decoded._id || decoded.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized access - User not found" });
    }

    req.user = user;
    req.type = "user";
    next();
  } catch (error) {
    console.error("User auth error:", error.message);
    return res.status(401).json({ msg: "Unauthorized access - Invalid token" });
  }
};

/*const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { BlacklistTokenModel } = require('../models/blacklist.model');
const  UserModel  = require('../models/user.model');

module.exports.userAuth = async (req, res, next) => {
    const token =
        req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }

    try {
        // Check if token is blacklisted
        const blacklistToken = await BlacklistTokenModel.findOne({ token });
        if (blacklistToken) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Try to find user first
        const user = await UserModel.findById(decoded._id);
        if (user) {
            req.user = user;
            req.type = "user";
            return next();
        }

        return res.status(401).json({ msg: "Unauthorized access" });

    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized access" });
    }
};
*/