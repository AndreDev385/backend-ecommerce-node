const ProductModel = require("../database/models/product.model");

class ProductService {
  async getProducts() {
    const productsAggregate = await ProductModel.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $lookup: {
          from: "productvariations",
          localField: "variations",
          foreignField: "_id",
          as: "variations",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unset: [
          "createdAt",
          "updatedAt",
          "__v",
          "isActive",
          "variations.createdAt",
          "variations.updatedAt",
          "variations.__v",
          "variations.isActive",
          "brand.createdAt",
          "brand.updatedAt",
          "brand.__v",
          "brand.isActive",
          "category.__v",
          "category.createdAt",
          "category.updatedAt",
          "category.isActive",
        ],
      },
    ]);
    return productsAggregate;
  }

  async createProduct(body) {
    const product = await ProductModel.create(body);
    return product;
  }

  async updateProduct(id, body) {}

  async addVariation(id, variationId) {
    const product = await ProductModel.findById({ _id: id });
    await ProductModel.findByIdAndUpdate(
      id,
      { variations: product.variations.concat(variationId) },
      { new: true }
    );
  }

  async deleteProduct(id) {
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductService;
