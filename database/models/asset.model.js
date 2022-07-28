const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const assetSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    originalUrl: {
      type: String,
      required: true,
    },

    optimizedUrl: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const asset = mongoose.model('Assets', assetSchema);

module.exports = asset;
