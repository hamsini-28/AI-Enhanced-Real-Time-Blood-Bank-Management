const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/user.validation");
const { userAuth } = require("../middlewares/userAuth.middleware");

// ✅ Public routes
router.post("/signup", validate.userRegisterValidationRules, userController.registerUser);
router.post("/signin", validate.userLoginValidationRules, userController.signinUser);

// ✅ Public - All Stories
router.get("/stories", userController.getAllStories);

// ✅ Authenticated routes
router.use(userAuth);

// ✅ Story routes
router.post("/story", userController.createStory);
router.get("/yourstory", userController.yourStory);
router.put("/story/:storyId", userController.updateStory);
router.delete("/story/:storyId", userController.deleteStory);

// ✅ Donation form routes
router.post("/donate-blood-form/:eventId", validate.donationForm, userController.donateBloodform);
router.get("/donate-blood-forms", userController.getDonateBloodForms);
router.delete("/donate-blood-form", userController.deleteDonateBloodForm);

// ✅ Profile & Password routes
router.get("/me", userController.getUserProfile);
router.put("/updateProfile", validate.userUpdateValidationRules, userController.updateUserProfile);
router.put("/updatePassword", validate.updatePasswordValidation, userController.updatePassword);
router.delete("/deleteProfile", userController.deleteUserProfile);
router.post("/logout", userController.signoutUser);

module.exports = router;
