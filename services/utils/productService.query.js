const { Types } = require('mongoose');

const hiddenValues = [
  'createdAt',
  'updatedAt',
  '__v',
  'isActive',
  'variations.createdAt',
  'variations.updatedAt',
  'variations.__v',
  'variations.isActive',
  'brand.createdAt',
  'brand.updatedAt',
  'brand.__v',
  'brand.isActive',
  'category.__v',
  'category.createdAt',
  'category.updatedAt',
  'category.isActive',
  'images.__v',
  'images.createdAt',
  'images.updatedAt',
  'images.isActive',
];
const productListAggregate = [
  {
    $match: { isActive: true },
  },
  {
    $lookup: {
      from: 'productvariations',
      localField: 'variations',
      foreignField: '_id',
      as: 'variations',
    },
  },
  {
    $lookup: {
      from: 'brands',
      localField: 'brand',
      foreignField: '_id',
      as: 'brand',
    },
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'category',
      foreignField: '_id',
      as: 'category',
    },
  },
  {
    $lookup: {
      from: 'assets',
      localField: 'images',
      foreignField: '_id',
      as: 'images',
    },
  },
  {
    $unset: hiddenValues,
  },
];

const productRetrieveAggregate = (id) => {
  return [
    {
      $match: { isActive: true, _id: Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: 'productvariations',
        localField: 'variations',
        foreignField: '_id',
        as: 'variations',
      },
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brand',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'assets',
        localField: 'images',
        foreignField: '_id',
        as: 'images',
      },
    },
    {
      $unset: hiddenValues,
    },
  ];
};

module.exports = {
  productListAggregate,
  productRetrieveAggregate,
};
