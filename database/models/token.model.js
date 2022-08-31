const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
		},
		isValid: {
			type: Boolean,
			default: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const token = mongoose.model("Token", tokenSchema);

module.exports = token;
