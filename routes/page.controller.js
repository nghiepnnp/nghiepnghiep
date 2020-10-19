const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadFile');

const pageModel = require('../models/page.model');
const Cre = require('../utils/ctS');
const checkAdmin = require('../middlewares/authAdmin');

router.get('/', checkAdmin, async function (req, res) {
    await pageModel.CUL();
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await pageModel.all(),
        format_datetime: Cre.fmt,
        title: 'Danh sách trang đơn',
        path: "Page/Index"
    });
});

router.get('/trash', checkAdmin, async function (req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await pageModel.getTrash(),
        format_datetime: Cre.fmt,
        title: 'Thùng rác',
        path: "Page/Trash"
    });
});

router.get('/add', checkAdmin, async function (req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        title: 'Thêm danh trang đơn',
        path: "Page/Create",
    });
});


router.post('/add', checkAdmin, async function (req, res) {

    const rows = await pageModel.checkName(req.body.Title);
    if (rows.length != 0) {
        req.flash('message', ['warning', 'Tên trang liên hệ đã tồn tại']);
        res.redirect('./Add');
    }
    try {
        await pageModel.add(req);
        req.flash('message', ['success', 'Thêm mới thành công!']);
        res.redirect('./');
    } catch{
        // Tràn data
        req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
        res.redirect('./add');
    }

});

router.get('/edit', checkAdmin, async function (req, res) {

    const id = parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    res.render('Admin/LayoutAdmin', {
        result: rows[0],
        message: req.flash('message'),
        title: "Chỉnh sửa trang đơn",
        path: "Page/Update",
    });

});


router.post('/edit', checkAdmin, async function (req, res) {
    const id = req.query.id || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }
    try {
        await pageModel.update(req, id);
        req.flash('message', ['success', 'Cập nhật thành công!']);
        res.redirect('./');
    } catch (error) {
        //Tràn data
        req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
        res.redirect('./edit?id=' + id);
    }
});


router.get('/deltrash', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await pageModel.status(0, id);
    req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
    res.redirect('./');

});
router.get('/undo', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại bản ghi']);
        res.redirect('./');
    }
    await pageModel.status(2, id);
    req.flash('message', ['success', 'Khôi phục thành công!']);
    res.redirect('./trash');

});


// Xóa vĩnh viễn
router.get('/deleterd', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Bạn muốn xóa hoàn toàn ?',
        path: "Page/Delete"
    });

});
router.get('/delete', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await pageModel.delete(id);
    req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
    res.redirect('./trash');

});

router.get('/detail', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await pageModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Chi tiêtd loại sản phẩm',
        path: "Category/Detail"
    });

});

router.post('/changeStatus', checkAdmin, async function (req, res) {

    const rows = await pageModel.getOne(req.body.id);
    if (rows.length === 0) {
        return res.json({ Status: 0 })
    }
    await pageModel.status((rows[0].Status == 1) ? 2 : 1, req.body.id);
    const Status = await pageModel.checkStatus(req.body.id);
    if (Status[0].Status == 1) {
        return res.json({ Status: 1 })
    } else {
        return res.json({ Status: 2 })
    }
});

module.exports = router;