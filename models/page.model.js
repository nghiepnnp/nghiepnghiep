const db = require('../utils/db');
const ctS = require('../utils/ctS');

const path = require("path");

const TBL_POSTS = "post";
const TBL_LINKS = "link";

module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status != 0 AND Type='page'`),
    getTrash: _ => db.load(`SELeCT * FROM ${TBL_POSTS} WHERE Status = 0 AND Type='page'`),
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE ID = ${id}`);
    },
    checkStatus: function (id) {
        return db.load(`SELECT Status FROM ${TBL_POSTS} WHERE Status != 0 AND ID = '${id}'`);
    },
    status: function (entity, id) {
        const datasets = {
            Status: entity,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.update(TBL_POSTS, datasets, { ID: id });
    },
    add: function (req) {
        const datasets = {
            Title: req.body.Title,
            Slug: ctS.Slug(req.body.Title),
            Status: req.body.Status,
            Detail: req.body.Detail,
            Type: "page",
            MetaKey: req.body.MetaKey,
            MetaDesc: req.body.MetaDesc,
            Created_at: ctS.timeNow(),
            Created_by: 1,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.add(TBL_POSTS, datasets);
    },
    checkName: function (title) {
        return db.checkName(TBL_POSTS, { Title: title });
    },
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE ID = ${id}`);
    },
    update: function (req, id) {
        const datasets = {
            Title: req.body.Title,
            Slug: ctS.Slug(req.body.Title),
            Status: req.body.Status,
            Detail: req.body.Detail,
            Type: "page",
            MetaKey: req.body.MetaKey,
            MetaDesc: req.body.MetaDesc,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        const condition = {
            ID: id
        }
        return db.update(TBL_POSTS, datasets, condition);
    },
    delete: function (id) {
        return db.delete(TBL_POSTS, { ID: id });
    },
    CUL: async function () {
        let list = await db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status != 0 AND Type='page'`);
        list.forEach(async function (e) {
            let heo = await db.load(`SELECT * FROM ${TBL_LINKS} WHERE Type='page' AND TableID = ${e.ID}`);
          //  let tl = await db.load(`SELECT * FROM ${TBL_LINKS} WHERE ID = ${heo[0].ID}`);
            if (heo.length > 0) {
                const datasets = {
                    Name: e.Title,
                    Slug: e.Slug
                }
                return db.update(TBL_LINKS, datasets, { ID: heo[0].ID });
           // } else if (tl.length > 0) {
             //   return db.delete(TBL_LINKS, { ID: heo[0].ID });
            } else if (heo.length === 0) {
                const datasets = {
                    Name: e.Title,
                    Slug: e.Slug,
                    Type: 'page',
                    TableID: e.ID
                }
                return db.add(TBL_LINKS, datasets);
            }

            return;
        })
    },

}

//formaction