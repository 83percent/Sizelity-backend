const express = require('express');
const router = express.Router();

const Event = require('./Event/ShopEvent');

// Event get
router.post('/get', (request, response) => {
    ( async () => {
        const result = await Event.get(request);
        console.log("요청 결과 : ", result);
        response.send(result);
    })();
});
// Event set
router.post('/set', (request, response) => {
    ( async () => {
        const result = await Event.set(request);
        console.log("추가 요청 결과 : ", result);
        response.send(result);
    })();
});
// Event remove
router.post('/remove', (request, response) => {
    ( async () => {
        const result = await Event.remove(request);
        console.log("삭제 요청 결과 : ", result);
        response.send(result);
    })();
});
// Event update
router.post('/update', (request, response) => {
    ( async () => {
        const result = await Event.update(request);
        console.log("수정 요청 결과 : ", result);
        response.send(result);
    })();
});

module.exports = router;
