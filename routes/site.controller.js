var express = require('express');
var router = express.Router();
const homeModel = require('../models/home.model');
const cre = require('../utils/ctS');
const { route } = require('./home.controller');


router.get('/', async function (req, res) {
    Home(req, res);
});
router.get('/san-pham', async function (req, res) {
    Product(req, res);
});
router.get('/bai-viet', async function (req, res) {
    Post(req, res);
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
router.post('/contact', async function (req, res) {
    try {
        await homeModel.newContact(req);
        req.flash('message', ['success', 'Cảm ơn bạn đã phản hồi!']);
        res.redirect('/');
    } catch (error) {
        console.log("An error occurred while saving the recording");
        res.redirect('/');
    }
});
router.get('/:slug', async function (req, res) {
    const slug = req.params.slug;
    console.log("slug : " + slug);
    const link = await homeModel.getLink(slug);
    if (link.length > 0) {
        if (link[0].Type == 'page') {
            SinglePage(req, res);
            return;
        } else if (link[0].Type == "topic") {
            console.log("bai viet theo chu de");
            return;
        } else if (link[0].Type == "category") {
            ProductCategory(req, res);
            return;
        }
    } else {
        const gProduct = await homeModel.getOneProduct(slug);
        const gPost = await homeModel.getOnePost(slug);
        if (gProduct.length > 0) {
            ProductDetail(req, res)
            return;
        } else if (gPost.length > 0) {
            PostDetail(req, res);
            return;
        }
        Error(req, res);
    }

});

async function Home(req, res) {
    delete req.session.keyword;
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        promotion: await homeModel.getPPromo(),
        tabc: await homeModel.getTabCategory(),
        allproduct: await homeModel.getAProduct(),
        banner: await homeModel.getBanner(),
        news: await homeModel.getHomePost(),
        title: 'Kinh doanh heo nái xuyên lục địa',
        path: 'Home',
    });
}
async function SinglePage(req, res) {
    const slug = req.params.slug;
    const gPage = await homeModel.getOnePage(slug);
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        result: gPage[0],
        title: gPage[0].Title,
        path: 'SinglePage',
    });
}
async function Product(req, res) {

    res.render('bpig/Master', {
        message: req.flash('message'),
        LayTenDanhMuc: 'Tất cả sản phâm',
        result: await homeModel.getAllProducts(),
        categories: await homeModel.getCategory(),
        catCha: await homeModel.chilayCatcapcha(),
        title: 'Tất cả sản phẩm',
        path: 'Product',
    });
}
async function ProductCategory(req, res) {
    const slug = req.params.slug;
    const PC = await homeModel.productsByCategory(slug);
    const danhmucsp = await homeModel.chilayCatcapcha();
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        catCha: danhmucsp,
        LayTenDanhMuc: await homeModel.getCat(slug),
        URL: slug,
        result: PC,
        title: await homeModel.getCat(slug),
        path: 'ProductCategory',
    });
}
async function PostDetail(req, res) {
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
}
async function Error(req, res) {
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        title: "Không tìm thấy trang",
        path: '404',
    });
}


async function ProductDetail(req, res) {
    const slug = req.params.slug;
    const product = await homeModel.getOne(slug);
    res.render('bpig/Master', {
        message: req.flash('message'),
        categories: await homeModel.getCategory(),
        allproduct: await homeModel.getAProduct(),
        result: product[0],
        title: product[0].Name,
        path: 'ProductDetail',
    })
}



module.exports = router;