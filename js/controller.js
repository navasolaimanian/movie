
'use strict'

const showPupolarMovie = async function () {
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
            console.log(movie);
            movie = {
                imagePath: "https://image.tmdb.org/t/p/original/" + movie.poster_path,
                title: movie.original_title,
                name: movie.name,
                rate: movie.vote_average,
                genres: movie.genre_ids,
                id: movie.id,
            }
            let stringGenre = [];
            movie.genres.forEach(genre => {
                data2.genres.forEach(g => {
                    if (g.id === genre) {
                        stringGenre.push(g.name);
                    }
                })
            });

            let html = `
            <div class="popular__movie">
                <div class="popular__movie--img" data-id="${movie.id}">
                    <img src="${movie.imagePath}" alt="" >
                </div>
                <div class="popular__movie--info">
                    <div class="popular__movie--title2">${movie.title ? movie.title : movie.name}</div>
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
    showMovie();

};



const showMovie = function () {

    // console.log(document);
    document.querySelectorAll('.popular__movie--img').forEach(movie => {
        movie.addEventListener('click', function () {
            console.log(movie);
            console.log(movie.dataset.id)

            // window.location = 'movie.html';
            // console.log(document);
            //document.querySelector('.right_bar').classList.add('hidden');
            // document.querySelector('.center').classList.add('hidden');
            // document.querySelectorAll('.movie').classList.remove('hidden');
            // renderMovie(movieObject);
            renderMovie(movie.dataset.id);

        })
    })

}
showPupolarMovie();

const renderMovie = async function (id) {
    try {
        // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=77f96ee4c5e35a44150caff137e8d459`);
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=77f96ee4c5e35a44150caff137e8d459&language=en-US`);

        const data = await res.json();
        if (!res.ok) throw new Error(`${data.status_message} (${res.status})`)
        console.log(res);
        console.log(data);
        // let movieID = {
        //     id: data.imdb_id

        // }
        // console.log(movieID);
        // const res2 = await fetch(`https://api.themoviedb.org/3/movie/${movieID.id}?api_key=77f96ee4c5e35a44150caff137e8d459&language=en-US`);
        // const data2 = await res2.json();
        // if (!res2.ok) throw new Error(`${data2.status_message} (${res2.status})`)
        // console.log(res2);
        // console.log(data2);
        let movie = data;
        movie = {
            imagePath: "https://image.tmdb.org/t/p/original/" + movie.poster_path,
            backgroundPath: "https://image.tmdb.org/t/p/original/" + movie.backdrop_path,
            title: movie.original_title,
            rate: movie.vote_average,
            genres: movie.genre_ids,
            id: movie.id,
            overview: movie.overview,
        }
        console.log(movie);
        const url = `http://127.0.0.1:8080/movie/${id}/${movie.title.replace(':', '').replaceAll(' ', "-")}`;
        console.log(url);
        const markup = `
            <div class="movie__info">
                <div class="movie__info--title">${movie.title}</div>
                <div class="movie__info--about">
                    <div class="movie__info--about--imdb">

                        <img src="icon/imdb.png" alt="">
                        <div class="movie__info--about--rate">${movie.rate}</div>
                        <div class="movie__info--about--genre">${movie.genres}</div>
                    </div>
                    <div class="movie__info--overview">${movie.overview}</div>
                    <button class="btn movie__info--watch">Watch Now</button>
                </div>
            </div>
            <div class="movie__poster">
                <img src=${movie.imagePath} alt="">
        </div>
        `
        document.querySelector('.right_bar').classList.add('hidden');
        document.querySelector('.center').classList.add('hidden');
        document.querySelector('.movie').classList.remove('hidden');
        document.querySelector('.movie').style.backgroundImage = `linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(164, 38, 24, 0.7)), url(${movie.backgroundPath})`;
        document.querySelector('.movie').insertAdjacentHTML('afterbegin', markup);

    } catch (err) {
        console.log(err);
    }
}
// renderMovie();