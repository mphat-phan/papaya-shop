import asyncHandler from 'express-async-handler';
import Receipt from '../models/receiptModel.js';

/**
 * @desc    Create new order
 * @route   POST /api/receipts
 * @access  Private/Admin only
 */
const addReceiptItems = asyncHandler(async (req, res) => {
    const {
        receiptItems,
        supplierAddress,
        totalPrice,
    } = req.body;
    
    if (receiptItems && receiptItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        const receipt = new Receipt({
            receiptItems,
            user: req.user._id,
            supplierAddress,
            totalPrice,
        });

        const createdReceipt = await receipt.save();
        res.status(201).json(createdReceipt);
    }
});

/**
 * @desc    Create new order
 * @route   GET /api/receipts
 * @access  Private/Admin only
 */
const getReceipts = asyncHandler(async (req, res) => {
    const receipt = await Receipt.find({}).populate('user', 'id name');
    res.json(receipt);
});

/**
 * @desc    Create new order
 * @route   GET /api/receipt/:id
 * @access  Private/Admin only
 */
const getReceiptById = asyncHandler(async (req, res) => {
    const receipt = await Receipt.findById(req.params.id).populate(
        'user',
        'name email'
    );
    
    if (receipt) {
        res.status(200).json(receipt);
    } else {
    res.status(404);
        throw new Error('Receipt not found!');
    }
});

/**
 * @desc    Delete receipt
 * @route   DELETE /api/receipt/:id
 * @access  Private/Admin only
 */
const deleteReceiptById = asyncHandler(async (req, res) => {

});

/**
 * @desc    Delete receipt
 * @route   PUT /api/receipt/:id
 * @access  Private/Admin only
 */
const updateReceiptById = asyncHandler(async (req, res) => {

});

/**
 * @desc    Update receipt to delivered
 * @route   PUT /api/receipt/:id/delivered
 * @access  Private/Admin only
 */
const updateReceiptToDelivered = asyncHandler(async (req, res) => {
    const receipt = await Receipt.findById(req.params.id);
    if (receipt) {
        receipt.isDelivered = true;
        receipt.deliveredAt = Date.now();
        const updatedReceipt = await receipt.save();
        res.json(updatedReceipt);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export {
    addReceiptItems,
    deleteReceiptById,
    getReceiptById,
    updateReceiptById,
    updateReceiptToDelivered,
    getReceipts
}
  