const db = require('../utils/db');
const ctS = require('../utils/ctS');

const TBL_CATEGORIES = "categories";
const TBL_LINKS = "link";

module.exports = {
    all: function () {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status!=0`);
    },
    //all: _ => db.load('SELECT * FROM categories'),
    add: function (entity) {

        const datasets = {
            Name: entity.Name,
            Slug: ctS.Slug(entity.Name),
            ParentID: entity.ParentID,
            Status: entity.Status,
            MetaKey: entity.MetaKey,
            MetaDesc: entity.MetaDesc,
            Created_at: ctS.timeNow(),
            Created_by: 1
        }
        return db.add(TBL_CATEGORIES, datasets);
    },
    checkName: function (name) {
        return db.checkName(TBL_CATEGORIES, name);
    },
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE ID = ${id}`);
    },
    update: function (entity, id) {
        const datasets = {
            Name: entity.Name,
            Slug: ctS.Slug(entity.Name),
            ParentID: entity.ParentID,
            Status: entity.Status,
            MetaKey: entity.MetaKey,
            MetaDesc: entity.MetaDesc,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        const condition = {
            ID: id
        }
        return db.update(TBL_CATEGORIES, datasets, condition);
    },
    status: function (entity, id) {
        const datasets = {
            Status: entity,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.update(TBL_CATEGORIES, datasets, { ID: id });
    },
    getTrash: function () {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status = 0`);
    },
    delete: function (id) {
        return db.delete(TBL_CATEGORIES, { ID: id });
    },
    checkStatus: function (id) {
        return db.load(`SELECT Status FROM ${TBL_CATEGORIES} WHERE Status != 0 AND ID = '${id}'`);
    },
    CUL: async function () {
        let list = await db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status != 0`);
        list.forEach(async function (e) {
            let heo = await db.load(`SELECT * FROM ${TBL_LINKS} WHERE Type='category' AND TableID = ${e.ID}`);
          //  let tl = await db.load(`SELECT * FROM ${TBL_LINKS} WHERE ID = ${heo[0].ID}`);
            if (heo.length > 0) {
                const datasets = {
                    Name: e.Name,
                    Slug: e.Slug
                }
                return db.update(TBL_LINKS, datasets, { ID: heo[0].ID });
           // } else if (tl.length > 0) {
             //   return db.delete(TBL_LINKS, { ID: heo[0].ID });
            } else if (heo.length === 0) {
                const datasets = {
                    Name: e.Name,
                    Slug: e.Slug,
                    Type: 'category',
                    TableID: e.ID
                }
                return db.add(TBL_LINKS, datasets);
            }
            return;
        })
    },
}

//formaction