const db = require('../utils/db');
const ctS = require('../utils/ctS');

const TBL_USERS = "user";
const TBL_ORDERS = "_order";
const TBL_ORDER_DETAILS = "orderdetail";
const TBL_PPRODUCTS = "products";

module.exports = {
    all: function () {
        return db.load(`SELECT * FROM ${TBL_ORDERS}`);
    },
    all_v2: function (id) {
        return db.load(`SELECT o.ID as IDO, o.Name as NameOrder,SUM(od.Total) as SumTotal, o.CreateDate as CreateDate, o.Status as Status, o.Updated_at as Updated_at
        FROM ${TBL_PPRODUCTS} pr, ${TBL_ORDERS} o, ${TBL_ORDER_DETAILS} od WHERE o.ID = od.OrderID AND od.ProductID = pr.ID group by IDO ORDER BY IDO DESC`);
    },
    detail: function (id) {
        return db.load(`SELECT * FROM ${TBL_ORDERS} o, ${TBL_ORDER_DETAILS} od WHERE o.ID = od.OrderID AND o.ID = ${id}`);
    },
    getInfoP: _ => db.load(`SELECT * FROM ${TBL_PPRODUCTS}`),
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_ORDERS} WHERE ID = ${id}`);
    },
    status: function (status, id) {
        const datasets = {
            Status: status,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.update(TBL_ORDERS, datasets, { ID: id });
    },
    checkStatus: function (id) {
        return db.load(`SELECT Status FROM ${TBL_ORDERS} WHERE ID = '${id}'`);
    }


    //all: _ => db.load('SELECT * FROM categories'),
    // add: function(entity) {

    //     const datasets = {
    //         Name: entity.Name,
    //         Slug: ctS.Slug(entity.Name),
    //         ParentID: entity.ParentID,
    //         Status: entity.Status,
    //         MetaKey: entity.MetaKey,
    //         MetaDesc: entity.MetaDesc,
    //         Created_at: ctS.timeNow(),
    //         Created_by: 1
    //     }
    //     return db.add(TBL_CATEGORIES, datasets);
    // },
    // checkName: function(name) {
    //     return db.checkName(TBL_CATEGORIES, name);
    // },
    // getOne: function(id) {
    //     return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE ID = ${id}`);
    // },
    // update: function(entity, id) {
    //     const datasets = {
    //         Name: entity.Name,
    //         Slug: ctS.Slug(entity.Name),
    //         ParentID: entity.ParentID,
    //         Status: entity.Status,
    //         MetaKey: entity.MetaKey,
    //         MetaDesc: entity.MetaDesc,
    //         Updated_at: ctS.timeNow(),
    //         Updated_by: 1
    //     }
    //     const condition = {
    //         ID: id
    //     }
    //     return db.update(TBL_CATEGORIES, datasets, condition);
    // },
    // status: function(entity, id) {
    //     const datasets = {
    //         Status: entity,
    //         Updated_at: ctS.timeNow(),
    //         Updated_by: 1
    //     }
    //     return db.update(TBL_CATEGORIES, datasets, { ID: id });
    // },
    // getTrash: function() {
    //     return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status = 0`);
    // },
    // delete: function(id) {
    //     return db.delete(TBL_CATEGORIES, { ID: id });
    // }
    // , 
    // checkStatus:function(id){
    //     return db.load(`SELECT Status FROM ${TBL_CATEGORIES} WHERE Status != 0 AND ID = '${id}'`);
    // }
}

//formaction