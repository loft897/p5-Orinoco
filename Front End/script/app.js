const info = document.querySelector(".info");
const products = document.querySelector(".products");

// Appel API

function fecthTeddies() {
  fetch("http://localhost:3000/api/teddies")
    .then((answer) => answer.json())
    .catch((error) => {
      info.innerHTML = `  Nous n'avons pas réussi à afficher nos produits. Marci de lancer le
        serveur via le port 3000! <br />Si le problème persite, prendre
        contact avec le support.`;
    })
    .then((allTeddies) => {
      // console.log(allTeddies);
      createDisplayTeddies(allTeddies);
    });
}

fecthTeddies();

// Creation et affichage des produits

function createDisplayTeddies(allTeddies) {
  for (let teddie in allTeddies) {
    info.innerHTML = `  Nos produits`;
    info.style.fontSize = "30px";

    const product = document.createElement("div");
    product.classList.add("card-product");

    const linkProduct = document.createElement("a");
    linkProduct.href = `pages/product.html?id=${allTeddies[teddie]._id}`;

    const divImgProduct = document.createElement("div");
    divImgProduct.classList.add("case-img");

    const imgProduct = document.createElement("img");
    imgProduct.src = allTeddies[teddie].imageUrl;
    imgProduct.alt = `image de la peluche ${allTeddies[teddie].name}`;

    const divInfoProduct = document.createElement("div");
    divInfoProduct.classList.add("case-info");

    const nameProduct = document.createElement("h4");
    nameProduct.innerText = allTeddies[teddie].name;
    nameProduct.classList.add("name-product");

    const priceProduct = document.createElement("h4");
    priceProduct.innerText = ` ${Number.parseFloat(
      allTeddies[teddie].price / 100
    ).toFixed(2)} €`;
    priceProduct.classList.add("price-product");

    products.appendChild(product);
    product.appendChild(linkProduct);
    linkProduct.appendChild(divImgProduct);
    divImgProduct.appendChild(imgProduct);
    linkProduct.appendChild(divInfoProduct);
    divInfoProduct.appendChild(nameProduct);
    divInfoProduct.appendChild(priceProduct);
  }
}

createDisplayTeddies();
