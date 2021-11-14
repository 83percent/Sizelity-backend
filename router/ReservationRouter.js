const express = require('express');
const router = express.Router();
const StatusCode = require('../lib/response-code/status-code');

const ReservationModel = require('../models/Reservation');

/*
    This router is within 'Module'
*/

router.post('/', async (req, res) => {
    const data = req.body;
    try {
        if(data) {
            let reservation = await ReservationModel.findOne({domain : data.domain});
            if(reservation) {
                res.sendStatus(StatusCode.already);
            } else {
                reservation = new ReservationModel(data);
                const result = await reservation.save();
                if(result._id) res.sendStatus(StatusCode.success);
                else res.sendStatus(StatusCode.error);
            }
        } else res.sendStatus(StatusCode.invalid);
    } catch(err) {
        res.sendStatus(StatusCode.error);
    }
    
});

module.exports = router;