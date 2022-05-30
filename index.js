
const moviesContainer = document.querySelector('.movies-container');

const movies = [
    {
        img: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
        title: 'Batman',
        rating: 9.2,
        year: 2022,
        description: "Descrição do filme…",
        isFavorited: true,
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
        title: 'Avengers',
        rating: 9.2,
        year: 2019,
        description: "Descrição do filme…",
        isFavorited: false
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
        title: 'Doctor Strange',
        rating: 9.2,
        year: 2022,
        description: "Descrição do filme…",
        isFavorited: false
    },
]

window.onload = function () {
    movies.forEach(movie => renderMovie(movie))
}

function renderMovie(movie) {

    const { title, img, rating, year, description, isFavorite } = movie;


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
    movieRatingText.textContent = rating;
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
    movieDescription.textContent = "orem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam excepturi corrupti cupiditate repellendus nulla expedita voluptate est ipsa omnis eum cum, deserunt ut odit dolore exercitationem nesciunt labore.Voluptates";
    movieDescriptionContainer.appendChild(movieDescription);

    movieElement.appendChild(movieImgAndTitle);
    movieElement.appendChild(movieDescriptionContainer);

    /* -----------*/

}

