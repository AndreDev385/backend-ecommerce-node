const { Types } = require("mongoose");

const hiddenValues = [
  "createdAt",
  "isActive",
  "updatedAt",
  "__v",
  "image.createdAt",
  "image.isActive",
  "image.updatedAt",
  "image.__v",
  "products.createdAt",
  "products.isActive",
  "products.updatedAt",
  "products.__v",
];

const brandListAggregate = [
  {
    $match: { isActive: true },
  },
  {
    $lookup: {
      from: "assets",
      localField: "image",
      foreignField: "_id",
      as: "image",
    },
  },
  {
    $lookup: {
      from: "products",
      localField: "products",
      foreignField: "_id",
      as: "products",
    },
  },
  {
    $unset: hiddenValues,
  },
];

const brandRetrieveAggregate = (id) => {
  return [
    {
      $match: { _id: Types.ObjectId(id), isActive: true },
    },
    {
      $lookup: {
        from: "assets",
        localField: "image",
        foreignField: "_id",
        as: "image",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $unset: hiddenValues,
    },
  ];
};

module.exports = {
  brandListAggregate,
  brandRetrieveAggregate,
};
