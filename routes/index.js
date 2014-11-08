var express = require('express');
var router = express.Router();

var apnHomePage = require('./apnHomePage.js');
var service = require('./service');

router.get('/', apnHomePage);
router.get('/apnHomePage', apnHomePage);

router.post('/pushApn', service);

module.exports = router;