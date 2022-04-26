const autoCompleteConfig = {
    renderOption(movie) {
        const imgSRC = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
            <img src = "${imgSRC}"/>
            ${movie.Title} (${movie.Year})
        `
    },
    inputValue(movie) {
        return movie.Title;
    },

    async fetchData (movie){
        const baseResponse = await axios.get("http://www.omdbapi.com/", {
            params: {
                apiKey: "a7490284",
                s: `${movie}`
            }
        });

        if (baseResponse.data.Error){
            return []
        }

        return baseResponse.data.Search
    },
}

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelected(movie, "left");
    },
})

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelected(movie, "right");
    },
})

let leftMovie;
let rightMovie;
const onMovieSelected = async (movie, position) => {  
    const movieResponse = await axios.get("http://www.omdbapi.com/", {
        params: {
            apiKey: "a7490284",
            i: movie.imdbID
        }
    });
    if (movieResponse.data.Error){
        return []
    }
    document.querySelector(`#${position}-summary`).innerHTML = movieTemplate(movieResponse.data) 
    if( position === "left"){
        leftMovie = movieResponse.data;
    }
    if (position === "right"){
        rightMovie = movieResponse.data;
    }

    if (leftMovie && rightMovie){
        runComparison(rightMovie, leftMovie);
    }
}

const runComparison = (rightMovie, leftMovie) => {
    console.log(`Starting to compare ${rightMovie.Title} with ${leftMovie.Title}`)

    console.log(rightMovie)
    
    

}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                 <p class="image">
                  <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h3> ${movieDetail.Title} </h3>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>

        <article class="notification is-primary ${movieDetail.Title.replace(/\s/g, '')}-awards">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary ${movieDetail.Title.replace(/\s/g, '')}-box-office">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary ${movieDetail.Title.replace(/\s/g, '')}-metascore">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary ${movieDetail.Title.replace(/\s/g, '')}-imdb-rating">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>        
        <article class="notification is-primary ${movieDetail.Title.replace(/\s/g, '')}-imdb-votes">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    
    `
}