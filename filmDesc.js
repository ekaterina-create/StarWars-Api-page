const createTextBlock = (arr, title) => {
    const textBlock = document.createElement('p');
    const items = arr.map(a => '<a class="list-group-item">' + a.name + '</a>').join('');
    textBlock.innerHTML = items;
    textBlock.insertAdjacentHTML("afterbegin", `<h2>${title}</h2>`);

    return textBlock
}



export function renderFilmCard(data, result) {

    const container = document.createElement('div');
    const btn = document.createElement('button');
    btn.style.marginTop = '20px'
    const card = document.createElement('div');
    const cardBody = document.createElement('div');

    btn.classList.add('btn', 'btn-primary', 'ml-1');
    btn.textContent = 'Back to episodes';
    container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4');
    card.classList.add('card', 'mb-2', 'py-4');
    cardBody.classList.add('card-body')

    cardBody.innerHTML = `
           <h1 class="card-title">Film: ${data.title}, episode: ${data.episode_id}</h1>
           <p class="card-text">${data.opening_crawl}</p>`

    const planetsBlock = createTextBlock(result[0], 'Planets')
    cardBody.append(planetsBlock)

    const speciesBlock = createTextBlock(result[1], 'Races')
    cardBody.append(speciesBlock)

    cardBody.append(btn)
    card.append(cardBody)
    container.append(card)

    btn.addEventListener('click', e => {
        e.preventDefault()
        window.history.back();
    })

    return container

}
