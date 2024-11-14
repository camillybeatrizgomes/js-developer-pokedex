const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 10;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}" id="itemClicavel">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            <!-- Modal -->
            <div id="modal" class="modal">
            <div class="modal-container">
            <!-- Parte superior com fundo colorido baseado no tipo do Pokémon -->
            <div class="modal-header ${pokemon.type}">
                <span id="fecharModal" class="fechar">&times;</span>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <!-- Parte inferior com fundo branco -->
            <div class="modal-content">
                <h2>${pokemon.name}</h2>
                <p><ol class="types types-modal">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}</ol>
                </p>
            </div>
        </div>
    </div> 
`;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join("")
        pokemonList.innerHTML += newHtml

            document.querySelectorAll('#itemClicavel').forEach((item) => {
            const modal = item.nextElementSibling; 
            const fecharModal = modal.querySelector('.fechar');

            // Abrir o modal ao clicar no item
            item.onclick = function () {
                modal.style.display = 'block';
            }

            // Fechar o modal ao clicar no botão de fechar
            fecharModal.onclick = function () {
                modal.style.display = 'none';
            }

            // Fechar o modal ao clicar fora dele
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            }
        });
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit
    const qtdRecordNexPage = offset + limit;
    if (qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit)
    }
})
