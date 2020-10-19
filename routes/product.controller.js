const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadFile');

const productModel = require('../models/product.model');
const Cre = require('../utils/ctS');
const checkAdmin = require('../middlewares/authAdmin');

router.get('/', async function (req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await productModel.index(),
        parentID: await productModel.parentID(),
        format_datetime: Cre.fmt,
        title: 'Danh sách sản phẩm',
        path: "Product/Index"
    });
});
router.post('/changeStatus', checkAdmin, async function (req, res) {

    const rows = await productModel.getOne(req.body.id);
    if (rows.length === 0) {
        return res.json({ Status: 0 })
    }
    await productModel.status((rows[0].Status == 1) ? 2 : 1, req.body.id);
    const Status = await productModel.checkStatus(req.body.id);
    if (Status[0].Status == 1) {
        return res.json({ Status: 1 })
    } else {
        return res.json({ Status: 2 })
    }
});

router.get('/trash', checkAdmin, async function (req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await productModel.trash(),
        parentID: await productModel.parentID(),
        title: 'Thùng rác',
        path: "Product/Trash"
    });
});


router.get('/add', checkAdmin,async function(req, res) {

    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        parentID: await productModel.parentID(),
        title: 'Thêm sản phẩm',
        path: "Product/Create",
    });
});


router.post('/add',checkAdmin, upload.single('Image'), async function(req, res) {

    // const rows = await productModel.checkName(req.body.Name);
    // if (rows.length != 0) {
    //     req.flash('message', ['warning', 'Tên danh mục đã tồn tại!']);
    //     res.redirect('./Add');
    // }
    //  try {
    await productModel.add(req);
    req.flash('message', ['success', 'Thêm mới thành công!']);
    res.redirect('./');
    //     // Tràn data
    //   req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
    //    res.redirect('./add');
    //}

});

router.get('/deltrash', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.status(0, id);
    req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
    res.redirect('./');

});
router.get('/undo', checkAdmin, async function (req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.status(2, id);
    req.flash('message', ['success', 'Khôi phục thành công!']);
    res.redirect('./trash');

});

router.get('/edit', checkAdmin,async function(req, res) {

    const id = parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    res.render('Admin/LayoutAdmin', {
        result: rows[0],
        parentID: await productModel.parentID(),
        message: req.flash('message'),
        title: "Chỉnh sửa thông tin sản phẩm",
        path: "Product/Update",
    });

});


router.post('/edit',checkAdmin, upload.single('Image'), async function(req, res) {
    const id = req.query.id || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    // try {
    await productModel.update(req, id);
    req.flash('message', ['success', 'Cập nhật thành công!']);
    res.redirect('./');
    //  } catch (error) {
    // Tràn data
    //   req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
    //   res.redirect('./edit?id=' + id);
    // }

});

router.get('/deleterd',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Bạn muốn xóa hoàn toàn ?',
        path: "Product/Delete"
    });

});
router.get('/delete',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.delete(id);
    req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
    res.redirect('./trash');

});

/*
// Thay đổi trạng thái

router.get('/deltrash',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.status(0, id);
    req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
    res.redirect('./');

});
router.get('/undo',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.status(2, id);
    req.flash('message', ['success', 'Khôi phục thành công!']);
    res.redirect('./trash');

});


// Xóa vĩnh viễn
router.get('/deleterd',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Bạn muốn xóa hoàn toàn ?',
        path: "Product/Delete"
    });

});
router.get('/delete',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await productModel.delete(id);
    req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
    res.redirect('./trash');

});
router.get('/detail', checkAdmin,async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await productModel.getOne(id);
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
*/
module.exports = router;