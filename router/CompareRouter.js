const express = require("express");
const router = express.Router();

// Compare
const CompareModule = require("../module/compare/Compare");

router.post("/do", async (req, res) => {
    // @data : compareDomain 
    // @data : provideDomain
    const domains = req.body;
    if(!domains?.compareDomain) return res.sendStatus(400);
    await CompareModule.done(domains);
    return res.sendStatus(200);
});

module.exports = router;