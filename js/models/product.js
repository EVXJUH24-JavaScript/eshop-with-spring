import { apiAddProductToCart, apiGetCart } from "../api/cart.js";
import { showCartItems } from "../pages/cart.js";

// En klass-modell för alla produkter som visas på sidan
// Den hjälper oss att förstå strukturen på produkt-objekten.
// Vi bakar även in några användbara funktioner, som 'createCardElement'
export class Product {
  constructor(id, title, category, thumbnailUrl, images) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.thumbnailUrl = thumbnailUrl;
    this.images = images;
  }

  // Skapar en <article> för produkten och returnerar elementet
  // Detta ska visas på huvudsidan och även produktsidan
  createCardElement() {
    // Skapa alla element som ska visas inom <article> produkten
    let link = document.createElement("a");
    let article = document.createElement("article");
    let imageContainer = document.createElement("div");
    let infoContainer = document.createElement("div");
    let image = document.createElement("img");
    let title = document.createElement("h3");
    let category = document.createElement("span");

    // När vi trycker på produkten ska vi skickas till en separat produktsida
    // Vi skickar med information om vilken produkt vi har tryckt på (productId)
    // Denna information läses av i js/pages/product.js
    link.href = "/product.html?productId=" + this.id;

    // Applicera klasser på de element som behöver det
    article.classList.add("product-card");
    imageContainer.classList.add("product-image");
    infoContainer.classList.add("product-info");

    // Fixa med styling och innehåll på elementen
    image.src = this.thumbnailUrl;
    image.style.width = "100%";
    image.alt = "Image of product " + this.title;
    title.textContent = this.title;
    category.textContent = this.category;

    // Placera elementet på rätt ställen inom <article>
    imageContainer.append(image);
    infoContainer.append(title, category);
    article.append(imageContainer, infoContainer);
    link.append(article);

    // Returnera "root"/huvud-elementet (<a>)
    return link;
  }

  // Skapar elementet som visas på produktsidan
  createViewElement() {
    // Skapa olika div som behövs
    const container = document.createElement("div");
    const imagesContainer = document.createElement("div");
    const thumbnailContainer = document.createElement("div");
    const infoContainer = document.createElement("div");

    // Applicera klasser för styling
    container.classList.add("product-view-container");
    imagesContainer.classList.add("images");
    thumbnailContainer.classList.add("thumbnail");
    infoContainer.classList.add("info");

    // Lägg till huvudbild
    const thumbnailWrapper = document.createElement("div");
    const thumbnail = document.createElement("img");

    thumbnail.src = this.thumbnailUrl;
    thumbnail.style.width = "100%";

    thumbnailWrapper.append(thumbnail);
    thumbnailContainer.append(thumbnailWrapper);

    // För att veta vilken bild som är "aktiverad"
    // sparar vi en array med alla image wrappers
    let imageElements = [];
    // Lägg till alla andra bilder
    for (const imageUrl of this.images) {
      const imageWrapper = document.createElement("div");
      const image = document.createElement("img");
      imageElements.push(imageWrapper);

      image.src = imageUrl;
      image.style.width = "100%";

      imageWrapper.append(image);
      imagesContainer.append(imageWrapper);

      // När vi trycker på en bild så byter vi huvudbilden (i mitten)
      imageWrapper.addEventListener("click", () => {
        thumbnail.src = imageUrl;

        // Ta bort styling från alla andra image wrappers
        for (const wrapper of imageElements) {
          wrapper.style.border = "none";
        }

        // Applicera border på den nya bilden vi tryckte på
        imageWrapper.style.border = "1px solid black";
      });
    }

    // Applicera border på huvudbilden när vi laddar in sidan första gången
    imageElements[0].style.border = "1px solid black";

    // Skapa element för produktinformation
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const cartButton = document.createElement("button");
    title.textContent = this.title;
    description.textContent = "Lorem ipsum";
    cartButton.textContent = "Add to cart";

    cartButton.addEventListener("click", () => {
      apiAddProductToCart(this).then(showCartItems).catch(console.error);
    });

    infoContainer.append(title, description, cartButton);

    container.append(imagesContainer, thumbnailContainer, infoContainer);
    return container;
  }
}
