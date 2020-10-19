var express = require('express');
var router = express.Router();

const passport = require('passport');

/* GET dashboard page. */
router.get('/', checkAuth, function (req, res, next) {
    res.render('dashboard/login', { title: 'Login Admin' });
});
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));
router.delete('/logout', (res, req)=>{
    req.logOut();
    res.redirect('/login');
})


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}
function checkNotAuth(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
}

module.exports = router;
