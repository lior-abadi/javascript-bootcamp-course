const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
    root.innerHTML = `
        <label> <b> Search </b> </label>
        <input class="input" />
        <div class="dropdown"> 
            <div class="dropdown-menu id="dropdown-menu" role="menu""> 
                <div class="dropdown-content results"> </div>
            </div>
        </div>
    `;
    
    const input = root.querySelector("input");
    const dropwdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".results");
    
    const onInput = async event => {  
        const items = await fetchData(event.target.value);
        dropwdown.classList.remove("is-hidden");

        if(!items.length){
            dropwdown.classList.remove("is-active");
            dropwdown.classList.add("is-hidden");
        };
        
        resultsWrapper.innerHTML = ``
        dropwdown.classList.add("is-active")
        for (let item of items){
            const option = document.createElement("a");
            
            option.classList.add("dropdown-item");
            option.innerHTML = renderOption(item);
    
            option.addEventListener("click", async () => { 
                dropwdown.classList.remove("is-active");
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);
        }
    };
    
    input.addEventListener("input", debounce(onInput, 500));
    
    document.addEventListener("click", event => {
        if(!root.contains(event.target)){
            dropwdown.classList.remove("is-active");
        }
    });    
    
};