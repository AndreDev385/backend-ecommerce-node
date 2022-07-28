const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const orderSchema = new Schema(
  {
    counter: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
    },

    products: [
      {
        type: ObjectId,
        ref: 'Product',
        required: true,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'counter',
  startAt: 1,
});

const order = mongoose.model('Order', orderSchema);

module.exports = order;
