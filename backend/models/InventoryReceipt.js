import mongoose from 'mongoose';

const inventoryReceiptSchema = mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Supplier',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        productDetail: {
            _id: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            }
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalQuantity: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: Number,
            required: true,
            default: 1,
        },
        note: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const InventoryReceipt = mongoose.model('InventoryReceipt', inventoryReceiptSchema);
export default InventoryReceipt;