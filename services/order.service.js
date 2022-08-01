const orderModel = require('../database/models/order.model');

class OrderService {
  async getOrders() {
    const orders = await orderModel.find({ isActive: true });
    return orders;
  }
}

module.exports = OrderService;
