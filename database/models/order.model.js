const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const orderSchema = new Schema(
	{
		counter: {
			type: Number,
		},

		total: {
			type: Number,
		},

		status: {
			type: String,
			enum: ["pending", "paid", "cancelled"],
			default: "pending",
		},

		products: [
			{
				type: ObjectId,
				ref: "Product",
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
	model: "Order",
	field: "counter",
	startAt: 1,
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
