const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const ProductVariationSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    images: {
      type: ObjectId,
      ref: "Asset",
      default: [],
    },
    attributes: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    normalPrice: {
      type: Number,
      default: 0,
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProductVariationSchema.methods.toJSON = function () {
  const productVariationModel = this.object();
  delete productVariationModel.createdAt;
  delete productVariationModel.updatedAt;
  delete productVariationModel.__v;
  return productVariationModel;
};

const ProductVariationModel = model("ProductVariation", ProductVariationSchema);

module.exports = ProductVariationModel;
