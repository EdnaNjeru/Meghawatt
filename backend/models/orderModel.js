// Order model placeholder for future MongoDB integration
// Replace this with a Mongoose schema when MongoDB is connected.

class Order {
  constructor({ id, items, total, customer }) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.customer = customer;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Order;
