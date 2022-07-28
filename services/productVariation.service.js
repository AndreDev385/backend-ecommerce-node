const VariationModel = require("../database/models/product_variation.model");
const ProductService = require("./product.service");
const boom = require("@hapi/boom");

const productService = new ProductService();

class VariationService {
  async getVariations() {
    return await VariationModel.find({ isActive: true });
  }

  async createVariation(body) {
    const variation = await VariationModel.create(body);
    await productService.addVariation(variation.product, variation._id);
    return variation;
  }

  async retrieveVariation(id) {}

  async updateVariation(id, body) {}

  async deleteVariation(id) {}
}

module.exports = VariationService;
