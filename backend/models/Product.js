import mongoose from "mongoose";
// Declare the Schema of the Product model

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    desc: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    images: [String],
    price: {
      type: Number,
    },
    originPrice: {
      type: Number,
    },
    sale: {
      type: Number,
      required: true,
      default: 0,
    },
    brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
      },
    ],
    categorys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Caegory",
      },
    ],
    origin: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    sku: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    tags: [String],
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Review",
      },
    ],
    suppliers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Supplier",
      },
    ],
    metatitle: {
      type: String,
    },
    metaDesc: {
      type: String,
    },
    metaUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model

const Product = mongoose.model("Product", productSchema);

export default Product;
