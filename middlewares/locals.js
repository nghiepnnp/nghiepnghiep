module.exports = function (app) {
    app.use(async function (req, res, next) {
        if (req.session.isAuthenticated === null) {
            req.session.isAuthenticated == false;
        }
        res.locals.lcIsAuthenticated = req.session.isAuthenticated;
        res.locals.lcAuthUser = req.session.authUser;
        next();
    });
    app.use(async function (req, res, next) {
        if (req.session.LoginAdmin === null) {
            req.session.LoginAdmin == false;
        }
        res.locals.LoginAdmin = true;
        res.locals.lcAdminID = req.session.AdminID;
        res.locals.lcAdminName = req.session.AdminName;
        res.locals.lcAdminAccess = req.session.AdminAccess;
        next();
    });



    app.use(async function (req, res, next) {


        //res.locals.lcAuthUser = req.session.authUser;
        next();
    });

}