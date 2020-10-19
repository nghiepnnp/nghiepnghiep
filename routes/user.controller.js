const express = require('express');
const router = express.Router();

const userModel = require('../models/user.model');
const Cre = require('../utils/ctS');
const checkAdmin = require('../middlewares/authAdmin');

router.get('/', checkAdmin, async function(req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await userModel.all(),
        format_datetime: Cre.fmt,
        title: 'Danh sách thành viên',
        path: "User/Index"
    });
});
/*
router.get('/trash',checkAdmin, async function(req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await topicModel.getTrash(),
        format_datetime: Cre.fmt,
        title: 'Thùng rác',
        path: "Topic/Trash"
    });
});

router.get('/add',checkAdmin, async function(req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        parent: await topicModel.all(),

        title: 'Thêm chủ đề bài viết',
        path: "Topic/Create",
    });
});


router.post('/add', checkAdmin,async function(req, res) {
    const rows = await topicModel.checkName(req.body);
    if (rows.length != 0) {
        req.flash('message', ['warning', 'Tên chủ đề đã tồn tại!']);
        res.redirect('./Add');
    } else {
        try {
            await topicModel.add(req);
            req.flash('message', ['success', 'Thêm mới thành công!']);
            res.redirect('./');
        } catch (error) {
            //Tràn data
            req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
            res.redirect('./add');
        }
    }
});

router.get('/edit', checkAdmin,async function(req, res) {
    //const id = req.params.id; edit/:id
    // Ép kiểu số kiểm tra tồn tại
    const id = parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }

    const result = await rows[0];
    res.render('Admin/LayoutAdmin', {
        result: result,
        parent: await topicModel.all(),
        message: req.flash('message'),
        title: "Chỉnh sửa chủ đề",
        path: "Topic/Update",
    });

});


router.post('/edit',checkAdmin, async function(req, res) {
    const id = req.query.id || -1;

    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại!']);
        res.redirect('./');
    }
    const checkName = await topicModel.checkNameUpdate(req.body, id);
    if (checkName.length > 0) {
        req.flash('message', ['warning', 'Tên chủ đề đã tồn tại!']);
        res.redirect('./edit?id=' + id);
    } else {
        try {
            await topicModel.update(req, id);
            req.flash('message', ['success', 'Cập nhật thành công!']);
            res.redirect('./');
        } catch (error) {
            // Tràn data
            req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
            res.redirect('./edit?id=' + id);
        }
    }

});

// Thay đổi trạng thái

router.get('/status',checkAdmin, async function(req, res) {

    const id = parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await topicModel.status((rows[0].Status == 1) ? 2 : 1, id);
    req.flash('message', ['success', 'Thay đổi trạng thái thành công!']);
    res.redirect('./');

});
router.get('/deltrash',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await topicModel.status(0, id);
    req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
    res.redirect('./');

});
router.get('/undo',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await topicModel.status(2, id);
    req.flash('message', ['success', 'Khôi phục thành công!']);
    res.redirect('./trash');

});


// Xóa vĩnh viễn
router.get('/deleterd',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Bạn muốn xóa hoàn toàn ?',
        path: "Topic/Delete"
    });

});
router.get('/delete',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    await topicModel.delete(id);
    req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
    res.redirect('./trash');

});
router.get('/detail',checkAdmin, async function(req, res) {

    const id = +parseInt(req.query.id) || -1;
    const rows = await topicModel.getOne(id);
    if (rows.length === 0) {
        req.flash('message', ['warning', 'Không tồn tại']);
        res.redirect('./');
    }
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        result: rows[0],
        format_datetime: Cre.fmt,
        title: 'Chi tiêtd loại sản phẩm',
        path: "Topic/Detail"
    });

});
*/

module.exports = router;