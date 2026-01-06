const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const bloodController = require("../controllers/blood.controller");
const router = express.Router();


router.get("/events", bloodController.getEvents);
router.get("/events/:eventId", bloodController.getEventById);
router.get("/allOrgs", bloodController.allOrgs);
router.get("/org/:orgId", bloodController.getOrgById);
router.get("/stories", bloodController.getAllStories);


// router.post('/request-blood-form',bloodController.requestBloodform);
// router.get('/nearby-donors-orgs',  bloodController.nearbydonorsOrgsByBloodType);
// router.post('/request-blood-form-update/:formId',bloodController.requestBloodFormUpdate);
// router.delete('/delete-request-blood-form/:formId',bloodController.deleteRequestBloodForm);
// router.post('/already-requested-donors',bloodController.alreadyRequestedToDonors); //recipient checks the already requested all donors
// router.post('/already-requested-recipients',bloodController.alreadyRequestedToRecipients); //donors checks the already requested all recipient
// router.post('/create-request-to-donor',bloodController.createRequestToDonor); //recipient creates a request to donor to get blood
// router.post('/create-request-to-recipient',bloodController.createRequestToRecipient);//donor creates a request to recipient to provide blood

module.exports= router;