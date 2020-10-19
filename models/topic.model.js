const db = require('../utils/db');
const cre = require('../utils/ctS');
const TBL_TOPICS = "topic";
const TBL_LINKS = "link";


module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Status != 0`),
    checkName: function(entity) {
        return db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Name = '${entity.Name}'`);
    },
    add: function(entity) {
        const datasets = {
            Name: entity.body.Name,
            Slug: cre.Slug(entity.body.Name),
            Status: entity.body.Status,
            ParentID: entity.body.ParentID,
            Orders: entity.body.Orders,
            MetaKey: entity.body.MetaKey,
            MetaDesc: entity.body.MetaDesc,
            Created_at: cre.timeNow(),
            Created_by: 1,
            Updated_at: cre.timeNow(),
            Updated_by: 1
        }
        return db.add(TBL_TOPICS, datasets);
    },
    checkNameUpdate(entity, id) {
        return db.checkNameUpdate(TBL_TOPICS, cre.Slug(entity.Name), id);
    },
    getOne: function(id) {
        return db.load(`SELECT * FROM ${TBL_TOPICS} WHERE ID = ${id}`);
    },
    update: function(entity, id) {
        const datasets = {
            Name: entity.body.Name,
            Slug: cre.Slug(entity.body.Name),
            Status: entity.body.Status,
            ParentID: entity.body.ParentID,
            Orders: entity.body.Orders,
            MetaKey: entity.body.MetaKey,
            MetaDesc: entity.body.MetaDesc,
            Created_at: cre.timeNow(),
            Created_by: 1,
            Updated_at: cre.timeNow(),
            Updated_by: 1
        }
        const condition = {
            ID: id
        }
        return db.update(TBL_TOPICS, datasets, condition);
    },
    status: function(entity, id) {
        const datasets = {
            Status: entity,
            Updated_at: cre.timeNow(),
            Updated_by: 1
        }
        return db.update(TBL_TOPICS, datasets, { ID: id });
    },
    getTrash: function() {
        return db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Status = 0`);
    },
    delete: function(id) {
        return db.delete(TBL_TOPICS, { ID: id });
    },
    CUL: async function () {
        let list = await db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Status != 0`);
        list.forEach(async function (e) {
            let heo = await db.load(`SELECT * FROM ${TBL_LINKS} WHERE Type='topic' AND TableID = ${e.ID}`);
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
                    Type: 'topic',
                    TableID: e.ID
                }
                return db.add(TBL_LINKS, datasets);
            }

            return;
        })
    },



}