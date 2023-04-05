const verifyus = require('../utils/verify');
const express = require('express');
const router = express.Router();
const availController = require('../controller/availibility');

router.post("/avail",verifyus,availController.Availibility);

router.get("/list",verifyus,availController.listSlots);


module.exports = router;