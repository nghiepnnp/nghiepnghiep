const db = require('../utils/db');
const ctS = require('../utils/ctS');
const TBL_USERS = "user";

module.exports = {
    all: _=> db.load(`SELECT * FROM ${TBL_USERS} WHERE Status != 0 ORDER BY ID DESC`),
    trash: _=> db.load(`SELECT * FROM ${TBL_USERS} WHERE Status = 2`),
    singleByUserName: async function(username) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Phone = '${username}' OR Email = '${username}' AND Status = 1`);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
    checkPhoneNumber: async function(phone) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Phone = ${phone}`);
        if (rows.length === 0)
            return true;
        return false;
    },
    singleByAdminName: async function(username) {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE Phone = '${username}' OR Email = '${username}' AND Status = 1 AND Access = 1`);
        if (rows.length === 0)
            return null;
        return rows[0];
    }

}

//formaction