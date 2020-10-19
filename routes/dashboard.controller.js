const express = require('express');
const router = express.Router();

const accountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const checkAdmin = require('../middlewares/authAdmin');



router.get('/login', async function (req, res) {
  if (req.session.LoginAdmin) {
    return res.redirect('/admin');
  } else {
    res.render('Admin/Login', {
      title: 'Dang nhap trang quan tri',
    });
  }

});



router.post('/login', async function (req, res) {
  const user = await accountModel.singleByAdminName(req.body.name);
  if (user === null) {
    return res.json({ Status: 1 })
  }
  const result = bcrypt.compareSync(req.body.pass, user.Password);
  if (result === false) {
    return res.json({ Status: 2 })
  }
  delete user.Password;
  req.session.LoginAdmin = true;
  req.session.AdminID = user.ID;
  req.session.AdminName = user.Name;
  req.session.AdminAccess = user.Access;
  return res.json({});
});

router.get('/logout', checkAdmin, function (req, res) {
  req.session.LoginAdmin = false;
  req.session.AdminID = null;
  req.session.AdminName = null;
  req.session.AdminAccess = null;
  res.redirect(req.headers.referer);
});





module.exports = router;