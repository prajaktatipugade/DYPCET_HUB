const express = require('express');
const router = express.Router();

const {adminAuthentication, clubReqForm, readClubReqForm, send_club_acceptance_email,send_club_reject_email, uploadAboutUs, readAboutUs, uploadEvents, readEvents, uploadGallery, readGallery, uploadMembers, readMembers,subAdminLogin, uploadLiveEvents,readLiveEvents, acceptLiveEvents,acceptClubReqForm, StopLiveEvents,verify_email,reset_pass,getAllClubs,getClubDetails} = require('../controllers/User.js');

router.post('/adminAuthentication', adminAuthentication);
router.post('/ClubRequestForm', clubReqForm);
router.get('/readClubRequestForm', readClubReqForm);
router.post('/send_club_acceptance_email', send_club_acceptance_email);
router.post('/send_club_reject_email', send_club_reject_email);
router.post('/uploadAboutUs', uploadAboutUs); 
router.post('/readAboutUs', readAboutUs);
router.post('/uploadEvents', uploadEvents);
router.post('/readEvents', readEvents);
router.post('/uploadGallery', uploadGallery);
router.post('/readGallery', readGallery);
router.post('/uploadMembers', uploadMembers);
router.post('/readMembers', readMembers);
router.post('/subAdminLogin', subAdminLogin);
router.post('/uploadLiveEvents', uploadLiveEvents);
router.post('/readLiveEvents', readLiveEvents);
router.post('/acceptLiveEvents', acceptLiveEvents);
router.post('/acceptClubReqForm', acceptClubReqForm);
router.post('/StopLiveEvents', StopLiveEvents);
router.post('/verify_email', verify_email);
router.post('/reset_pass/:id/:token', reset_pass);
router.get('/clubs', getAllClubs);
router.post('/clubDetails', getClubDetails);

module.exports = router;