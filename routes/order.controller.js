const express = require('express');
const router = express.Router();

const orderModel = require('../models/order.model');
const Cre = require('../utils/ctS');
const checkAdmin = require('../middlewares/authAdmin');

router.get('/', async function (req, res) {
    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await orderModel.all_v2(),
        format_datetime: Cre.fmt,
        title: 'Quản lý đơn hàng',
        path: "Order/Index"
    });
});
router.get('/detail', async function (req, res) {
    const id = req.query.id || -1;

    res.render('Admin/LayoutAdmin', {
        message: req.flash('message'),
        results: await orderModel.detail(id),
        ifp: await orderModel.getInfoP(),
        format_datetime: Cre.fmt,
        title: 'Chi tiết đơn hàng',
        path: "Order/Detail"
    });
});
router.post('/changeStatus', async function (req, res) {
    const rows = await orderModel.getOne(req.body.id);
    const Status = req.body.Ss;
    if (rows.length === 0) {
        return res.json({ Status: 0 })
    }
    await orderModel.status(req.body.Ss, req.body.id);
    const S = await orderModel.checkStatus(req.body.id);
    switch (S[0].Status) {
        case 1: res.json({ Status: 1 }); break;
        case 2: res.json({ Status: 2 }); break;
        case 3: res.json({ Status: 3 }); break;
        case 4: res.json({ Status: 4 }); break;
    }
});


// router.get('/trash', checkAdmin, async function (req, res) {
//     res.render('Admin/LayoutAdmin', {
//         message: req.flash('message'),
//         results: await categoryModel.getTrash(),
//         format_datetime: Cre.fmt,
//         title: 'Thùng rác loại sản phẩm',
//         path: "Category/Trash"
//     });
// });

// router.get('/add', checkAdmin, async function (req, res) {

//     res.render('Admin/LayoutAdmin', {
//         message: req.flash('message'),
//         parent: await categoryModel.all(),

//         title: 'Thêm danh mục sản phẩm',
//         path: "Category/Create",
//     });
// });
// router.post('/add', checkAdmin, async function (req, res) {

//     const rows = await categoryModel.checkName(req.body.Name);
//     if (rows.length != 0) {
//         req.flash('message', ['warning', 'Tên danh mục đã tồn tại!']);
//         res.redirect('./Add');
//     }
//     try {
//         await categoryModel.add(req.body);
//         req.flash('message', ['success', 'Thêm mới thành công!']);
//         res.redirect('./');
//     } catch (error) {
//         // Tràn data
//         req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
//         res.redirect('./add');
//     }

// });


// router.get('/edit', checkAdmin, async function (req, res) {
//     //const id = req.params.id; edit/:id
//     // Ép kiểu số kiểm tra tồn tại
//     const id = parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại!']);
//         res.redirect('./');
//     }

//     const result = await rows[0];
//     res.render('Admin/LayoutAdmin', {
//         result: result,
//         parent: await categoryModel.all(),
//         message: req.flash('message'),
//         title: "Chỉnh sửa danh mục",
//         path: "Category/Update",
//     });

// });


// router.post('/edit', checkAdmin, async function (req, res) {
//     const id = req.query.id || -1;
//     try {
//         await categoryModel.update(req.body, id);
//         req.flash('message', ['success', 'Cập nhật thành công!']);
//         res.redirect('./');
//     } catch (error) {
//         // Tràn data
//         req.flash('message', ['warning', 'Có lỗi xảy ra, vui lòng thử lại!']);
//         res.redirect('./edit?id=' + id);
//     }

// });

// // Thay đổi trạng thái

// router.get('/status', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     await categoryModel.status((rows[0].Status == 1) ? 2 : 1, id);
//     req.flash('message', ['success', 'Thay đổi trạng thái thành công!']);
//     res.redirect('./');

// });
// router.get('/deltrash', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     await categoryModel.status(0, id);
//     req.flash('message', ['success', 'Quẳng vào thùng rác thành công!']);
//     res.redirect('./');

// });
// router.get('/undo', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     await categoryModel.status(2, id);
//     req.flash('message', ['success', 'Khôi phục thành công!']);
//     res.redirect('./trash');

// });


// // Xóa vĩnh viễn
// router.get('/deleterd', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     res.render('Admin/LayoutAdmin', {
//         message: req.flash('message'),
//         result: rows[0],
//         format_datetime: Cre.fmt,
//         title: 'Bạn muốn xóa hoàn toàn ?',
//         path: "Category/Delete"
//     });

// });
// router.get('/delete', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     await categoryModel.delete(id);
//     req.flash('message', ['success', 'Đã xóa vĩnh viễn !']);
//     res.redirect('./trash');

// });
// router.get('/detail', checkAdmin, async function (req, res) {

//     const id = +parseInt(req.query.id) || -1;
//     const rows = await categoryModel.getOne(id);
//     if (rows.length === 0) {
//         req.flash('message', ['warning', 'Không tồn tại']);
//         res.redirect('./');
//     }
//     res.render('Admin/LayoutAdmin', {
//         message: req.flash('message'),
//         result: rows[0],
//         format_datetime: Cre.fmt,
//         title: 'Chi tiêtd loại sản phẩm',
//         path: "Category/Detail"
//     });

// });

// router.post('/changeStatus', checkAdmin, async function (req, res) {

//     const rows = await categoryModel.getOne(req.body.id);
//     if (rows.length === 0) {
//         return res.json({ Status: 0 })
//     }
//     await categoryModel.status((rows[0].Status == 1) ? 2 : 1, req.body.id);
//     const Status = await categoryModel.checkStatus(req.body.id);
//     if (Status[0].Status == 1) {
//         return res.json({ Status: 1 })
//     } else {
//         return res.json({ Status: 2 })
//     }
// });

module.exports = router;