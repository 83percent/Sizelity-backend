const express = require('express');
const router = express.Router();

const Event = require('./Event/ShopEvent');

router.get('/', (request, response) => {
    ( async () => {
        const result = await Event.get(request);
        console.log("요청 결과 : ", result);
        response.send(result);
    })();
});
// Event set
router.post('/', async (req, res) => {
    if(req.isAuthenticated() && req.user.praw) {
        const {sname:authSname} = req.user.praw;
        // Break Point
        if(authSname === req.data.sname) {}
        const result = await Event.set(req.body);
        res.send(result);
    } else res.status(401).send({message: "Can't access user"});
});
// Event remove
// @params id : 삭제하려는 이벤트의 id
router.delete('/:id', (request, response) => {
    ( async () => {
        const result = await Event.remove(request);
        console.log("삭제 요청 결과 : ", result);
        response.send(result);
    })();
});
// Event update
router.put('/update', (request, response) => {
    ( async () => {
        const result = await Event.update(request);
        console.log("수정 요청 결과 : ", result);
        response.send(result);
    })();
});

module.exports = router;
