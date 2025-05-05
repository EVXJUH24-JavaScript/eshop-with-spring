import {
  apiAddProductCartAmount,
  apiGetCart,
  apiRemoveProductCartAmount,
  apiRemoveProductFromCart,
} from "../api/cart.js";
import { CartItem } from "../models/cart.js";
import { Product } from "../models/product.js";

// Hämta knappen, för att öppna varukorgen som finnas på alla html sidor
const openCartButton = document.getElementById("open-cart-button");

// Skapa sidebar elementet för varukorgen
export function createCartSidebar() {
  // Skapa elementen (än så länge bara en section och knapp)
  const cartContainer = document.createElement("section");
  const closeButton = document.createElement("button");
  const cartItems = document.createElement("div");

  // Applicera id och klasser för styling
  cartContainer.id = "cart-container";
  cartContainer.classList.add("cart-closed");
  cartItems.id = "cart-items";

  // Lägg till en snygg ikon för stäng-knappen
  closeButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

  // Stäng varukorgen när vi trycker på knappen
  closeButton.addEventListener("click", () => {
    cartContainer.classList.add("cart-closed");
  });

  cartContainer.append(closeButton, cartItems);

  return cartContainer;
}

export function showCartItems() {
  const cartItems = document.getElementById("cart-items");
  cartItems.textContent = "";

  apiGetCart().then((cart) => {
    cart.items = cart.items.map(
      // Destructuring för att komma åt variablarna direkt
      // Kort för (cartItem) => cartItem.product till exempel
      ({ product, amount }) =>
        new CartItem(
          new Product(
            product.id,
            product.title,
            product.category,
            product.thumbnailUrl,
            product.images
          ),
          amount
        )
    );

    for (const cartItem of cart.items) {
      const article = document.createElement("article");
      article.classList.add("cart-item");

      const titleSpan = document.createElement("span");
      const amountSpan = document.createElement("span");
      const deleteButton = document.createElement("button");
      const incrementButton = document.createElement("button");
      const decrementButton = document.createElement("button");

      deleteButton.textContent = "X";
      incrementButton.textContent = "+";
      decrementButton.textContent = "-";
      titleSpan.textContent = cartItem.product.title;
      amountSpan.textContent = cartItem.amount + "x";

      deleteButton.addEventListener("click", () => {
        apiRemoveProductFromCart(cartItem.product).then(showCartItems);
      });

      incrementButton.addEventListener("click", () => {
        apiAddProductCartAmount(cartItem.product).then(showCartItems);
      });

      decrementButton.addEventListener("click", () => {
        apiRemoveProductCartAmount(cartItem.product).then(showCartItems);
      });

      article.append(
        titleSpan,
        amountSpan,
        deleteButton,
        incrementButton,
        decrementButton
      );

      cartItems.append(article);
    }
  });
}

// Skapa varukorg-elementet när vi startar sidan
function setupCartPage() {
  document.body.append(createCartSidebar());
  showCartItems();

  // Öppna varukorgen när vi trycker på öppna knappen
  openCartButton.addEventListener("click", () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.classList.remove("cart-closed");
  });
}

// Kör funktionen när alla sidor laddas in
setupCartPage();
