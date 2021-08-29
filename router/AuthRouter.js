const express = require('express');
const router = express.Router();

// Auth Module
const Auth_Module_Kakao = require("../passport/Strategy_Kakao");
const Auth_Module_Naver = require("../passport/Strategy_Naver");
const Auth_Module_JWT = require("../passport/Strategy_jwt");

router.use('/naver', Auth_Module_Naver);
router.use('/kakao', Auth_Module_Kakao);


router.use('/', Auth_Module_JWT);

module.exports = router;