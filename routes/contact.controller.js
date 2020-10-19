const express = require('express');
const router = express.Router();

const Cre = require('../utils/ctS');
const mailer = require('../utils/mailer');
const checkAdmin = require('../middlewares/authAdmin');
const contactModel = require('../models/contact.model');
const { route } = require('./dashboard.controller');

router.get('/', checkAdmin, async function (req, res) {
    const w1 = await contactModel.chuaTraLoi();
    const w2 = await contactModel.daTraLoi();
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await contactModel.all(),
        count1: w1.length,
        count2: w2.length,
        format_datetime: Cre.fmt,
        title: 'Danh sách liên hệ',
        path: "Contact/Index"
    });
});
router.get('/answered', checkAdmin, async function (req, res) {
    const w1 = await contactModel.chuaTraLoi();
    const w2 = await contactModel.daTraLoi();
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: w2,
        count1: w1.length,
        count2: w2.length,
        format_datetime: Cre.fmt,
        title: "Liên hệ đã trả lời",
        path: "Contact/Index"
    });
});
router.get('/notansweredyet', checkAdmin, async function (req, res) {
    const w1 = await contactModel.chuaTraLoi();
    const w2 = await contactModel.daTraLoi();
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: w1,
        count1: w1.length,
        count2: w2.length,
        format_datetime: Cre.fmt,
        title: 'Liên hệ chưa trả lời',
        path: "Contact/Index"
    });
});

router.get('/reply', checkAdmin, async function (req, res) {
    const id = req.query.id;
    const result = await contactModel.getOne(id);
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: result[0],
        format_datetime: Cre.fmt,
        title: 'Trả lời liên hệ khách hàng ' + result[0].Fullname,
        path: "Contact/Reply"
    });
});
router.post('/reply', checkAdmin, async function (req, res) {
    const id = req.query.id;
    const result = await contactModel.getOne(id);
    let to = result[0].Email;
    let subject = 'Phản hồi liên hệ từ Phuongnghiep.com';
    let content = null;
    let data = {
        Fullname: result[0].Fullname,
        AdminName: 'Nguyen Van Nghiep',
        Reply: req.body.Reply,
        RQ: result[0].Content,
    }
    res.render('bpig/Mail/MailContact', { D: data }, function (err, html) {
        content = html;
    });
    mailer.sendMail(to, subject, content);

    await contactModel.Reply(req.body, id);
    req.flash('message', ['success', 'Đã trả lời liên hệ!']);
    res.redirect('./');
});




router.get('/mail', async function (req, res) {
    let e = null;
    let data = {
        User: "Nghiep",
        Mail: "nghiepnguyen8499@gamil.com"
    }

    res.render('bpig/Mail/MailContact', { data: data }, function (err, html) {
        e = html;
    });

    console.log(e);
});





module.exports = router;