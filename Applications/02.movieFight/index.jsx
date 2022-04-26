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
    const leftSideStats     = document.querySelectorAll("#left-summary .notification");
    const rightSideStats    = document.querySelectorAll("#right-summary .notification");
    
    console.log(leftSideStats);
    console.log(rightSideStats);

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);
        
        if (rightSideValue > leftSideValue){
            leftStat.classList.remove("is-primary")
            leftStat.classList.add("is-warning");
        } else {
            rightStat.classList.remove("is-primary")
            rightStat.classList.add("is-warning");
        }   
    });

}

const movieTemplate = (movieDetail) => {

    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, ""))
    const metascore = parseInt(movieDetail.Metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""))
    
    const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
        const value = parseInt(word);
        if(isNaN(value)) {
            return prev;
        } else{
            return prev + value;
        }
    }, 0);

    console.log(awards);


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

        <article data-value=${awards} class="notification is-primary ">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars}  class="notification is-primary ">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary ">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary ">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>        
        <article data-value=${imdbVotes} class="notification is-primary ">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    
    `
}