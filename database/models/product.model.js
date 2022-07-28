const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: ObjectId,
      ref: 'Brand',
      required: true,
    },
    images: [
      {
        type: ObjectId,
        ref: 'Assets',
        default: [],
      },
    ],
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
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
    variations: [
      {
        type: ObjectId,
        ref: 'ProductVariation',
        default: [],
      },
    ],
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
  return productModel;
};

const product = model('Product', ProductSchema);

module.exports = product;
