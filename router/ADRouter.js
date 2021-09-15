const express = require("express");
const router = express.Router();

// Middle Ware
const EventRouter = require("./ad/EventRouter")
const PopupRouter = require("./ad/PopupRouter")

router.use('/event', EventRouter);
router.use('/popup', PopupRouter);

module.exports = router;