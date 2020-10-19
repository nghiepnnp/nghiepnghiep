const db = require('../utils/db');
const ctS = require('../utils/ctS');

const TBL_CATEGORIES = "categories";
const TBL_PRODUCTS = "products";
const TBL_CONTACTS = "contact";
const TBL_BANNERS = "banners";
const TBL_TOPICS = "topic";
const TBL_POSTS = "post";
const TBL_LINKS = "link";

module.exports = {
    getCategory: function () {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status = 1`);
    },
    getPPromo: function () {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status = 1 ORDER BY Created_at desc LIMIT 0,8`);
    },
    getBanner: _ => db.load(`SELECT * FROM ${TBL_BANNERS} WHERE Status = 1 LIMIT 0,5`),
    getTabCategory: _ => db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status = 1 AND ParentID != 0 LIMIT 0,10`),
    getAProduct: _ => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status = 1`),
    getOne: function (slug) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Slug = '${slug}'`);
    },
    findOneById: function (id) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE ID = ${id}`);
    },
    getTopic: _ => db.load(`SELECT * FROM ${TBL_TOPICS} WHERE Status = 1`),
    getSPost: _ => db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 1 AND Position = 'Slider' ORDER BY Created_at ASC`),
    getPPost: _ => db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 1 AND Type="post" ORDER BY Created_at DESC`),
    getHomePost: _ => db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 1 AND Type="post" ORDER BY Created_at DESC LIMIT 0,5 `),
    findOne: function (slug) {
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE Slug = '${slug}'`);
    },
    getCat: function (slug) {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Slug = '${slug}'`);
    },
    search: function (key) {
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Name LIKE '%${key}%'`);
    },
    chilayCatcapcha: function () {
        return db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE Status = 1 AND ParentID = 0`);
    },
    productsByCategory: function (slug) {
        return db.load(`SELECT p.Slug, p.PromotionPrice, p.Price,p.Name, p.BuyOS, p.Gop0, p.Image  FROM ${TBL_PRODUCTS} p left JOIN ${TBL_CATEGORIES} c ON p.Cate_ID = c.ID
        WHERE c.ParentID = (SELECT ID FROM ${TBL_CATEGORIES} WHERE Slug='${slug}') OR
        c.ID = (SELECT ID FROM ${TBL_CATEGORIES} WHERE Slug='${slug}')`);
        // parentID lấy ra tất cả sản phẩm có parentID == slug
        // id chỉ đích cấp con
    },
    getLink:function(slug){
        return db.load(`SELECT * FROM ${TBL_LINKS} WHERE Slug = '${slug}'`);
    },
    getOneProduct:function(slug){
        return db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status = 1 AND Slug = '${slug}'`)
    },
    getOnePost:function(slug){
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 1 AND Slug = '${slug}' AND Type='post'`)
    },
    getOnePage:function(slug){
        return db.load(`SELECT * FROM ${TBL_POSTS} WHERE Status = 1 AND Slug = '${slug}' AND Type='page'`)
    },
    newContact: function (req) {
        const datasets = {
            Fullname: req.body.Fullname,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Content: req.body.Content,
            Status:1,
            Created_at: ctS.timeNow(),
        }
        return db.add(TBL_CONTACTS, datasets);
    },
    getAllProducts:_=>db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status = 1`),


}

//formaction