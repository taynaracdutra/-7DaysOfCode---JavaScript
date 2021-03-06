import { API } from "./services/api.js";
import { LocalStorage } from "./services/localStorage.js"



const moviesContainer = document.querySelector('.movies-container');

async function loadAllPopularMovies() {
    const movies = await API.getPopularMovies();
    movies.forEach
        (movie => {
            renderMovie(movie);

        });
}

window.onload = function () {
    loadAllPopularMovies();

}

function renderMovie(movie) {

    const { id, title, poster_path, vote_average, release_date, overview } = movie;

    const year = new Date(release_date).getFullYear();
    const img = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const isFavorited = LocalStorage.checkMovieIsFavorited(id);


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


const inputSearch = document.getElementById("txtSearch");

inputSearch.addEventListener("keypress", async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const movies = await API.getMovieByName(inputSearch.value);
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
        // aqui ele ser?? favoritado
        event.target.src = favoriteState.favorited;
        LocalStorage.saveToLocalStorage(movie);
    } else {
        // aqui ele ser?? desfavoritado
        event.target.src = favoriteState.notFavorited
        LocalStorage.removeFromLocalStorage(movie.id)
    }
}

const checkFavoritedMovies = document.getElementById("check-favoritedMovies");

checkFavoritedMovies.addEventListener("change", (event) => {
    event.preventDefault();

    if (event.target.checked) {
        const movies = LocalStorage.getFavoriteMovies() || [];
        clearMovies();

        movies.forEach(movie => { renderMovie(movie) });
    } else {
        clearMovies();
        loadAllPopularMovies();
    }
})