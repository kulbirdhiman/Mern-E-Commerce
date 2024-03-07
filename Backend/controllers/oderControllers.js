import Order from '../models/oderModel.js'
import Product from '../models/productModel.js'
import expressAsyncHandler from 'express-async-handler'


function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);

    const totalPrice = (
        itemsPrice +
        shippingPrice +
        parseFloat(taxPrice)
    ).toFixed(2);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    };
}

const createOder = expressAsyncHandler(async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
        }

        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            );

            if (!matchingItemFromDB) {
                res.status(404);
                throw new Error(`Product not found: ${itemFromClient._id}`);
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calcPrices(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getallOder = expressAsyncHandler(async (req, res) => {
    try {
        const alloders = await Oder.find().populate("user", "id username")
        res.json(alloders)
    } catch (error) {
        res.status(404)
        throw new Error({ error: error.message })
    }
})
const getUsersOder = expressAsyncHandler(async (req, res) => {
    try {
        const oders = await Order.find({ user: req.user._id });
        res.json(oders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});
const countTotal = expressAsyncHandler(async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.json({ totalOrders })
    } catch (error) {
        res.status(409)
        throw new Error('Error in counting')
    }
});
const totalSales = expressAsyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        const totalsales = orders.reduce((sum, order) => {
            sum + order.totalPrice, 0
        });
        res.json(totalSales)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});
const totalSalesByDay = expressAsyncHandler(async (req, res) => {
    try {
        const sales = await Order.aggregate([
            {
                $match: {
                    paid: true
                }
            }
        ])
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});
const oderFindById = expressAsyncHandler(async (req, res) => {
    try {
        const order = Order.find(req.params._id).populate("user", "name email address");
        if (order) {
            res.json(order)
        }
        else {
            res.status(500)
            throw new Error("Oder not found")
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})
const payOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updateTime: req.body.updateTime,
            email_adress: req.body.email_adress
        }
        const updatedOrder = await order.save();
        res.status(202).json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not  Found")
    }
});
const markOrderAsDiliverd = expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.json(updatedOrder)
        }
        else {
            res.status(404)
            throw new Error('Order Not Found')
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})
export { createOder, getallOder, getUsersOder, countTotal, totalSales, totalSalesByDay, oderFindById, payOrder, markOrderAsDiliverd }