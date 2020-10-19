const e = require("express");

module.exports = function(req, res, next) {
    if (!req.session.LoginAdmin) {
        return res.redirect(`/admin/login?url=${req.originalUrl}`);
        
        //return res.redirect(`/admin/login`);
    }
    next();
    // if(req.session.LoginAdmin){
    //     next();
    // }else{
    //     res.redirect(`/admin/login`);
    // }
}