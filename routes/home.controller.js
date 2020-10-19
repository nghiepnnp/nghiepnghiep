var express = require('express');
var router = express.Router();
const homeModel = require('../models/home.model');
const cre = require('../utils/ctS');


/* GET home page. */
router.get('/', async function (req, res) {
    //req.session.cart.push({ element: element });
    //req.session.cart++;
    delete req.session.keyword;
    console.log(req.session.cart);
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        promotion: await homeModel.getPPromo(),
        tabc: await homeModel.getTabCategory(),
        allproduct: await homeModel.getAProduct(),
        banner: await homeModel.getBanner(),
        title: 'Kinh doanh heo nái xuyên lục địa',
        path: 'Home',

    });
});

router.get('/tin-tuc', async function (req, res) {

    res.render('bpig/Master', {
        message: req.flash('message'),
        fTN: cre.formatTimeNews,
        categories: await homeModel.getCategory(),
        topic: await homeModel.getTopic(),
        spost: await homeModel.getSPost(),
        ppost: await homeModel.getPPost(),
        title: 'Tin tức',
        path: 'News',
    });
});
router.get('/tin-tuc/:slug', async function (req, res) {
    const slug = req.params.slug;
    const rows = await homeModel.findOne(slug);
    if (rows.length == 0) {
        res.redirect('../');
    }
    res.render('bpig/Master', {
        message: req.flash('message'),
        fTN: cre.formatDTimeNews,
        categories: await homeModel.getCategory(),
        topic: await homeModel.getTopic(),
        ppost: await homeModel.getPPost(),
        getOne: rows[0],
        title: rows[0].Title,
        path: 'NewsDetail',
    });
});
router.get('/search', async function (req, res) {
    const key = (req.query.key).trim();
    req.session.keyword = key;
    const results = await homeModel.search(key);
    if (results.length == 0) {
        req.flash('message', [key]);
        res.render('bpig/Master', {
            message: req.flash('message'),
            categories: await homeModel.getCategory(),
            results: 0,
            title: 'Không tìm thấy kết quả phù hợp',
            path: 'SearchResults',
        });
    } else {
        req.flash('message', [key]);
        res.render('bpig/Master', {
            message: req.flash('message'),
            categories: await homeModel.getCategory(),
            results: results,
            title: 'Kết quả tìm kiếm: ' + key,
            path: 'SearchResults',
        });
    }
});


router.get('/:slug', async function (req, res) {
    const slug = req.params.slug || -1;
    const category = await homeModel.getCat(slug);
    const product = await homeModel.getOne(slug);
    if (category.length == 0 && product.length == 0) {
        res.redirect('../');
    }
    if (category.length > 0) {
        res.render('bpig/Master', {
            message: req.flash('message'),
            categories: await homeModel.getCategory(),
            productsByCategory: await homeModel.productsByCategory(slug),
            result: category[0],
            title: category[0].Name,
            path: 'CProduct',

        })
    }
    else if (product.length > 0) {
        res.render('bpig/Master', {
            message: req.flash('message'),
            categories: await homeModel.getCategory(),
            allproduct: await homeModel.getAProduct(),
            result: product[0],
            title: product[0].Name,
            path: 'ProductDetail',
        })
    }
});





module.exports = router;