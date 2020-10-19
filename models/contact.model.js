const db = require('../utils/db');
const ctS = require('../utils/ctS');

const TBL_CONTACTS = "contact";

module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_CONTACTS}`),
    daTraLoi: _ => db.load(`SELECT * FROM ${TBL_CONTACTS} WHERE Status = 2`),
    chuaTraLoi: _ => db.load(`SELECT * FROM ${TBL_CONTACTS} WHERE Status = 1`),
    getOne: function (id) {
        return db.load(`SELECT * FROM ${TBL_CONTACTS} WHERE ID = ${id}`)
    },
    Reply: function (entity, id) {
        const datasets = {
            Reply: entity.Reply,
            Status: 2,
            Updated_at: ctS.timeNow(),
            Updated_by: 1
        }
        const condition = {
            ID: id
        }
        return db.update(TBL_CONTACTS, datasets, condition);
    },

}

//formaction