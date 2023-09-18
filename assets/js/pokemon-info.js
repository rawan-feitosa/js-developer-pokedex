const bodyRemoveAll = () => {
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
}

function backgroundButtonReloadPage(){
    location.reload()
}

function convertPokemonToHTML(pokemon,number,speciespokemon) {
    let poketypeli = "", pokeabilityli = "", poketype_background_color = pokemon.types[0].type.name, pokemonegggroup = {};

    for (let i = 0; i < pokemon.abilities.length; i++) {
        pokeabilityli += `<p>${pokemon.abilities[i].ability.name}</p>`
    }
    for (let i = 0; i < pokemon.types.length; i++) {
        poketypeli += `<li class="background-type ${poketype_background_color}"><p>${pokemon.types[i].type.name}</p></li>`
    }

    if(speciespokemon.egg_groups[0]) {
        pokemonegggroup.egggroup0 = speciespokemon.egg_groups[0].name;
    } else {
        pokemonegggroup.egggroup0 = "None";
    }
    if(speciespokemon.egg_groups[1]){
        pokemonegggroup.egggroup1 = speciespokemon.egg_groups[1].name;
    } else {
        pokemonegggroup.egggroup1 = "None";
    }

    let htmlbody = `
    <body>
    <section class="background-section ${poketype_background_color}">
        <div class="background-content">
        <div class="background-buttons">
            <button class="background-button" type="button" onclick="backgroundButtonReloadPage()">&#8592</button>
        </div>

        <div class="background-name">
            <span class="background-pokemon-name">${pokemon.name}</span>
        </div>
        
        <div class="background-info">
        <ul class="background-ul-type">
        ${poketypeli}
        </ul>
        <span class="background-pokemon-number">#${number}</span>
        </div>
    </div>
    </section>

    <section class="content-section">
        <div class="section-header">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg" alt="">
        </div>

        <div class="nav-links">
                <a href="#soon">Base Stats</a>
                <a href="https://pokeapi.co/">Api</a>
        </div>

        <article class="pokeInfoArticle">
            <div class="article-species">
                <h1>Species</h1>
                <p>${speciespokemon.genera[7].genus}</p>
            </div>
            <div class="article-height">
                <h1>Height</h1>
                <p>${pokemon.height}0cm (${parseInt(Number(pokemon.height+"0") / 30.48)}ft)</p>
            </div>
            <div class="article-weight">
                <h1>Weight</h1>
                <p>${pokemon.weight}lb (${parseInt(pokemon.weight / 2.205)+"kg"})</p>
            </div>
            <div class="article-abilities">
                <h1>Abilities</h1>
                <span class="content-span">${pokeabilityli}</span>
            </div>
            <div class="article-breeding">
            <h1>Breeding</h1>
            </div>
            <div class="article-abilities">
            <h1>Egg Groups</h1>
            <p>${pokemonegggroup.egggroup0}</p>
            </div>
            <div class="article-abilities">
            <h1>Egg Cycle</h1>
            <p>${pokemonegggroup.egggroup1}</p>
            </div>
        </article>
    </section>
     </body>
    `

    document.body.innerHTML += htmlbody;
    document.body.style = "background-color: white;"

}


async function pokeApiInfoRequest(number) {
        const speciesurl = `https://pokeapi.co/api/v2/pokemon-species/${number}`
    
        return fetch(speciesurl)
            .then((speciesresponse) => speciesresponse.json())
            .then((speciesjsonBody) => speciesjsonBody)
            .then((speciespokemon) => {
                const url = `https://pokeapi.co/api/v2/pokemon/${number}`

                return fetch(url)
                .then((response) => response.json())
                .then((jsonBody) => jsonBody)
                .then((pokemon) => {
                    convertPokemonToHTML(pokemon,number,speciespokemon)
                })
            })
    }

function pokemonInfo(number){
    pokeApiInfoRequest(number)
    bodyRemoveAll()
}