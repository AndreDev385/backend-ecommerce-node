const CategoryModel = require("../database/models/category.model");
const boom = require("@hapi/boom");

class CategoryService {
  async getCategories() {
    const categories = await CategoryModel.find({ isActive: true });
    return categories;
  }

  async createCategory(body) {
    const categoryExist = await CategoryModel.findOne({name: body['name']})
    if (categoryExist) throw boom.badRequest('Category already exist')
    const category = await CategoryModel.create(body);
    return category
  }

  async retrieveCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw boom.badRequest("Category not found");
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
}

module.exports = CategoryService;
