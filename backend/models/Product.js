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
      // requied: true,
    },
    images: [String],
    price: {
      type: Number,
      //requied: true,
    },
    originPrice: {
      type: Number,
      //requied: true,
    },
    sale: {
      type: Number,
    },
    brand: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Brand",
      },
    ],
    category: [
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
      type: String,
    },
    numReview: {
      type: String,
    },
    tags: [String],
    sold: [String],
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
