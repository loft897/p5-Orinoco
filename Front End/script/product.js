let main = document.querySelector(".article");
let img = document.querySelector(".case-img > img");
let nameP = document.querySelector(".name > h3");
let description = document.querySelector(".description > h4");
let priceP = document.querySelector(".price > h4");
// let quantity = document.querySelector(".valueQ");
let color = document.querySelector(".color > select");
let addCart = document.querySelector(".add-cart");
let infoCart = document.querySelector(".info-cart");
let infoCartP = document.querySelector(".info-cart > p");

// Recuperation de l'ID

const requestUrl = window.location.search;
const idProduct = requestUrl.slice(4);

// Appel API et affichage produit

fetch(`http://localhost:3000/api/teddies/${idProduct}`)
  .then((answer) => answer.json())
  .catch((error) => {
    info.innerHTML = `  Nous n'avons pas réussi à afficher ce produit. Merci de lancer le
      serveur via le port 3000! <br />Si le problème persite, prendre
      contact avec le support.`;
  })

  // Affichage article
  .then((data) => {
    //   console.log(data);
    img.src = data.imageUrl;

    nameP.innerHTML = data.name;

    description.innerText = data.description;
    priceP.innerText = ` ${Number.parseFloat(data.price / 100).toFixed(2)} €`;

    for (let i = 0; i < data.colors.length; i++) {
      col = data.colors[i];
      let option = document.createElement("option");
      option.appendChild(document.createTextNode(`${col}`));
      option.value = `${col}`;
      color.appendChild(option);
    }

    // Ajout article au panier
    let arrayProducts = JSON.parse(localStorage.getItem("products"));

    addCart.addEventListener("click", (e) => {
      e.preventDefault();
      optionArticle = {
        nameArticle: data.name,
        imgArticle: data.imageUrl,
        idArticle: data._id,
        colorArticle: color.value,
        quantityArticle: 1,
        priceUnity: data.price / 100,
        // priceTU: (data.price/100) * quantityArticle
      };
      console.log(optionArticle.quantityArticle);
      //console.log(optionArticle);

      // fin de l'ecoute

      //   let optionArticleJson = JSON.stringify(optionArticle);
      //     localStorage.setItem(`product`, optionArticleJson);

      if (arrayProducts == null) {
        arrayProducts = [];
        arrayProducts.push(optionArticle);
        localStorage.setItem("products", JSON.stringify(arrayProducts));
      } else if (arrayProducts != null) {
        for (let i = 0; i < arrayProducts.length; i++) {
          if (
            arrayProducts[i].idArticle == data._id &&
            arrayProducts[i].colorArticle == color.value
          ) {
            return (
              arrayProducts[i].quantityArticle++,
              localStorage.setItem("products", JSON.stringify(arrayProducts)),
              (arrayProducts = JSON.parse(localStorage.getItem("products"))),
              setTimeout(() => {
                infoCartP.innerHTML = `Merci, ${data.name} a été ajouté au panier ! `;
                infoCart.style.display = "flex";
              }, 0),
              setTimeout(() => {
                infoCart.style.display = "none";
              }, 2500)
            );
          }
        }
        for (let i = 0; i < arrayProducts.length; i++) {
          if (
            (arrayProducts[i].idArticle == data._id &&
              arrayProducts[i].colorArticle != color.value) ||
            arrayProducts[i].idArticle != data._id
          ) {
            return (
              arrayProducts.push(optionArticle),
              localStorage.setItem("products", JSON.stringify(arrayProducts)),
              setTimeout(() => {
                infoCartP.innerHTML = `Merci, ${data.name} a été ajouté au panier ! `;
                infoCart.style.display = "flex";
              }, 0),
              setTimeout(() => {
                infoCart.style.display = "none";
              }, 2500)
            );
            //   } else  {
            //     return (
            //       arrayProducts.push(optionArticle),
            //       localStorage.setItem("products", JSON.stringify(arrayProducts))
            //     );
          }
        }
      }

      //   if(localStorage.getItem("products") !== null){
      //       arrayProducts = JSON.parse(localStorage.getItem("products"));
      //   }

      //   arrayProducts.push(optionArticle);
      //   localStorage.setItem("products", JSON.stringify(arrayProducts));

      //   function displayAlert() {
      //     if (optionArticle.quantityArticle < 1) {
      //       setTimeout(() => {
      //         infoCartP.innerHTML = ` Augmentez la quantité de l'article svp !`;
      //         infoCart.style.display = "flex";
      //       }, 0);

      //       setTimeout(() => {
      //         infoCart.style.display = "none";
      //       }, 2500);
      //     } else {
      //       setTimeout(() => {
      //         infoCartP.innerHTML = `Merci, ${data.name} a été ajouté au panier ! `;
      //         infoCart.style.display = "flex";
      //       }, 0);

      //       setTimeout(() => {
      //         infoCart.style.display = "none";
      //       }, 2500);

      //       // gestion local storage
      //     }
      //   }

      //   displayAlert();
    });
  });

console.log(localStorage.length);
