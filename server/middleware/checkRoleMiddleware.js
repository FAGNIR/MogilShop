const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function(req, res, next){
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        if(userData.role === 'ADMIN'){
            req.user = userData
            next();
        }
        else{
            return next(ApiError.RoleError())
        }
    }catch(e){

    }
}