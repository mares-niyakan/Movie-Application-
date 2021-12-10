const MOVIE_URL = 'https://lively-flash-tumble.glitch.me/movies';

//get request

let getAllMovies = () => {
    return fetch(MOVIE_URL).then(resp.json()).catch(err => console.error(err));
}
getAllMovies().then(data => console.log(data));