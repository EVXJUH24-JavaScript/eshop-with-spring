import { Cart, CartItem } from "../models/cart.js";
//import { Product } from "../models/product.js";

export async function apiAddProductToCart(product) {
  let cartStorage = await apiGetCart();
  if (
    cartStorage.items.find((cartItem) => cartItem.product.id === product.id) !==
    undefined
  ) {
    await apiAddProductCartAmount(product);
    return;
  }

  cartStorage.items.push(new CartItem(product, 1));
  localStorage.setItem("cart", JSON.stringify(cartStorage));
}

export async function apiRemoveProductFromCart(product) {
  let cartStorage = await apiGetCart();

  let itemIndex = cartStorage.items.findIndex(
    (cartItem) => cartItem.product.id === product.id
  );
  if (itemIndex === -1) {
    return;
  }

  cartStorage.items.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cartStorage));
}

export async function apiAddProductCartAmount(product) {
  let cartStorage = await apiGetCart();

  let itemIndex = cartStorage.items.findIndex(
    (cartItem) => cartItem.product.id === product.id
  );
  if (itemIndex === -1) {
    return;
  }

  cartStorage.items[itemIndex].amount++;
  localStorage.setItem("cart", JSON.stringify(cartStorage));
}

export async function apiRemoveProductCartAmount(product) {
  let cartStorage = await apiGetCart();

  let itemIndex = cartStorage.items.findIndex(
    (cartItem) => cartItem.product.id === product.id
  );
  if (itemIndex === -1) {
    return;
  }

  cartStorage.items[itemIndex].amount--;
  if (cartStorage.items[itemIndex].amount <= 0) {
    await apiRemoveProductFromCart(product);
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cartStorage));
}

export async function apiGetCart() {
  let cartStorage = localStorage.getItem("cart");
  if (cartStorage === null) {
    return new Cart();
  }

  cartStorage = JSON.parse(cartStorage);
  let cartItems = cartStorage.items;
  cartStorage = new Cart();
  cartStorage.items = cartItems;

  return cartStorage;
}
