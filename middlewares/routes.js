module.exports = function(app) {

    // Route backend    
    // app.use('/admin/', require('../routes/dashboard.controller'));
    app.use('/admin', require('../routes/dashboard.controller'));
    app.use('/admin', require('../routes/category.controller'));
    app.use('/admin/category', require('../routes/category.controller'));
    app.use('/admin/post', require('../routes/post.controller'));
    app.use('/admin/topic', require('../routes/topic.controller'));
    app.use('/admin/user', require('../routes/user.controller'));
    app.use('/admin/product', require('../routes/product.controller'));
    app.use('/admin/order', require('../routes/order.controller'));
    app.use('/admin/page', require('../routes/page.controller'));
    app.use('/admin/contact', require('../routes/contact.controller'));

    //
    app.use('/account', require('../routes/account.controller'));

    // Route customer
    app.use('/cart', require('../routes/cart.controller'));
    app.use('/', require('../routes/site.controller'));

    //app.use('/', require('../routes/home.controller'));
}