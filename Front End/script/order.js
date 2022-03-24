const caseOrder = document.querySelector(".case-order")
const noOrder = document.querySelector(".no-order");
const recapOrder = document.querySelector(".div-recap-order");
const totalAmount = document.querySelector(".total-amount");
const firstName = document.querySelector(".firstname");
const lastName = document.querySelector(".lastname");
const email = document.querySelector(".email");
const address = document.querySelector(".address");
const city = document.querySelector(".city");
const erase = document.querySelector(".erase");

let arrayContents = JSON.parse(localStorage.getItem("contents"));
let arrayProduct = JSON.parse(localStorage.getItem("product"));
let zipCode = JSON.parse(localStorage.getItem("zipcode"));

let total = [];
let sum = 0;

if (arrayProduct === null || arrayContents === null) {
    const emptyCard = `
    <div class = "empty-card">
    <div> Section vide, veuillez retouner à la page d'acceuil pour faire vos achats sur ORINOURS !
    </div>
    </div>
    `;
    caseOrder.innerHTML = emptyCard;
} else {
  noOrder.innerHTML = `Votre numéro de commande est : ${arrayContents.orderId}`;

  for (let i = 0; i < arrayContents.products.length; i++) {
    const itemQty = document.createElement("h4");
    itemQty.classList.add("item-qty");
    itemQty.innerHTML = `Article : ${arrayProduct[i].nameArticle}; Couleur : ${
      arrayProduct[i].colorArticle
    }; Quantité : ${
      arrayProduct[i].quantityArticle
    }; prix u. : ${Number.parseFloat(arrayProduct[i].priceUnity).toFixed(2)}€`;

    recapOrder.appendChild(itemQty);
    total.push(arrayProduct[i].priceUnity * arrayProduct[i].quantityArticle);
    sum = total.reduce((a, b) => a + b);
  }

  totalAmount.innerHTML = `Prix total de la transaction : ${Number.parseFloat(
    sum
  ).toFixed(2)}€`;

  firstName.innerHTML = `Prénom : ${arrayContents.contact.firstName}`;
  lastName.innerHTML = `Nom : ${arrayContents.contact.lastName}`;
  email.innerHTML = `Email : ${arrayContents.contact.email}`;
  address.innerHTML = `Adresse : ${arrayContents.contact.address}, ${zipCode.zipcode}`;
  city.innerHTML = `Ville : ${arrayContents.contact.city}`;
}

