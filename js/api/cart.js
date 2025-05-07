import { Cart, CartItem } from "../models/cart.js";
import { Product } from "../models/product.js";
import { BASE_URL } from "./api.js";

// Anropa vårat API för att lägga till en produkt i varukorgen
export async function apiAddProductToCart(product) {
  const response = await fetch(
    BASE_URL + "/cart/add-product?productId=" + product.id,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error when adding cart item");
  }
}

// Anropa vårat API för att ta bort en produkt från varukorgen
export async function apiRemoveProductFromCart(product) {
  const response = await fetch(BASE_URL + "/cart/delete/" + product.id, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  if (!response.ok) {
    throw new Error("Error when removing cart item");
  }
}

// Anropa vårat API för att öka antal av produkten
export async function apiAddProductCartAmount(product) {
  const response = await fetch(
    BASE_URL + "/cart/modify/" + product.id + "?amount=1",
    {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error when incrementing cart item amount");
  }
}

// Anropa vårat API för att minska antal av produkten
export async function apiRemoveProductCartAmount(product) {
  const response = await fetch(
    BASE_URL + "/cart/modify/" + product.id + "?amount=-1",
    {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error when decrementing cart item amount");
  }
}

// Hämta hela varukorgen med produkter
export async function apiGetCart() {
  const response = await fetch(BASE_URL + "/cart", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  if (!response.ok) {
    throw new Error("Error when fetching cart items");
  }

  const cartItems = await response.json();

  let cartStorage = new Cart();
  cartStorage.items = cartItems.map(
    (item) =>
      new CartItem(
        new Product(
          item.product.id,
          item.product.title,
          item.product.category,
          item.product.thumbnailUrl,
          item.product.images
        ),
        item.amount
      )
  );

  return cartStorage;
}
