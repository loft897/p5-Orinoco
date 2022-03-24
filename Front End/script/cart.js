const caseCard = document.querySelector(".case-cart");
const imgP = document.querySelector(".valuesI");
const nameP = document.querySelector(".valuesN");
const quantityP = document.querySelector(".valuesQ");
const priceP = document.querySelector(".valuesP");
const totalUP = document.querySelector(".valuesTU");
const deleleItem = document.querySelector(".valuesDEL");
const totalP = document.querySelector(".total > h2");
const emptyCart = document.querySelector(".empty-cart");

let product = localStorage.getItem("products");
let ArrayProducts = JSON.parse(localStorage.getItem("products"));

//GESTION PANIER

let total = [];
let b = [];

if (ArrayProducts === null || ArrayProducts == 0) {
  localStorage.clear();
  const emptyCard = `
  <div class = "empty-card">
  <div> Le panier est vide, revenez quand vous aurez ajouté un ou des produit(s) !
  </div>
  </div>
  `;
  caseCard.innerHTML = emptyCard;
} else {
  for (let i = 0; i < ArrayProducts.length; i++) {
    // creation img produit

    const divImgProduct = document.createElement("div");
    divImgProduct.classList.add("case-img");

    const imgProduct = document.createElement("img");
    imgProduct.src = ArrayProducts[i].imgArticle;
    imgProduct.alt = `image de la peluche ${ArrayProducts[i].nameArticle}`;
    divImgProduct.appendChild(imgProduct);
    imgP.appendChild(divImgProduct);

    // Creation couleur produit

    const divColor = document.createElement("div");
    divColor.classList.add("case-color");
    divImgProduct.appendChild(divColor);

    const colors = [
      "Tan",
      "Chocolate",
      "Black",
      "White",
      "Brown",
      "Pale brown",
      "Dark brown",
      "Blue",
      "Pink",
      "Beige",
    ];
    const codeColors = [
      "#D2B48C",
      "#D2691E",
      "#000000",
      "#ffffff",
      "#A52A2A",
      "#755847",
      "#3E2525",
      "#0000FF",
      "#FFC0CB",
      "#F5F5DC",
    ];

    let color = ArrayProducts[i].colorArticle;
    let index = colors.findIndex((colori) => colori === `${color}`);
    divColor.style.backgroundColor = `${codeColors[index]}`;

    // creation nom produit

    const divNameProduct = document.createElement("div");
    divNameProduct.classList.add("case-name");
    const nameProduct = document.createElement("h4");
    nameProduct.innerText = ArrayProducts[i].nameArticle;
    divNameProduct.appendChild(nameProduct);
    nameP.appendChild(divNameProduct);

    // creation quantité produit

    const divQuantityProduct = document.createElement("div");
    divQuantityProduct.classList.add("case-quantity");

    const minus = document.createElement("button");
    minus.classList.add("minus");
    minus.innerText = "-";

    const quantityProduct = document.createElement("div");
    quantityProduct.classList.add("number");
    quantityProduct.innerText = ArrayProducts[i].quantityArticle;

    const plus = document.createElement("button");
    plus.classList.add("plus");
    plus.innerText = "+";

    let a = ArrayProducts[i].quantityArticle;
    plus.addEventListener("click", () => {
      if (a < 10) {
        a++;
        ArrayProducts[i].quantityArticle++;
        localStorage.setItem("products", JSON.stringify(ArrayProducts));
        ArrayProducts = JSON.parse(localStorage.getItem("products"));
      }
      quantityProduct.innerText = a;
    });

    minus.addEventListener("click", () => {
      if (a > 1) {
        a--;
        ArrayProducts[i].quantityArticle--;
        localStorage.setItem("products", JSON.stringify(ArrayProducts));
        ArrayProducts = JSON.parse(localStorage.getItem("products"));
      }
      quantityProduct.innerText = a;
    });

    divQuantityProduct.appendChild(minus);
    divQuantityProduct.appendChild(quantityProduct);
    divQuantityProduct.appendChild(plus);
    quantityP.appendChild(divQuantityProduct);

    // creation prix produit

    const divPriceProduct = document.createElement("div");
    divPriceProduct.classList.add("case-price");
    const priceProduct = document.createElement("h4");
    priceProduct.innerText = ` ${Number.parseFloat(
      ArrayProducts[i].priceUnity
    ).toFixed(2)} €`;
    divPriceProduct.appendChild(priceProduct);
    priceP.appendChild(divPriceProduct);

    // creation prix total unitaire produit

    const divPriceTUProduct = document.createElement("div");
    divPriceTUProduct.classList.add("case-priceTU");
    const priceTUProduct = document.createElement("h4");
    priceTUProduct.setAttribute("id", "tt");
    priceTUProduct.innerText = ` ${Number.parseFloat(
      ArrayProducts[i].priceUnity * a
    ).toFixed(2)} €`;

    plus.addEventListener("click", () => {
      priceTUProduct.innerText = ` ${Number.parseFloat(
        ArrayProducts[i].priceUnity * a
      ).toFixed(2)} €`;
    });

    minus.addEventListener("click", () => {
      priceTUProduct.innerText = ` ${Number.parseFloat(
        ArrayProducts[i].priceUnity * a
      ).toFixed(2)} €`;
    });

    divPriceTUProduct.appendChild(priceTUProduct);
    totalUP.appendChild(divPriceTUProduct);

    // creation prix total produit

    z = [];

    function priceT() {
      for (let i = 0; i < ArrayProducts.length; i++) {
        let t = ArrayProducts[i].priceUnity * ArrayProducts[i].quantityArticle;
        z.push(t);
        let sum = z.reduce((a, b) => a + b);
        totalP.innerText = ` Total : ${Number.parseFloat(sum).toFixed(2)} €`;
      }
    }

    priceT();
    window.addEventListener("click", () => {
      let ArrayProducts = JSON.parse(localStorage.getItem("products"));
      priceT();
      z = [];
    });

    // Supprimer un article 1/2

    const divDel = document.createElement("div");
    divDel.classList.add("case-del");
    deleleItem.appendChild(divDel);
  }
}

// Supprimer un article 2/2

let btnDel = document.querySelectorAll(".case-del");
for (let l = 0; l < btnDel.length; l++) {
  btnDel[l].addEventListener("click", () => {
    let IdSelectDel = ArrayProducts[l].idArticle;
    ArrayProducts = ArrayProducts.filter(
      (item) => item.idArticle !== IdSelectDel
    );
    localStorage.setItem("products", JSON.stringify(ArrayProducts));
    location.reload();
  });
}

// Vider le panier

emptyCart.addEventListener("click", () => {
  let confirmation = confirm("Etes-vous sûr de vouloir vider le panier ?");
  if (confirmation) {
    localStorage.clear();
    location.reload();
  }
});

/////////// GESTION FORMULAIRE

const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const address = document.querySelector("#address");
const cp = document.querySelector("#cp");
const cityText = document.querySelector(".data > h4");
const order = document.querySelector(".order");
const allImg = document.querySelectorAll(".icone-verif");
const allSpan = document.querySelectorAll("span");
const form = document.querySelector("form");
let contact = {};
let zipCode = {};
let fn;
let ln;
let em;
let nb;
let ad;
let c;
let ct;

order.disabled = "disabled";

// Validation prénom utilisateur

firstName.addEventListener("input", () => {
  const regexFirstName = /^[a-zA-Z\s,'-]/gi.test(firstName.value);
  if (regexFirstName && firstName.value.trim().length >= 3) {
    allImg[0].style.display = "inline";
    allImg[0].src = "/Front End/ressources/check.svg";
    allSpan[0].style.display = "none";
    fn = true;
    contact.firstName = `${firstName.value}`;
  } else {
    allImg[0].style.display = "inline";
    allImg[0].src = "/Front End/ressources/error.svg";
    allSpan[0].style.display = "inline";

    fn = false;
  }
});

// Validation du nom

lastName.addEventListener("input", () => {
  const regexLastName = /^[a-zA-Z\s,'-]/gi.test(lastName.value);
  if (regexLastName && lastName.value.trim().length >= 3) {
    allImg[1].style.display = "inline";
    allImg[1].src = "/Front End/ressources/check.svg";
    allSpan[1].style.display = "none";
    ln = true;
    contact.lastName = `${lastName.value}`;
  } else {
    allImg[1].style.display = "inline";
    allImg[1].src = "/Front End/ressources/error.svg";
    allSpan[1].style.display = "inline";

    ln = false;
  }
});

// Validation email

email.addEventListener("input", () => {
  const regexEmail = /^\S+@\S+\.\S+$/gi.test(email.value);

  if (regexEmail) {
    allImg[2].style.display = "inline";
    allImg[2].src = "/Front End/ressources/check.svg";
    allSpan[2].style.display = "none";
    em = true;
    contact.email = `${email.value}`;
  } else {
    allImg[2].style.display = "inline";
    allImg[2].src = "/Front End/ressources/error.svg";
    allSpan[2].style.display = "inline";

    em = false;
  }
});

// Validation numero

number.addEventListener("input", () => {
  const regexNumber = /^(0)[1-9]\d{8}$/gi.test(number.value);

  if (regexNumber) {
    allImg[3].style.display = "inline";
    allImg[3].src = "/Front End/ressources/check.svg";
    allSpan[3].style.display = "none";
    nb = true;
  } else {
    allImg[3].style.display = "inline";
    allImg[3].src = "/Front End/ressources/error.svg";
    allSpan[3].style.display = "inline";
    nb = false;
  }
});

// Validation adresse

address.addEventListener("input", () => {
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/gi.test(address.value);

  if (regexAddress && address.value.trim().length >= 10) {
    allImg[4].style.display = "inline";
    allImg[4].src = "/Front End/ressources/check.svg";
    allSpan[4].style.display = "none";
    ad = true;
    contact.address = `${address.value}`;
  } else {
    allImg[4].style.display = "inline";
    allImg[4].src = "/Front End/ressources/error.svg";
    allSpan[4].style.display = "inline";

    ad = false;
  }
});

// Validation code postal et ville

cp.addEventListener("input", () => {
  const regexCp = /^[1-9]\d{4}$/gi.test(cp.value);

  if (regexCp) {
    allImg[5].style.display = "inline";
    allImg[5].src = "/Front End/ressources/check.svg";
    allSpan[5].style.display = "none";
    c = true;
    zipCode.zipcode = `${cp.value}`;

    // Validation ville

    let url = `https://geo.api.gouv.fr/communes?codePostal=${cp.value}&fields=nom&format=json&geometry=centre`;

    fetch(url)
      .then((response) =>
        response.json().then((data) => {
          if (data.length > 1) {
            const communes = document.createElement("ul");
            communes.classList.add("communes");
            communes.innerText = "Selectionnez votre commune :";
            for (let i = 0; i < data.length; i++) {
              const commune = document.createElement("li");
              commune.classList.add("commune");
              commune.innerHTML = data[i].nom;
              communes.appendChild(commune);
              form.appendChild(communes);
              commune.addEventListener("click", () => {
                cityText.innerHTML = data[i].nom;
                communes.style.display = "none";
                allImg[6].style.display = "inline";
                allImg[6].src = "/Front End/ressources/check.svg";
                ct = true;
                contact.city = `${data[i].nom}`;
              });
            }
          } else {
            let city = data[0].nom;
            cityText.innerHTML = city;
            allImg[6].style.display = "inline";
            allImg[6].src = "/Front End/ressources/check.svg";
            allSpan[6].style.display = "none";
            ct = true;
            contact.city = `${data[0].nom}`;
          }
        })
      )
      .catch(() => {
        allImg[5].style.display = "inline";
        allImg[5].src = "/Front End/ressources/error.svg";
        allSpan[5].style.display = "inline";

        allImg[6].style.display = "inline";
        allImg[6].src = "/Front End/ressources/error.svg";
        allSpan[6].style.display = "inline";
        ct = false;
      });
  } else {
    allImg[5].style.display = "inline";
    allImg[5].src = "/Front End/ressources/error.svg";
    allSpan[5].style.display = "inline";
    cityText.innerHTML = "";
    allImg[6].style.display = "inline";
    allImg[6].src = "/Front End/ressources/error.svg";
    allSpan[6].style.display = "none";
    c = false;
  }
});

// Validation des données saisies dans le formulaire pour activer le boutton commander

form.addEventListener("input", () => {
  if (fn && ln && em && nb && ad && c) {
    order.disabled = "";
  } else {
    order.disabled = "disabled";
  }
});

// creation tableau avec id des produits

let products = [];
for (let i = 0; i < ArrayProducts.length; i++) {
  products.push(ArrayProducts[i].idArticle);
}

// envoie commande

const objToSend = { contact, products };

order.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(objToSend),
    headers: {
      "Content-Type": "application/json ; charset=utf-8",
    },
  })
    // Recuperation des resultats

    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    })
    .then((contents) => {
      console.log(contents);
      localStorage.setItem("contents", JSON.stringify(contents));
      localStorage.setItem("product", JSON.stringify(ArrayProducts));
      localStorage.setItem("zipcode", JSON.stringify(zipCode));
      localStorage.removeItem("products");
      window.location.href = `order.html`;
    });
});
