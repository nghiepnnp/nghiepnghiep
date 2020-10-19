const mysql = require('mysql');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

module.exports = {
    load: function(sql) {
        return new Promise(function(resolve, reject) {
            pool.query(sql, function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },
    add: function(table, entity) {
        return new Promise(function(resolve, reject) {
            const sql = `INSERT INTO ${table} SET ?`;
            pool.query(sql, entity, function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },
    update: function(table, entity, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `UPDATE ${table} SET ? WHERE ?`;
            pool.query(sql, [entity, condition], function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },
    delete: function(table, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `DELETE FROM ${table} WHERE ?`;
            pool.query(sql, condition, function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },

    checkName: function(table, condition) {
        return new Promise(function(resolve, reject) {
            const sql = `SELECT * FROM ${table} WHERE ?`;
            pool.query(sql, condition, function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },
    checkNameUpdate: function(table, Slug, ID) {
        return new Promise(function(resolve, reject) {
            const sql = `SELECT * FROM ${table} WHERE Slug = '${Slug}' AND ID != ${ID}`;
            pool.query(sql, function(error, results, fields) {
                if (error) {
                    return reject(error.sqlMessage);
                }
                resolve(results);
            });
        });
    },
};


/**
 * Promise, thêm cấp xử lý, dc sử dụng để hạn chế gọi lại hàm, không cần sử dụng callback truyền đủ tham số. TÓM LẠI: ĐỠ PHẢI TRUYỀN ĐỦ THAM SỐ, GIẢM ĐỘ PHỨC TẠP KHI DÙNG
 */

/*
module.exports = {
    load: function (sql, fn_done, fn_fail) {
        const conn = mysql.createConnection(config.mysql);
        conn.connect();
        conn.query(sql, function (error, results, fields) {
            if (error) {
                conn.end();
                return fn_fail(error.sqlMessage);
            }
            fn_done(results);
            conn.end();
        });
    }
};

*/
