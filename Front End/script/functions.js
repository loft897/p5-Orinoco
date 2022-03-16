// Appel API

function fecthTeddies(){
    fetch("http://localhost:3000/api/teddies")
        .then(answer => answer.json())
        .then((allTeddies) => {
            console.log(allTeddies);
            // allTeddies.results.forEach((teddie) => {
            //     fetchPokemonComplete(pokemon);
            // });
        })
}