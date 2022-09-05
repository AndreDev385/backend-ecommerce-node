const boom = require("@hapi/boom");

const VariationModel = require("../database/models/product_variation.model");
const ProductService = require("./product.service");

const AssetService = require("./asset.service");

const {
  variationListAggregate,
  variationRetrieveAggregate,
} = require("./utils/variationService.query");

const productService = new ProductService();
const assetService = new AssetService();

class VariationService {
  async getVariations() {
    return await VariationModel.aggregate(variationListAggregate);
  }

  async createVariation(body) {
    const variation = await VariationModel.create(body);
    await productService.addVariation(variation.product, variation._id);
    return variation;
  }

  async variationExist(id) {
    const variation = await VariationModel.findOne({ _id: id, isActive: true });
    if (!variation) throw boom.badRequest("product variation not found");
  }

  async retrieveVariation(id) {
    await this.variationExist(id);
    const variation = await VariationModel.aggregate(
      variationRetrieveAggregate(id)
    );
    return variation;
  }

  async findOne(id) {
    await this.variationExist(id);
    return await VariationModel.findById(id);
  }

  async updateVariation(id, body) {
    await this.variationExist(id);
    return await VariationModel.findByIdAndUpdate(id, body, { new: true });
  }

  async desactiveVariation(id) {
    await this.variationExist(id);
    return await VariationModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  async deleteVariation(id) {
    const variation = await this.findOne(id);
    console.log(variation)
    for (const image of variation.images) {
      await assetService.deleteAsset(image);
    }
    return await VariationModel.findByIdAndDelete(id);
  }
}

module.exports = VariationService;
