// API Key: a7490284

const fetchData = async (movie) => {
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
    
    // const movieId = baseResponse.data.Search[0]["imdbID"]
    // const idResponse = await axios.get("http://www.omdbapi.com/", {
    //     params: {
    //         apiKey: "a7490284",
    //         i: `${movieId}`
    //     }
    // }); 
    // return (idResponse.data)
}

const fetchMovie = async (movie) => {
    const movieResponse = await axios.get("http://www.omdbapi.com/", {
        params: {
            apiKey: "a7490284",
            i: `${movie["imdbID"]}`
        }
    });
    if (movieResponse.data.Error){
        return []
    }
    return movieResponse.data
}

const root = document.querySelector(".autocomplete");

root.innerHTML = `
    <label> <b> Search For a Movie! </b> </label>
    <input class="input" />
    <div class="dropdown"> 
        <div class="dropdown-menu"> 
            <div class="dropdown-content results"> </div>
        </div>
    </div>
`;

const input = document.querySelector(".input");
const dropwdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

let movieData;
const onInput = async event => {
    
    const movies = await fetchData(event.target.value);
    
    if(!movies.length){
        dropwdown.classList.remove("is-active");
    };
    
    resultsWrapper.innerHTML = ``
    dropwdown.classList.add("is-active")
    for (let movie of movies){
        const option = document.createElement("a");

        const imgSRC = movie.Poster === "N/A" ? "" : movie.Poster;

        option.classList.add("dropdown-item");
        option.innerHTML = `
            <img src = "${imgSRC}"/>
            ${movie.Title}
        `;

        onMovieSelected(option, movie);
        resultsWrapper.appendChild(option);
    }

    
};

input.addEventListener("input", debounce(onInput, 500));


document.addEventListener("click", event => {
    if(!root.contains(event.target)){
        dropwdown.classList.remove("is-active");
    }
});

const onMovieSelected = async (element, movie) => {  
    element.addEventListener("click", async () => { 
        dropwdown.classList.remove("is-active");
        input.value = movie.Title;
        movieData = await fetchMovie(movie);
        console.log(movieData)
    });
}
