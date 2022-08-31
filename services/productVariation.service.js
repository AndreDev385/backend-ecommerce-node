const boom = require("@hapi/boom");

const VariationModel = require("../database/models/product_variation.model");
const ProductService = require("./product.service");
const {
	variationListAggregate,
	variationRetrieveAggregate,
} = require("./utils/variationService.query");

const productService = new ProductService();

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

	async updateVariation(id, body) {
		await this.variationExist(id);
		return await VariationModel.findByIdAndUpdate(id, body, { new: true });
	}

	async deleteVariation(id) {
		await this.variationExist(id);
		return await VariationModel.findByIdAndUpdate(
			id,
			{ isActive: false },
			{ new: true }
		);
	}
}

module.exports = VariationService;
