/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./script/app.js ***!
  \***********************/
var info = document.querySelector(".info");
var products = document.querySelector(".products"); // Appel API

function fecthTeddies() {
  fetch("http://localhost:3000/api/teddies").then(function (answer) {
    return answer.json();
  })["catch"](function (error) {
    info.innerHTML = "  Nous n'avons pas r\xE9ussi \xE0 afficher nos produits. Marci de lancer le\n        serveur via le port 3000! <br />Si le probl\xE8me persite, prendre\n        contact avec le support.";
  }).then(function (allTeddies) {
    createDisplayTeddies(allTeddies);
  });
}

fecthTeddies(); // Creation et affichage des produits

function createDisplayTeddies(allTeddies) {
  for (var teddie in allTeddies) {
    info.innerHTML = "  Nos produits";
    info.style.fontSize = "30px";
    var product = document.createElement("div");
    product.classList.add("card-product");
    var linkProduct = document.createElement("a");
    linkProduct.href = "pages/product.html?id=".concat(allTeddies[teddie]._id);
    var divImgProduct = document.createElement("div");
    divImgProduct.classList.add("case-img");
    var imgProduct = document.createElement("img");
    imgProduct.src = allTeddies[teddie].imageUrl;
    imgProduct.alt = "image de la peluche ".concat(allTeddies[teddie].name);
    var divInfoProduct = document.createElement("div");
    divInfoProduct.classList.add("case-info");
    var nameProduct = document.createElement("h4");
    nameProduct.innerText = allTeddies[teddie].name;
    nameProduct.classList.add("name-product");
    var priceProduct = document.createElement("h4");
    priceProduct.innerText = " ".concat(Number.parseFloat(allTeddies[teddie].price / 100).toFixed(2), " \u20AC");
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
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map