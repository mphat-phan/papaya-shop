import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
    
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * @desc    Get an order by id
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found!');
  }
});

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @desc    Get all order
 * @route   GET /api/orders
 * @access  Private/Admin only
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({createdAt: -1}).populate('user', 'id name');
  res.json(orders);
});

/**
 * @desc    Update order to delivered
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin only
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = 4;
    if(order.isPaid === false || order.isPaid === undefined){
      order.paidAt = Date.now();
      order.isPaid = true;
    }
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Update to confirm
const updateOrderToConfirm = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 2;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Update to cancel
const updateOrderToCancel = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 0;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Update to delivering
const updateOrderToDelivering = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = 3;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


const getTopProductMonthInYear = asyncHandler(async (req, res) => {
  var orders = [];
  const year = req.params.year;
  const month = req.params.month;
  var startDate = '';
  var endDate = '';
  if(month == 0){
    startDate = year + '-' + '1' + '-' + '1';
    endDate = year + '-' + '12' + '-' + '31';
  }
  else{
    startDate = year + '-' + month + '-' + '1';
    endDate = year + '-' + month + '-' + '31';
  }

  
  const top = req.params.top;
  orders = await Order.aggregate([
    { "$unwind": "$orderItems" },
    {
      $match: { 
        deliveredAt: { $gte: new Date(startDate),$lte: new Date(endDate) }
      }
    },
    {
      $group: { _id: "$orderItems.product", count: { $sum: 1 }, product: { "$first": "$orderItems" }}
    },
    {
      $sort: { "count": -1 }
    },
    { $limit : parseInt(top) }
  ]);
  
  res.json(orders);
});
const getRevenueOfYear = asyncHandler(async (req, res) => {
  const year = req.params.year;
  const columm = req.params.columm;
  const startDate = year + '-' + '1' + '-' + '1';
  const endDate = year + '-' + '12' + '-' + '31';
  var orders = [];
  if(columm === 'deliveredAt'){
    orders = await Order.aggregate([
    {
      $match: { 
        deliveredAt: { $gte: new Date(startDate),$lte: new Date(endDate) }
      }
    },
    {
      $group: { _id: {$month: "$"+columm}, total: { $sum: "$totalPrice" }, orderNum: { $sum: 1 }}
    }
  ])
  }

  for(let i = 1; i <= 12; i++){
    if(orders.some(order => order._id === i)){
      continue;
    }
    orders.push({
      "_id" : i,
      "total" : 0,
      "orderNum" : 0, 
    })
  }
  orders.sort((a,b) => {
    return a._id - b._id;
  })
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getRevenueOfYear,
  getTopProductMonthInYear,
  updateOrderToCancel,
  updateOrderToConfirm,
  updateOrderToDelivering
};
