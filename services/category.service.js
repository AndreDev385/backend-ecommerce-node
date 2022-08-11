const CategoryModel = require("../database/models/category.model");
const boom = require("@hapi/boom");
const {
  categoryListAggregate,
  categoryRetrieveAggregate,
} = require("./utils/categoryService.query");

class CategoryService {
  async getCategories() {
    let categories = await CategoryModel.aggregate(categoryListAggregate);
    return categories;
  }

  async createCategory(body) {
    const category = await CategoryModel.create(body);
    return category;
  }

  async retrieveCategory(id) {
    let category = await CategoryModel.aggregate(categoryRetrieveAggregate(id));
    if (category.length < 1) throw boom.badRequest("Category not found");
    let descendants = await CategoryModel.find({ ancestors: category[0]._id });
    category[0] = {...category[0], descendants}
    return category;
  }

  async updateCategory(id, body) {
    await this.retrieveCategory(id);
    const category = await CategoryModel.findByIdAndUpdate({ id }, body, {
      new: true,
    });
    return category;
  }

  async deleteCategory(id) {
    await this.retrieveCategory(id);
    const category = await CategoryModel.findByIdAndUpdate(
      { id },
      { isActive: false },
      { new: true }
    );
    return category;
  }

  async addProduct(categoryId, productId) {
    const category = await CategoryModel.findById({ _id: categoryId });
    await CategoryModel.findByIdAndUpdate(
      categoryId,
      { products: category.products.concat(productId) },
      { new: true }
    );
  }
}

module.exports = CategoryService;
