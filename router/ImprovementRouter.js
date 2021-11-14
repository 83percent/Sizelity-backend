const express = require("express");
const router = express.Router();

const ImprovementModel = require("../models/ImprovementModel");

router.post("/", async (req, res) => {
    const data = req.body;
    if(data.title.length > 0 && data.title.length <= 30 && data.content.length > 0 && data.content.length <= 300) {
        try {
            const newImprovement = new ImprovementModel({
                userRef: req.user.id,
                title : data.title,
                content : data.content
            });
            newImprovement.save(err => {
                if(err) {
                    res.status(500).send({error : "서버에 문제가 발생했습니다."});
                } else {
                    res.sendStatus(200);    
                }
            });
        } catch {
            res.status(500).send({error : "서버에 문제가 발생했습니다."});
        }
    } else {
        res.status(400).send({error : "잘못된 요청입니다."});
    }
});

module.exports = router;