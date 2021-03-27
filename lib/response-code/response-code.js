
const error = {status : -200};
const invalid = {status : -404};
const already = {status : 0};
const noData = {status : 404};
const success = {status : 200};
const noUser = {status : -1}
module.exports = {
    error : error,
    invalid : invalid,
    already : already,
    noData : noData,
    success : success,
    noUser : noUser
};


/*
    auth error : 401
    request invalid & block : 403
*/