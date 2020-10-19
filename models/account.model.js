const db = require('../utils/db');
const ctS = require('../utils/ctS');
const bcrypt = require('bcrypt');
const TBL_USERS = "user";
const TBL_ORDERS = "_order";
const TBL_ORDER_DETAILS = "orderdetail";
const TBL_PPRODUCTS = "products";

module.exports = {
    add: function (req) {

        const datasets = {
            Name: req.body.FirstName,
            LastName: req.body.LastName,
            Phone: req.body.PhoneNumber,
            Password: bcrypt.hashSync(req.body.Password, 8),
            Created_at: ctS.timeNow(),
            Status: 1
        }
        return db.add(TBL_USERS, datasets);
    },
    singleByUserName: async function (username) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Phone = '${username}' OR Email = '${username}' AND Status = 1`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    checkPhoneNumber: async function (phone) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Phone = ${phone}`);
        if (rows.length === 0)
            return true;
        return false;
    },
    singleByAdminName: async function (username) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Status = 1 AND Access != 0 AND Phone = '${username}' OR Email = '${username}'`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    //Order
    userOrders: function (id) {
        return db.load(`SELECT * FROM ${TBL_ORDERS} WHERE UserID = ${id} ORDER BY ID DESC`);
    },
    idOrder: function () {
        return db.load(`SELECT * FROM ${TBL_ORDER_DETAILS} od,  ${TBL_ORDERS} o WHERE o.ID = od.OrderID`)
    },


    getAllOrders: function (id) {
        return db.load(`SELECT * FROM ${TBL_ORDERS}, ${TBL_ORDER_DETAILS} WHERE ${TBL_ORDERS}.ID = ${TBL_ORDER_DETAILS}.OrderID AND ${TBL_ORDERS}.UserID = ${id} order by ID desc`);
    },
    Product: _ => db.load(`SELECT * FROM ${TBL_PPRODUCTS} WHERE Status = 1`),
    detail: function (id) {
        return db.load(`SELECT pr.Name as ProductName, pr.Image as Image, o.Name as NameOrder, o.Email as Email,
        o.Address as Address, od.Price as Price, od.Quantity as Quantity, od.Total as Total, o.Phone as Phone, o.ID as IDO, pr.ID as PID, o.Status as Status
        FROM ${TBL_PPRODUCTS} pr, ${TBL_ORDERS} o, ${TBL_ORDER_DETAILS} od WHERE o.ID = od.OrderID
        AND od.ProductID = pr.ID AND od.OrderID = ${id}`);
    },
    getOneUser: function (id) {
        return db.load(`SELECT * FROM ${TBL_USERS} WHERE Status = 1 AND ID = ${id}`);
    },
    update: function (entity, id) {
        const datasets = {
            Name: entity.Name,
            LastName: entity.LastName,
            Status: 1,
            Phone:entity.Phone,
            Email:entity.Email,
            Address:entity.Address,

            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        const condition = {
            ID: id
        }
        return db.update(TBL_USERS, datasets, condition);
    },
}

//formaction