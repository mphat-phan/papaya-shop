import mongoose from 'mongoose';

const receiptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    receiptItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    supplierAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Receipt = mongoose.model('Receipt', receiptSchema);

export default Receipt;
