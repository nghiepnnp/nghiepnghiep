const db = require('../utils/db');
const ctS = require('../utils/ctS');

const TBL_ORDERS = "_order";
const TBL_ORDER_DETAILS = "orderdetail";
const TBL_PRODUCTS = "products";

module.exports = {
    addOrder: async function (req) {

        const datasets = {
            UserID: req.session.authUser.ID,
            Name: req.body.Name,
            Phone: req.body.Phone,
            Email: req.body.Email,
            Address: req.body.Address,
            CreateDate: ctS.timeNow()
        }
        const rows = await db.add(TBL_ORDERS, datasets);
        const OrderID = rows.insertId;
        // console.log(OrderID);

        req.session.cart.forEach(function (c) {
            const order_data = {
                OrderID: OrderID,
                ProductID: c.id,
                Price: c.price,
                Quantity: c.quantity,
                Total: (c.quantity * c.price)
            }
            db.add(TBL_ORDER_DETAILS, order_data);
        })
        delete req.session.cart;
        return OrderID;
    },
    getAllProduct: _ => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE Status = 1`)


}
