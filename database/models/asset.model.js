const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const AssetSize = Schema(
  {
    size: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const AssetSchema = Schema(
  {
    owner: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    original: {
      type: String,
      required: true,
    },
    sizes: [
      {
        type: AssetSize,
        default: [],
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    indexOrder: {
      type: Number,
    },
  },
  {
    timestapms: true,
  }
);

const AssetModel = model("Asset", AssetSchema);

module.exports = AssetModel;
