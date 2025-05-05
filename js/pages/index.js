import { apiGetProducts } from "../api/product.js";

// Hämta ut div-listan som finns i index.html för rekommenderade produkter
const recommendedProductListElement = document.getElementById(
  "recommended-product-list"
);
// Hämta ut div-listan som finns i index.html för featured produkter
const featuredProductListElement = document.getElementById(
  "featured-product-list"
);

// Denna funktion körs när index.html laddas in för att dynamiskt rendera produkter
function setupIndexPage() {
  // Ladda in alla produkter från API:et och
  // lägg in dem på sidan när vi väl har fått tillbaka responsen
  apiGetProducts().then((products) => {
    // Fyll featured listan med produkter
    fillProductList(featuredProductListElement, products);

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

// Kör funktionen så fort index.html laddas in
setupIndexPage();
