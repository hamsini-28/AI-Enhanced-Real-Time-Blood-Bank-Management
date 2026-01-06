const express = require("express");
const router = express.Router();
const orgController = require("../controllers/org.controller");
const validate = require("../middlewares/user.validation");
const { orgAuth } = require("../middlewares/orgAuth.middleware");

// ✅ PUBLIC ROUTES
router.post("/register", validate.orgRegistrationValidationRules, orgController.signup);
router.post("/signin", validate.orgSigninValidationRules, orgController.signin);

// ✅ PROTECTED ROUTES
router.use(orgAuth);

// ✅ Organization
router.put("/updateOrg", orgController.updateOrg);

// ✅ Event Management
router.post("/event", orgController.createEvent);
router.get("/events", orgController.getEvents);

// ✅ Upcoming Events (Filtered)
router.get("/upcoming-drives", orgController.getUpcomingDrives);

// ✅ Optional placeholders
router.put("/cancelRecievingBlood", orgController.cancelRecievingBlood || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.put("/enableRecievingBlood", orgController.enableRecievingBlood || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.put("/event", orgController.updateEvent || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.get("/donate-blood-forms/:eventId", orgController.getDonateBloodForms || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.put("/updateDonateBloodFormStatus", orgController.updateDonateBloodFormStatus || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.get("/blood-stock", orgController.bloodStock || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.put("/blood-stock", orgController.bloodStockUpdate || ((req, res) => res.status(501).json({ msg: "Not implemented" })));
router.get("/upcoming-drives", orgController.getUpcomingDrives);

// ✅ Export
module.exports = router;
