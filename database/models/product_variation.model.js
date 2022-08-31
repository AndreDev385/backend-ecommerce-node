const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const VariationAttributeSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	},
	{ _id: false }
);

const ProductVariationSchema = new Schema(
	{
		product: {
			type: ObjectId,
			ref: "Product",
			required: true,
		},
		images: [
			{
				type: ObjectId,
				ref: "Asset",
				default: [],
			},
		],
		attributes: [
			{
				type: VariationAttributeSchema,
				required: true,
			},
		],
		normalPrice: {
			type: Number,
			default: 0,
		},
		sellCounter: {
			type: Number,
			default: 0,
		},
		offerPrice: {
			type: Number,
			default: null,
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
	const productVariationModel = this.toObject();
	delete productVariationModel.createdAt;
	delete productVariationModel.updatedAt;
	delete productVariationModel.__v;
	delete productVariationModel.isActive;
	return productVariationModel;
};

const ProductVariationModel = model("ProductVariation", ProductVariationSchema);

module.exports = ProductVariationModel;
