const express = require("express");
const router = express.Router();

const ADPopup = require("../../module/ad/ADPopup");

router.get("/", async (req, res) => {
    try {
        const result = await ADPopup.get(JSON.parse(req.cookies['sizelity_user'])?.gender);
        //console.log(result);
        if(result === null) return res.sendStatus(500);
        else return res.send(result);
    } catch {
         return res.sendStatus(500);
    }
});

module.exports = router;