const API_KEY = "b58a3bd8";

/* SECTION SWITCH */
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

/* SEARCH MOVIE */
async function searchMovie() {
    const query = document.getElementById("searchInput").value;
    fetchMovies(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
}

/* LOAD CATEGORY */
async function loadCategory(genre) {
    fetchMovies(`https://www.omdbapi.com/?s=${genre}&apikey=${API_KEY}`);
}

/* FETCH MOVIES */
async function fetchMovies(url) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "Loading...";

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
        moviesContainer.innerHTML = "No movies found.";
        return;
    }

    moviesContainer.innerHTML = "";

    data.Search.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

/* LOAD FEATURED MOVIE */
async function loadFeatured() {
    const response = await fetch(`https://www.omdbapi.com/?t=Inception&apikey=${API_KEY}`);
    const movie = await response.json();

    const featuredDiv = document.getElementById("featuredMovie");

    featuredDiv.innerHTML = `
        <img src="${movie.Poster}" />
        <div class="featured-info">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}</p>
        </div>
    `;
}

loadFeatured();
