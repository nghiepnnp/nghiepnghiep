const db = require('../utils/db');
const ctS = require('../utils/ctS');

const multer = require("multer");
const path = require("path");

const TBL_PRODUCTS = "products";
const TBL_CATEGORIES = "categories";

module.exports = {
    index: _ => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status != 0`),
    trash: _ => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status  = 0`),
    parentID: _ => db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE ParentID != 0 AND Status = 1`),
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE ID = ${id}`);
    },
    checkStatus: function (id) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status != 0 AND ID = '${id}'`);
    },
    status: function (entity, id) {
        const datasets = {
            Status: entity,
        }
        return db.update(TBL_PRODUCTS, datasets, { ID: id });
    },
    add: function (req) {
        const datasets = {
            Name: req.body.Name,
            Slug: ctS.Slug(req.body.Name),
            Cate_ID: req.body.Cate_ID,
            Status: req.body.Status,
            Content: req.body.Detail,
            Price: req.body.Price,
            PromotionPrice: req.body.PPrice,

            BuyOS: req.body.BuyOS,
            Gop0: req.body.Gop0,
            Image: req.file.filename,
            MetaKey: req.body.MetaKey,
            MetaDesc: req.body.MetaDesc,
            Created_at: ctS.timeNow(),
            Created_by: req.session.AdminID,
            Updated_at: ctS.timeNow(),
            Updated_by: req.session.AdminID
        }
        return db.add(TBL_PRODUCTS, datasets);
    },
    update: function(req, id) {
        if (!req.file) {
            const datasets = {
                Name: req.body.Name,
                Slug: ctS.Slug(req.body.Name),
                Cate_ID: req.body.Cate_ID,
                Status: req.body.Status,
                Content: req.body.Detail,
                Price: req.body.Price,
                PromotionPrice: req.body.PPrice,
    
                BuyOS: req.body.BuyOS,
                Gop0: req.body.Gop0,
                MetaKey: req.body.MetaKey,
                MetaDesc: req.body.MetaDesc,
                Created_at: ctS.timeNow(),
                Created_by: req.session.AdminID,
                Updated_at: ctS.timeNow(),
                Updated_by: req.session.AdminID
            }
            const condition = {
                ID: id
            }
            return db.update(TBL_PRODUCTS, datasets, condition);
        } else {
            const datasets = {
                Name: req.body.Name,
                Slug: ctS.Slug(req.body.Name),
                Cate_ID: req.body.Cate_ID,
                Status: req.body.Status,
                Content: req.body.Detail,
                Price: req.body.Price,
                PromotionPrice: req.body.PPrice,

                BuyOS: req.body.BuyOS,
                Gop0: req.body.Gop0,
                Image: req.file.filename,
                MetaKey: req.body.MetaKey,
                MetaDesc: req.body.MetaDesc,
                Created_at: ctS.timeNow(),
                Created_by: req.session.AdminID,
                Updated_at: ctS.timeNow(),
                Updated_by: req.session.AdminID
            }
            const condition = {
                ID: id
            }
            return db.update(TBL_PRODUCTS, datasets, condition);
        }
    },
    delete: function(id) {
        return db.delete(TBL_PRODUCTS, { ID: id });
    }
}

//formaction