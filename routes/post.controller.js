const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadFile');

const postModel = require('../models/post.model');
const Cre = require('../utils/ctS');
const checkAdmin = require('../middlewares/authAdmin');

router.get('/', checkAdmin, async function(req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await postModel.all(),
        topic:await postModel.topicID(),
        format_datetime: Cre.fmt,
        title: 'Danh sách bài viết',
        path: "Post/Index"
    });
});

router.get('/trash',checkAdmin, async function(req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await postModel.getTrash(),
        format_datetime: Cre.fmt,
        title: 'Thùng rác',
        path: "Post/Trash"
    });
});

router.get('/add', checkAdmin,async function(req, res) {

    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        parent: await postModel.topicID(),

        title: 'Thêm danh mục sản phẩm',
        path: "Post/Create",
    });
});


router.post('/add',checkAdmin, upload.single('Image'), async function(req, res) {

    // const rows = await postModel.checkName(req.body.Name);
    // if (rows.length != 0) {
    //     req.flash('message', ['warning', 'Tên danh mục đã tồn tại!']);
    //     res.redirect('./Add');
    // }
    //  try {
    await postModel.add(req);
    req.flash('message', ['success', 'Thêm mới thành công!']);
    res.redirect('./');
    //     // Tràn data
    //   req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
    //    res.redirect('./add');
    //}

});

router.get('/edit', checkAdmin,async function(req, res) {
    //const id = req.params.id; edit/:id
    // Ép kiểu số kiểm tra tồn tại
    const id = parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    res.render('Admin/LayoutAdmin', {
        result: rows[0],
        parent: await postModel.topicID(),
        message: req.flash('message'),
        title: "Chỉnh sửa bài viết",
        path: "Post/Update",
    });

});


router.post('/edit',checkAdmin, upload.single('Image'), async function(req, res) {
    const id = req.query.id || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    // try {
    await postModel.update(req, id);
    req.flash('message', ['success', 'Cập nhật thành công!']);
    res.redirect('./');
    //  } catch (error) {
    // Tràn data
    //   req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
    //   res.redirect('./edit?id=' + id);
    // }

});

// Thay đổi trạng thái

router.get('/status',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await postModel.status((rows[0].Status == 1) ? 2 : 1, id);
    req.flash('message', ['success', 'Thay đổi trạng thái thành công!']);
    res.redirect('./');

});
router.get('/deltrash',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await postModel.status(0, id);
    req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
    res.redirect('./');

});
router.get('/undo',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await postModel.status(2, id);
    req.flash('message', ['success', 'Khôi phục thành công!']);
    res.redirect('./trash');

});


// Xóa vĩnh viễn
router.get('/deleterd',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Bạn muốn xóa hoàn toàn ?',
        path: "Post/Delete"
    });

});
router.get('/delete',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await postModel.delete(id);
    req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
    res.redirect('./trash');

});
router.get('/detail', checkAdmin,async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await postModel.getOne(id);
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

module.exports = router;