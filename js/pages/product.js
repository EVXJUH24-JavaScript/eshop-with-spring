import { apiGetProductById, apiGetProducts } from "../api/product.js";

// Hämta ut div-listan som finns i index.html för rekommenderade produkter
const recommendedProductListElement = document.getElementById(
  "recommended-product-list"
);
const productViewContainer = document.getElementById("product-view");

// Hämta ut sökparameter och baka in i URLSearchParams
// som hjälper oss att hämta ut id:t
const urlParams = new URLSearchParams(window.location.search);
// Hämta ut productId genom .get metoden
const productId = urlParams.get("productId");

function setupProductPage() {
  // Ladda in den produkten vi har tryckt på från API:et och
  // lägg in den på sidan när vi väl har fått tillbaka responsen
  apiGetProductById(productId).then((product) => {
    // Lägg in produkt elementet (view) i product diven
    productViewContainer.append(product.createViewElement());
  });

  // Ladda in alla produkter (egentligen rekommenderade) från API:et och
  // lägg in dem på sidan när vi väl har fått tillbaka responsen
  apiGetProducts().then((products) => {
    // Fyll recommended listan med produkter
    fillProductList(recommendedProductListElement, products);
  });
}

// Ritar ut produkter (products) inom ett visst element (element)
// genom att loopa listan av produkter och skapa kort-element.
function fillProductList(element, products) {
  element.textContent = "";

  for (const product of products) {
    element.append(product.createCardElement());
  }
}

// Kör funktionen när product.html laddas in
setupProductPage();
