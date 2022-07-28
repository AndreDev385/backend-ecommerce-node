const brandModel = require('../database/models/brand.model');

class BrandService {
  async getBrands() {
    const brands = await brandModel.find({ isActive: true });

    return brands;
  }

  async createBrand(body) {
    const brand = await brandModel.create({
      ...body,
    });

    return brand;
  }
}

module.exports = BrandService;
