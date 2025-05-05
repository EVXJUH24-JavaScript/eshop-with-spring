export class CartItem {
  constructor(product, amount) {
    this.product = product;
    this.amount = amount;
  }
}

export class Cart {
  constructor() {
    this.items = [];
  }
}
