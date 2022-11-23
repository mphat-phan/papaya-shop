import mongoose from "mongoose";
// Declare the Schema of the Product model

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
