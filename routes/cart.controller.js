const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const mailer = require('../utils/mailer');
const homeModel = require('../models/home.model');

const checkAuth = require('../middlewares/authUser');
const cartModel = require('../models/cart.model');
const { route } = require('./account.controller');

router.get('/', async function (req, res) {
    res.redirect('/gio-hang/danh-sach');
});

router.get('/danh-sach-hang', async function (req, res) {
    res.render('bpig/Cart', {
        title: 'Giỏ hàng',
    });
});
router.post('/addcart', async function (req, res) {
    // Lấy id req
    const productId = parseInt(req.body.id);
    const qty = parseInt(req.body.qty);
    const result = await homeModel.findOneById(productId);
    if (typeof req.session.cart == "undefined") {
        req.session.cart = [];
        req.session.cart.push({
            id: productId,
            name: result[0].Name,
            quantity: qty,
            price: result[0].Price,
            image: result[0].Image
        });
        return res.json({ s: 1 });
    } else {
        var cart = req.session.cart;
        var newItem = true;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == productId) {
                cart[i].quantity = cart[i].quantity + qty;
                newItem = false;
                return res.json({ s: 2 });
            }
        }
        if (newItem) {
            cart.push({
                id: productId,
                name: result[0].Name,
                quantity: qty,
                price: result[0].Price,
                image: result[0].Image
            })
            return res.json({ s: 1 });
        }
    }

    //console.log(req.session.cart);
    //res.redirect(req.headers.referer);

});

router.post('/remove', async function (req, res) {
    const productId = parseInt(req.body.id);
    console.log(productId);
    for (var i = 0; i < req.session.cart.length; i++) {
        if (productId == req.session.cart[i].id) {
            req.session.cart.splice(i, 1);
            if (req.session.cart.length == 0) delete req.session.cart;
            return res.json({ s: 1 });
        }
    }
});
router.post('/cong', async function (req, res) {
    const productId = parseInt(req.body.id);
    console.log(productId);
    for (var i = 0; i < req.session.cart.length; i++) {
        if (productId == req.session.cart[i].id) {
            req.session.cart[i].quantity++;
            return res.json({ s: 1 });
        }
    }

});
router.post('/tru', async function (req, res) {
    const productId = parseInt(req.body.id);
    console.log(productId);
    for (var i = 0; i < req.session.cart.length; i++) {
        if (productId == req.session.cart[i].id) {
            req.session.cart[i].quantity--;
            return res.json({ s: 1 });
        }
    }

});





router.get('/checkout', async function (req, res) {
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        promotion: await homeModel.getPPromo(),
        path: 'Checkout',
        title: 'Giỏ hàng',
    });
});

router.get('/thanh-toan', checkAuth, async function (req, res) {
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        promotion: await homeModel.getPPromo(),
        path: 'Pay',
        title: 'Thanh toán',
    });
});

router.post('/pay', checkAuth, async function (req, res) {

    const ido = await cartModel.addOrder(req);

    let to = req.body.Email;
    let subject = 'Đơn hàng đang được xử lý';
    let content = null;
    product = await cartModel.getAllProduct();
    res.render('bpig/Mail/MailOrder', { data: product, ido:ido }, function (err, html) {
        console.log(err);
        content = html;
    });
    // console.log(content);

    mailer.sendMail(to, subject, content);

    req.flash('message', ['success', 'Đặt hàng thành công!']);
    res.redirect('../account/order');
});







// load sdf
router.get('/lc', function (req,res) {
    res.render('bpig/Partials/lc');
});
router.get('/cot', function (req,res) {
    res.render('bpig/Partials/cot');
});







module.exports = router;