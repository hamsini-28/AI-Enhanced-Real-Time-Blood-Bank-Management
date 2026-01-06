const express = require('express');
const router = express.Router();
const validate = require("../middlewares/user.validation");
const locationController = require('../controllers/location.controller');
const { auth } = require('../middlewares/auth.middleware');

router.get('/get-distance-time', validate.getDistanceTimeValidationRules,locationController.getDistanceTime);

router.get('/autoComplete', validate.autoSuggestionValidationRules,locationController.getAutoSuggestions );

router.get('/get-address-coordinates', locationController.getAddressCoordinates);

module.exports = router;