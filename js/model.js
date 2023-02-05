import {KEY, API_URL} from './config.js'
export const loadMovie =async function () {
    const res = await fetch(
        `${API_URL}trending/all/day?api_key=${KEY}&page=1`);
    const data = await res.json();
    const res2 = await fetch(
        `${API_URL}genre/movie/list?api_key=${KEY}`);
    const data2 = await res2.json();     
    if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);
    if (!res2.ok) throw new Error(`${data2.status_message} (${res2.status})`);

    // console.log(res2);
    // console.log(data2);
    // console.log(data.results[0]);
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
            // console.log(genre)
        });
   
        // console.log(stringGenre.join(','));
        // console.log(movie);
    }
};