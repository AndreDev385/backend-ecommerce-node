const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: ObjectId,
      ref: 'Assets',
      default: null,
    },
    slug: {
      type: String,
      required: true,
    },
    //no se si tiene sentido manejar un title y un name
    title: {
      type: String,
      default: '',
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
    isCategory: {
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

const CategoryModel = model('Category', CategorySchema);

module.exports = CategoryModel;
