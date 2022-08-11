const boom = require("@hapi/boom");

const brandModel = require("../database/models/brand.model");
const {
  brandListAggregate,
  brandRetrieveAggregate,
} = require("./utils/brandService.query");

class BrandService {
  async getBrands() {
    const brands = await brandModel.aggregate(brandListAggregate);
    return brands;
  }

  async createBrand(body) {
    const brandExist = await brandModel.findOne({ name: body["name"] });
    if (brandExist) throw boom.badRequest("Brand already exist");
    const brand = await brandModel.create(body);
    return brand;
  }

  async retrieveBrand(id) {
    const brand = await brandModel.aggregate(brandRetrieveAggregate(id));
    if (!brand) throw boom.badRequest("Brand not found");
    return brand;
  }

  async updateBrand(id, body) {
    await this.retrieveBrand(id);
    const brand = await brandModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return brand;
  }

  async deleteBrand(id) {
    await this.retrieveBrand(id);
    const brand = await brandModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return brand;
  }

  async addProduct(brandId, productId) {
    const brand = await brandModel.findById({ _id: brandId });
    console.log(brand);
    await brandModel.findByIdAndUpdate(
      brandId,
      { products: brand.products.concat(productId) },
      { new: true }
    );
  }
}

module.exports = BrandService;
