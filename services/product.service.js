const ProductModel = require("../database/models/product.model");

class ProductService {
  async getProducts() {
    const products = await ProductModel.find({});
    return products;
  }

  async createProduct(body) {
    const product = await ProductModel.create(body);
    return product;
  }

  async updateProduct(id, body) {}

  async deleteProduct(id) {
    const product = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductService;
