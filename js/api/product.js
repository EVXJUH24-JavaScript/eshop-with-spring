import { Product } from "../models/product.js";
import { BASE_URL } from "./api.js";

// Anropar DummyJson med 'fetch' för att hämta alla produkter
export async function apiGetProducts() {
  const response = await fetch(BASE_URL + "/product/all");

  // Om responsen returnerade något annat än 200 Ok (eller annan Ok status kod)
  if (!response.ok) {
    // Man skulle även kunna hämta ut felmeddelandet från API:et här
    // om man vill
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();
  // Omvandla API objekten till vår egen model
  // för enklare hantering
  return products.map(
    (product) =>
      new Product(
        product.id,
        product.title,
        product.category,
        product.thumbnailUrl,
        product.images
      )
  );
}

// Anropar DummyJson med 'fetch' för att hämta en specifik produkt baserat på id
export async function apiGetProductById(productId) {
  const response = await fetch(BASE_URL + "/product/" + productId);

  // Om responsen returnerade något annat än 200 Ok (eller annan Ok status kod)
  if (!response.ok) {
    // Man skulle även kunna hämta ut felmeddelandet från API:et här
    // om man vill
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  // Omvandla API objektet till vår egen model
  // för enklare hantering
  return new Product(
    product.id,
    product.title,
    product.category,
    product.thumbnailUrl,
    product.images
  );
}
