const template = document.querySelector(".template").content;
const elList = document.querySelector(".move-list");
const movieFragmet = document.createDocumentFragment();

// Modal
const elModal = document.querySelector(".modal");
const elModalTitle = elModal.querySelector(".nodal-title");
const elModalIframe = elModal.querySelector(".modal-iframe");
const elModalRetang = elModal.querySelector(".modal-reating");
const elModalYear = elModal.querySelector(".modal-year");
const elModalTime = elModal.querySelector(".modal-time");
const elModalCategores = elModal.querySelector(".move-categores");
const elModalText = elModal.querySelector(".modal-text");
const elModalLink = elModal.querySelector(".modal-link");

// Form
const elForm = document.querySelector(".js-form");
const elFormInput = document.querySelector(".search-input");

let timeFunc = function(time){
    let hour = Math.floor(time / 60);
    let minut = Math.floor(time % 60)
    return `${hour} hrs ${minut} min`
}

for (const move of movies.slice(0, 10)) {
    const temClone = template.cloneNode(true);
    temClone.querySelector(".move-img").src = `http://i3.ytimg.com/vi/${move.ytid}/mqdefault.jpg`
    temClone.querySelector(".move-title").textContent = move.Title;
    temClone.querySelector(".move-year").textContent = move.movie_year;
    temClone.querySelector(".move-reating").textContent = move.imdb_rating;
    temClone.querySelector(".move-time").textContent = timeFunc(move.runtime);
    temClone.querySelector(".move-categores").textContent = move.Categories.split("|").join(", ");
    temClone.querySelector(".btn-js").dataset.id = move.imdb_id;
    
    movieFragmet.appendChild(temClone);
}
elList.appendChild(movieFragmet)

function modalFunc(mov){
    elModalTitle.textContent = mov.Title;
    elModalIframe.src = `https://www.youtube-nocookie.com/embed/${mov.ytid}`;
    elModalRetang.textContent = mov.imdb_rating;
    elModalYear.textContent = mov.movie_year;
    elModalTime.textContent = timeFunc(mov.runtime);
    elModalCategores.textContent = mov.Categories.split("|").join(", ")
    elModalText.textContent = mov.summary
    elModalLink.href = `https://www.imdb.com/title/${mov.imdb_id}`
} 

elList.addEventListener("click",(evt) =>{
    if(evt.target.matches(".btn-js")){
        let moveId = evt.target.dataset.id;
        let moveFind = movies.find((movv) => movv.imdb_id === moveId);
        modalFunc(moveFind)
    }
})
elModal.addEventListener("hide.bs.modal", () =>{
    elModalIframe.src = ""
})

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    let elInputValue = elFormInput.value.trim().toUpperCase(); 
    
    if(elInputValue != ""){
        elList.innerHTML = null
        
        for (const kino of movies) {
            const search = ""+kino.Title;
            if(search.toUpperCase().indexOf(elInputValue) > -1){
                const temClone = template.cloneNode(true);
                temClone.querySelector(".move-img").src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`;
                temClone.querySelector(".move-title").textContent = kino.Title;
                temClone.querySelector(".move-year").textContent = kino.movie_year;
                temClone.querySelector(".move-reating").textContent = kino.imdb_rating;
                temClone.querySelector(".move-time").textContent = timeFunc(kino.runtime);
                temClone.querySelector(".move-categores").textContent = kino.Categories.split("|").join(", ");
                temClone.querySelector(".btn-js").dataset.id = kino.imdb_id;
                
                movieFragmet.appendChild(temClone)
            }
            elList.appendChild(movieFragmet)
        }
    }
    
})