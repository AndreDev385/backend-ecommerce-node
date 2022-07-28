const VariationModel = require("../database/models/product_variation.model");
const boom = require("@hapi/boom");

class VariationService {
  async getVariations() {
    return await VariationModel.find({ isActive: true });
  }

  async createVariation(body) {
    return await VariationModel.create(body);
  }

  async retrieveVariation(id) {}

  async updateVariation(id, body) {}

  async deleteVariation(id) {}
}

module.exports = VariationService;
