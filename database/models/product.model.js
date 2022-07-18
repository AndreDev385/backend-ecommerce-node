const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const SpecificProductSchema = new Schema(
  {
    attrs: [
      {
        name: String,
        value: String,
      },
    ],
    assets: {
      defaultImg: {
        src: {
          type: String,
          required: true,
        },
      },
      imgs: [{ src: String }],
    },
    stock: {
      type: Number,
    },
    isAvaible: {
      type: Boolean,
      default: true,
    },
    price: {
      sellPrice: {
        type: Number,
        required: true,
      },
      regularPrice: {
        type: Number,
      },
      discountPrice: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categories: [CategorySchema],
    specificProducts: [SpecificProductSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.methods.toJSON = function () {
  const productModel = this.toObject();
  delete productModel.createdAt;
  delete productModel.updatedAt;
  delete productModel.__v;
  for (let sp of productModel.specificProducts)
    delete sp.createdAt && delete sp.updatedAt;
  for (let c of productModel.categories)
    delete c.createdAt && delete c.updatedAt;
  return productModel;
};

const product = mongoose.model("Product", ProductSchema);

module.exports = product;
