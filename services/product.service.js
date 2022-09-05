const boom = require("@hapi/boom");

const ProductModel = require("../database/models/product.model");
const AssetService = require("./asset.service");
const {
  productListAggregate,
  productRetrieveAggregate,
} = require("./utils/productService.query");

const assetService = new AssetService();

class ProductService {
  async getProducts() {
    const productsAggregate = await ProductModel.aggregate(
      productListAggregate
    );
    return productsAggregate;
  }

  async createProduct(body) {
    const product = await ProductModel.create(body);
    return product;
  }

  async productExists(id) {
    const product = await ProductModel.findOne({ _id: id, isActive: true });
    if (!product) throw boom.badRequest("Product Not found");
  }

  async retrieveProduct(id) {
    await this.productExists(id);
    const product = await ProductModel.aggregate(productRetrieveAggregate(id));
    return product;
  }

  async findOne(id) {
    await this.productExists(id);
    return await ProductModel.findById(id);
  }

  async updateProduct(id, body) {
    await this.productExists(id);
    const product = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return product;
  }

  async addVariation(productId, variationId) {
    const product = await ProductModel.findById({ _id: productId });
    await ProductModel.findByIdAndUpdate(
      productId,
      { variations: product.variations.concat(variationId) },
      { new: true }
    );
  }

  async addVariations(productId, variationsIds) {
    const product = await ProductModel.findById({ _id: productId });
    await ProductModel.findByIdAndUpdate(
      productId,
      { variations: variationsIds },
      { new: true }
    );
  }

  async desactiveProduct(id) {
    await this.productExists(id);
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );
    return product;
  }

  async deleteProduct(id) {
    await this.productExists(id);
    const product = await this.findOne(id);
    for (const image of product.images) {
      await assetService.deleteAsset(image);
    }
    return await ProductModel.findByIdAndDelete(id);
  }
}

module.exports = ProductService;
