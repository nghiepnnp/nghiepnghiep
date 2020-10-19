const db = require('../utils/db');
const ctS = require('../utils/ctS');

const multer = require("multer");
const path = require("path");

const TBL_POSTS = "post";
const TBL_TOPICS = "topic";

module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status != 0 AND Type='post'`),
    topicID: _ => db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Status = 1`),
    add: function(req) {

        const datasets = {
            Title: req.body.Title,
            Slug: ctS.Slug(req.body.Title),
            TopicID: req.body.TopicID,
            Status: req.body.Status,
            Detail: req.body.Detail,
            Type: "post",
            Position: req.body.Position,

            Image: req.file.filename,
            MetaKey: req.body.MetaKey,
            MetaDesc: req.body.MetaDesc,
            Created_at: ctS.timeNow(),
            Created_by: 1,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.add(TBL_POSTS, datasets);
    },
    // checkName: function(title) {
    //     return db.checkName(TBL_POSTS, { Title: title });
    // },


    getOne: function(id) {
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE ID = ${id}`);
    },
    update: function(req, id) {
        if (!req.file) {
            const datasets = {
                Title: req.body.Title,
                Slug: ctS.Slug(req.body.Title),
                Description: req.body.Description,
                TopicID: req.body.TopicID,
                Status: req.body.Status,
                Detail: req.body.Detail,
                Type: "post",
                Position: req.body.Position,
                // Image: req.file.filename,
                MetaKey: req.body.MetaKey,
                MetaDesc: req.body.MetaDesc,
                Updated_at: ctS.timeNow(),
                Updated_by: 1
            }
            const condition = {
                ID: id
            }
            return db.update(TBL_POSTS, datasets, condition);
        } else {
            const datasets = {
                Title: req.body.Title,
                Slug: ctS.Slug(req.body.Title),
                Description: req.body.Description,
                TopicID: req.body.TopicID,
                Status: req.body.Status,
                Detail: req.body.Detail,
                Type: "post",
                Position: req.body.Position,
                Image: req.file.filename,
                MetaKey: req.body.MetaKey,
                MetaDesc: req.body.MetaDesc,
                Updated_at: ctS.timeNow(),
                Updated_by: 1
            }
            const condition = {
                ID: id
            }
            return db.update(TBL_POSTS, datasets, condition);
        }

    },
    status: function(entity, id) {
        const datasets = {
            Status: entity,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        return db.update(TBL_POSTS, datasets, { ID: id });
    },
    getTrash: function() {
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 0`);
    },
    delete: function(id) {
        return db.delete(TBL_POSTS, { ID: id });
    }
}

//formaction