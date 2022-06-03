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
            renderMovie(movie);

        })
}

function renderMovie(movie) {

    const { id, title, poster_path, vote_average, release_date, overview } = movie;

    const year = new Date(release_date).getFullYear();
    const img = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const isFavorited = checkMovieIsFavorited(id);


    const movieElement = document.createElement('div');
    movieElement.classList.add("movie");
    moviesContainer.appendChild(movieElement);


    /* ------ Img and Title -----*/

    const movieImgAndTitle = document.createElement('div');
    movieImgAndTitle.classList.add("movie__img-and-title");

    const movieImgContainer = document.createElement('div');
    movieImgContainer.classList.add("movie__img");
    const movieImg = document.createElement('img');
    movieImg.src = img;
    movieImg.alt = `${title} Poster`;
    movieImgContainer.appendChild(movieImg);

    movieImgAndTitle.appendChild(movieImgContainer);

    const movieTitleContainer = document.createElement('div');
    movieTitleContainer.classList.add("movie__title-and-actions");
    const movieTitle = document.createElement('h3');
    movieTitle.classList.add("movie__title");
    movieTitle.textContent = `${title} (${year})`;
    movieTitleContainer.appendChild(movieTitle);

    const movieActions = document.createElement('div');
    movieActions.classList.add("movie__actions");
    movieTitleContainer.appendChild(movieActions);

    const movieActionsRating = document.createElement('div');
    movieActionsRating.classList.add('movie__rating');
    const movieRatingImg = document.createElement('img');
    movieRatingImg.src = "img/star.svg";
    movieRatingImg.alt = "star";
    const movieRatingText = document.createElement('span');
    movieRatingText.textContent = vote_average;
    movieActionsRating.appendChild(movieRatingImg);
    movieActionsRating.appendChild(movieRatingText);


    const movieActionsFavorite = document.createElement('div');
    movieActionsFavorite.classList.add('movie__favorite');
    const buttonFavorite = document.createElement('button');
    buttonFavorite.classList.add('movie__buttonFavorite');
    buttonFavorite.addEventListener('click', (event) => favoriteButtonPressed(event, movie));
    const favoriteImg = document.createElement('img');
    // movieFavoriteImg.id = "movie__imgFavorite";
    favoriteImg.src = isFavorited ? 'img/isFavorite.svg' : 'img/notFavorite.svg';
    buttonFavorite.appendChild(favoriteImg);
    const favoriteText = document.createElement('span');
    favoriteText.textContent = "Favoritar";
    movieActionsFavorite.appendChild(buttonFavorite);
    movieActionsFavorite.appendChild(favoriteText);

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
            renderMovie(movie);

        })
    }
});

const buttonSearch = document.getElementById("buttonSearch");

buttonSearch.addEventListener("click", async (event) => {
    event.preventDefault();
    const movies = await getMovieByName(inputSearch.value);
    clearMovies();
    movies.forEach(movie => {
        renderMovie(movie);

    })
});

function clearMovies() {
    moviesContainer.innerHTML = ''
}


function favoriteButtonPressed(event, movie) {
    const favoriteState = {
        favorited: 'img/isFavorite.svg',
        notFavorited: 'img/notFavorite.svg'
    }

    if (event.target.src.includes(favoriteState.notFavorited)) {
        // aqui ele será favoritado
        event.target.src = favoriteState.favorited;
        saveToLocalStorage(movie);
    } else {
        // aqui ele será desfavoritado
        event.target.src = favoriteState.notFavorited
        removeFromLocalStorage(movie.id)
    }
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'));
}

function saveToLocalStorage(movie) {
    const movies = getFavoriteMovies() || [];
    movies.push(movie);

    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem('favoriteMovies', moviesJSON);
}

function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies() || [];
    return movies.find(movie => movie.id == id);
}

function removeFromLocalStorage(id) {
    const movies = getFavoriteMovies() || [];
    const findMovie = movies.find(movie => movie.id == id);
    const newMovies = movies.filter(movie => movie.id != findMovie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies));
}