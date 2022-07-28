const mongoose = require('mongoose');
const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: ObjectId,
      ref: 'Assets',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

brandSchema.methods.toJSON = function () {
  const brandModel = this.toObject();
  delete brandModel.createdAt;
  delete brandModel.updatedAt;
  delete brandModel.__v;
  return brandModel;
};

const brand = mongoose.model('Brand', brandSchema);

module.exports = brand;
