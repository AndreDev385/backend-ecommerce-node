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

const brand = mongoose.model('Brand', brandSchema);

module.exports = brand;
