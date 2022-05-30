import { apiKey } from "./environment/key.js";
let cont = 0;

const moviesContainer = document.querySelector('.movies-container');

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results;
}

window.onload = async function () {

    const movies = await getPopularMovies();
    movies.forEach
        (movie => {
            cont++;
            renderMovie(movie);

        })
    console.log('contador:  ' + cont);
}

function renderMovie(movie) {

    const { title, poster_path, vote_average, release_date, overview, isFavorite } = movie;

    const year = new Date(release_date).getFullYear();
    const img = `https://image.tmdb.org/t/p/w500${poster_path}`;


    const movieElement = document.createElement('div');
    movieElement.classList.add("movie");
    moviesContainer.appendChild(movieElement);


    /* ------ Img and Title -----*/

    const movieImgAndTitle = document.createElement('div');
    movieImgAndTitle.classList.add("movie__img-and-title");

    const movieImgContainer = document.createElement('div');
    movieImgContainer.classList.add("movie__img-container");
    const movieImg = document.createElement('img');
    movieImg.src = img;
    movieImg.alt = `${title} Poster`;
    movieImgContainer.appendChild(movieImg);

    movieImgAndTitle.appendChild(movieImgContainer);

    const movieTitleContainer = document.createElement('div');
    movieTitleContainer.classList.add("movie__title-container");
    const movieTitle = document.createElement('h3');
    movieTitle.classList.add("movie__title");
    movieTitle.textContent = `${title} (${year})`;
    movieTitleContainer.appendChild(movieTitle);

    const movieActions = document.createElement('div');
    movieActions.classList.add("movie__actions");
    movieTitleContainer.appendChild(movieActions);

    const movieActionsRating = document.createElement('div');
    movieActionsRating.classList.add('movie__actions__rating');
    const movieRatingImg = document.createElement('img');
    movieRatingImg.src = "img/star.svg";
    movieRatingImg.alt = "star";
    const movieRatingText = document.createElement('span');
    movieRatingText.textContent = vote_average;
    movieActionsRating.appendChild(movieRatingImg);
    movieActionsRating.appendChild(movieRatingText);


    const movieActionsFavorite = document.createElement('div');
    movieActionsFavorite.classList.add('movie__actions__favorite');
    const buttonFavorite = document.createElement('a');
    const movieFavoriteImg = document.createElement('img');

    if (isFavorite) {
        movieFavoriteImg.src = "img/isFavorite.svg";
    } else {
        movieFavoriteImg.src = "img/favorite.svg";
    }

    buttonFavorite.appendChild(movieFavoriteImg);

    const movieFavoriteText = document.createElement('span');
    movieFavoriteText.textContent = "Favoritar";
    movieActionsFavorite.appendChild(buttonFavorite);
    movieActionsFavorite.appendChild(movieFavoriteText);

    movieActions.appendChild(movieActionsRating);
    movieActions.appendChild(movieActionsFavorite);


    movieImgAndTitle.appendChild(movieTitleContainer);

    /* -----------*/

    /* ------ Description -----*/

    const movieDescriptionContainer = document.createElement("div");
    movieDescriptionContainer.classList.add("movie__description-container");
    const movieDescription = document.createElement("p");
    movieDescription.classList.add("movie__description");
    movieDescription.textContent = overview;
    movieDescriptionContainer.appendChild(movieDescription);

    movieElement.appendChild(movieImgAndTitle);
    movieElement.appendChild(movieDescriptionContainer);

    /* -----------*/

}


async function getMovieByName(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${title}`;
    const fetchResponse = await fetch(url);
    const { results } = await fetchResponse.json();
    return results;
}


const inputSearch = document.getElementById("txtSearch");

inputSearch.addEventListener("keypress", async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const movies = await getMovieByName(inputSearch.value);
        clearMovies();
        movies.forEach(movie => {
            cont++;
            renderMovie(movie);

        })
        console.log('contador 2:  ' + cont);
    }
});

const buttonSearch = document.getElementById("buttonSearch");

buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const movies = await getMovieByName(inputSearch.value);
    clearMovies();
    movies.forEach(movie => {
        cont++;
        renderMovie(movie);

    })
    console.log('contador 3:  ' + cont);

});

function clearMovies() {
    moviesContainer.innerHTML = ''
}