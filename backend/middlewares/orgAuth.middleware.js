// backend/middlewares/orgAuth.middleware.js
const jwt = require("jsonwebtoken");
const OrgModel = require("../models/org.model");

const orgAuth = async (req, res, next) => {
  try {
    let token;

    // 1) Check Authorization header first: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2) fallback to cookie token if present
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized access: token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    // Fetch org (do not select password here)
    const org = await OrgModel.findById(decoded._id);
    if (!org) {
      return res.status(401).json({ msg: "Organization not found" });
    }

    // attach to request
    req.org = org;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    // differentiate expired vs other errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }
    return res.status(401).json({ msg: "Unauthorized access" });
  }
};

module.exports = { orgAuth };
