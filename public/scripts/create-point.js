function populateUFs() {

//  !Criando a variável que vai receber
//  todos os estados da API na caixa select

    const ufSelect = document.querySelector('select[name=uf]');
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then(resp => resp.json())
    .then(states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then(resp => resp.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }
            citySelect.disabled = false;
    })

}


document
    .querySelector('select[name=uf]')
    .addEventListener("change", getCities);


    // !Itens de coleta

const itensToColect = document.querySelectorAll('.itens-grid li')
for (const item of itensToColect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector('input[name=itens]')

let selectedItens = [];

function handleSelectedItem(event) {

    const itemLi = event.target;

    // *Adicionar ou remover uma classe com Javascript

    //*Adiconando ou removendo o selecionador (mudança na cor)
    //*a uma lista de classes ao elemento li

    itemLi.classList.toggle("selected")  
    const itemId = itemLi.dataset.id    //*Pegando apenas o valor do id

    // ?Verificar se existem itens selecionados.
    // ?Se sim, pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId;  //*Isso será true ou false
        return itemFound                   //*Aqui há um retorno do index no qual está localizado o elemento no array
    })
    
    // ?Se item já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        //!removendo 
        const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItens = filteredItens
    } else {                        // ?Se não estiver selecionado, adicionar a selecao ao array
        selectedItens.push(itemId)
    }
    
    // ?Atualizar o campo escondido com os itens selecionados
        collectedItens.value = selectedItens
}

