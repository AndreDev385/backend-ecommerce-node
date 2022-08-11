const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const CategorySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: ObjectId,
      ref: "Assets",
      default: null,
    },
    ancestors: [
      {
        type: String,
        default: [],
      },
    ],
    /*slug: {
      type: String,
      required: true,
    },*/
    description: {
      type: String,
      default: "",
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    tags: [
      {
        type: String,
        default: [],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

CategorySchema.methods.toJSON = function () {
  const categoryModel = this.toObject();
  delete categoryModel.createdAt;
  delete categoryModel.updatedAt;
  delete categoryModel.__v;
  delete categoryModel.isActive;
  return categoryModel;
};

const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;
