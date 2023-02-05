
'use strict'

const showMovie = async function () {
    try {
        const res = await fetch(
            'https://api.themoviedb.org/3/trending/all/day?api_key=77f96ee4c5e35a44150caff137e8d459&page=1');
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);

        const res2 = await fetch(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=77f96ee4c5e35a44150caff137e8d459');
        const data2 = await res2.json();     
        if (!res2.ok) throw new Error(`${data2.status_message} (${res2.status})`);

        for (let index = 0; index < 2; index++) {

            const titleNode = document.querySelector('.popular__title');
            let movie = data.results[index];
            movie = {
                imagePath: "https://image.tmdb.org/t/p/original/" + movie.poster_path,
                title: movie.original_title,
                rate: movie.vote_average,
                genres: movie.genre_ids,
            }
            let stringGenre = [];
            movie.genres.forEach(genre => {
                data2.genres.forEach(g => {
                    if(g.id === genre) {
                        stringGenre.push(g.name);
                    }
                })
            });

            let html = `
            <div class="popular__movie">
                <div class="popular__movie--img">
                    <img src="${movie.imagePath}" alt="">
                </div>
                <div class="popular__movie--info">
                    <div class="popular__movie--title2">${movie.title}</div>
                    <div class="popular__movie--genre">${stringGenre.join(', ')}</div>
                    <div class="popular__movie--imdb">
                        <!-- <i class="fa-brands fa-imdb"></i> -->
                        <img src="icon/imdb.png" alt="">
                        <div class="popular__movie--rate">${(movie.rate).toFixed(1)}</div>
                    </div>
                </div>
            </div>`
            const node = document.createRange().createContextualFragment(html)
            titleNode.parentNode.insertBefore(node, titleNode.nextSibling);
        }
    } catch (err) {
        console.log(err);
    }
};

showMovie();