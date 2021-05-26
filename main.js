const cssPromises = {};


// загрузка ресурсов с API
function loadResourse(src) {
    if (src.endsWith('.js')) {
        return import(src)
    }
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.crossorigin = "anonymous";
            link.integrity = '"sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssPromises[src];

    }

    return fetch(src).then(res => res.json());

}

getGeneralPage()

// запросы для списка фильмов
function getGeneralPage() {
    Promise.all([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css',
            './filmsList.js',
            "https://swapi.dev/api/films/",

        ].map(src => loadResourse(src)))
        .then(([css, pageModule, data]) => {
            const app = document.getElementById('root');
            app.innerHTML = '';
            app.append(pageModule.render(data))
        })
}
//  запросы для детальной информации о фильме 
export function getFilmDetails(id) {
    Promise.all(['https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css', './filmDesc.js', `https://swapi.dev/api/films/${id}/`]
            .map(src => loadResourse(src)))
        .then(([css, pageModule, data]) => {

            Promise.all([
                    Promise.all(data.planets.map(src => loadResourse(src))),
                    Promise.all(data.species.map(src => loadResourse(src)))
                ])
                .then((result) => {
                    const app = document.getElementById('root');
                    app.innerHTML = '';
                    app.append(pageModule.renderFilmCard(data, result))

                })
        })
};

window.onpopstate = function(event) {
    getGeneralPage()
}
