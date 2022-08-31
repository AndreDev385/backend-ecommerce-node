const { Types } = require("mongoose");

const hiddeValues = [
	"__v",
	"createdAt",
	"updatedAt",
	"isActive",
	"images.__v",
	"images.createdAt",
	"images.updatedAt",
	"images.isActive",
];

const variationListAggregate = [
	{
		$match: {
			isActive: true,
		},
	},
	{
		$lookup: {
			from: "assets",
			localField: "images",
			foreignField: "_id",
			as: "images",
		},
	},
	{
		$unset: hiddeValues,
	},
];

const variationRetrieveAggregate = (id) => {
	console.log(id);
	return [
		{
			$match: {
				isActive: true,
				_id: Types.ObjectId(id),
			},
		},
		{
			$lookup: {
				from: "assets",
				localField: "images",
				foreignField: "_id",
				as: "images",
			},
		},
		{
			$unset: hiddeValues,
		},
	];
};

module.exports = {
	variationListAggregate,
	variationRetrieveAggregate,
};
