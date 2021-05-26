import {
    getFilmDetails
} from './main.js';

export function render(data) {
    const container = document.createElement('div')
    container.classList.add('container', 'd-flex', 'justify-content-between', 'flex-wrap', 'py-4');
    const img = ['https://s1.1zoom.ru/big0/958/Clone_trooper_Star_Wars_Movies_Helmet_518354_1280x720.jpg',"https://cs10.pikabu.ru/post_img/big/2019/06/22/11/156122953712030858.jpg",
    'http://artelectronics.ru/uploads/storages/post/872/base/star-wars-battlefront.jpg',
    'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2019%2F05%2Fstar_wars-_the_phantom_menace-photofest_still-h_2019.jpg',
    'https://static.dw.com/image/17607024_303.jpg','https://www.denofgeek.com/wp-content/uploads/2019/11/star-wars-revenge-sith-hero_0.jpg?fit=1200%2C675'];

    data.results.forEach((film, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'my-2')
        card.style.width = '30%';
        card.id = index + 1;
        card.style.position = 'relative';
        card.innerHTML = `
       <h4 class="card-header"> ${film.episode_id} ${film.title}</h4>
       <img class="card-img-top" src=${img[index]} alt="Card image cap" style="height:200px;object-fit:cover;">
        <div class="card-body">
         <p class="card-text">${film.opening_crawl}</p>
         <a href="?episode=${card.id}" data-id='${card.id}' class='btn btn-primary'>More information</a>
        </div>`
        container.append(card)
    })
    container.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.tagName === 'A') {
            const id = e.target.dataset.id
            history.pushState(null, '', `?episode=${id}`)
            container.innerHTML = '';
            getFilmDetails(id)


        }
    })
    return container
}





