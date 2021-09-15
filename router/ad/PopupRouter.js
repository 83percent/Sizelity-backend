const express = require("express");
const router = express.Router();

const ADPopup = require("../../module/ad/ADPopup");

router.get("/", async (req, res) => {
    const result = await ADPopup.get(req.user.gender);
    
    if(result === null) return res.sendStatus(500);
    else return res.send(result);
});

module.exports = router;