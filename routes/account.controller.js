const express = require('express');
const router = express.Router();

const accountModel = require('../models/account.model');
const homeModel = require('../models/home.model');
const Cre = require('../utils/ctS');
const bcrypt = require('bcrypt');

const checkAuth = require('../middlewares/authUser');

// Đăng nhập
router.get('/', async function (req, res) {
    res.redirect('/account/login');
});
router.get('/login', async function (req, res) {
    res.render('bpig/Login', {
        title: 'Danh mục sản phẩm',
    });
});




// Xử lý đăng nhập
// /**/
router.post('/login', async function (req, res) {
    const user = await accountModel.singleByUserName(req.body.name);
    if (user == null) {
        return res.json({ Status: 1 })
    }
    const result = bcrypt.compareSync(req.body.pass, user.Password);
    if (result === false) {
        return res.json({ Status: 2 })
    }
    delete user.Password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    return res.json({});
});




// Register
router.get('/register', async function (req, res) {
    res.render('bpig/Register', {
        title: 'Đăng ký thành viên',
    });
});
// Registration processing
router.post('/register', async function (req, res) {
    const checkphone = await accountModel.checkPhoneNumber(req.body.PhoneNumber);
    if (!checkphone)
        return res.json({ s: 0 });
    await accountModel.add(req);
    return res.json({ s: 1 });
});






router.get('/profile', checkAuth, async function (req, res) {
    res.render('bpig/Master', {
        message: req.flash('message'),
        result: await accountModel.getOneUser(req.session.authUser.ID),
        categories: await homeModel.getCategory(),
        title: 'Information Personal',
        path: 'Profile'
    });
});


router.post('/update-profile', checkAuth, async function (req, res) {
    const id = req.query.id || -1;
    const rows = await accountModel.getOneUser(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    // try {
    await accountModel.update(req.body, id);
    
    res.redirect('./profile');
});

router.get('/order', checkAuth, async function (req, res) {
    //console.log("ID USER " + req.session.authUser.ID);
    res.render('bpig/Master', {
        message: req.flash('message'),
        //getAllOrders: await accountModel.getAllOrders(req.session.authUser.ID),
        userOrders: await accountModel.userOrders(req.session.authUser.ID),
        idOrder: await accountModel.idOrder(),
        Product: await accountModel.Product(),
        categories: await homeModel.getCategory(),
        title: 'Thông tin đơn hàng',
        path: 'Order'
    });
});
router.get('/don-hang/chi-tiet', checkAuth, async function (req, res) {
    const id = req.query.id;
    res.render('bpig/Master', {
        message: req.flash('message'),
        OD: await accountModel.detail(id),
        categories: await homeModel.getCategory(),
        title: 'Chi tiết đơn hàng',
        path: 'OrderDetail'
    });
});

// Logout
router.get('/logout', checkAuth, function (req, res) {
    message: req.flash('message'),
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    //res.redirect(req.headers.referer);
    res.redirect('/');
});





module.exports = router;