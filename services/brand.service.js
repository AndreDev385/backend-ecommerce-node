const boom = require("@hapi/boom");

const brandModel = require("../database/models/brand.model");

class BrandService {
  async getBrands() {
    const brands = await brandModel.find({ isActive: true });
    return brands;
  }

  async createBrand(body) {
    const brandExist = await brandModel.findOne({ name: body["name"] });
    if (brandExist) throw boom.badRequest("Brand already exist");
    const brand = await brandModel.create(body);
    return brand;
  }

  async retrieveBrand(id) {
    const brand = await brandModel.findOne({ _id: id, isActive: true });
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
}

module.exports = BrandService;
