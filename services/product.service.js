const Product = require("../database/models/product.model");

class ProductService {
  async getProducts() {
    const products = await Product.find();

    return products;
  }

  async createProduct(body) {
    const product = new Product(body)
    await product.save()

    return product;
  }

  async updateProduct(id, body) {}

  async deleteProduct(id) {
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );
  }
}

module.exports = ProductService;
