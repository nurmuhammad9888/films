const template = document.querySelector(".template").content;
const elList = document.querySelector(".move-list");
const elSearchTitle =  document.querySelector(".serach-title")
const movieFragmet = document.createDocumentFragment();

// Modal
const elModal = document.querySelector(".modal");
const elModalTitle = elModal.querySelector(".modal-title");
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
const elSelect = document.querySelector(".select-js");
const elSelectOption = document.querySelector(".select-option");

let timeFunc = function(time){
    let hour = Math.floor(time / 60);
    let minut = Math.floor(time % 60)
    return `${hour} hrs ${minut} min`
}

renderMovoi(movies.slice(0, 10))
function renderMovoi(moveie){
    elList.innerHTML = "";
    moveie.forEach((move) => {
        const temClone = template.cloneNode(true);
        temClone.querySelector(".move-img").src = `http://i3.ytimg.com/vi/${move.ytid}/mqdefault.jpg`
        temClone.querySelector(".move-title").textContent = move.Title;
        temClone.querySelector(".move-year").textContent = move.movie_year;
        temClone.querySelector(".move-reating").textContent = move.imdb_rating;
        temClone.querySelector(".move-time").textContent = timeFunc(move.runtime);
        temClone.querySelector(".move-categores").textContent = move.Categories.split("|").join(", ");
        temClone.querySelector(".btn-js").dataset.id = move.imdb_id;
        
        movieFragmet.appendChild(temClone);
    });
    elList.appendChild(movieFragmet)
}

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
    elModalIframe.src = "";
})

// SELECT

let selectArray = [];

movies.forEach((el) => {
    el.Categories.split("|").forEach((ell) =>{
        if(! selectArray.includes(ell)){
            selectArray.push(ell)
        }
    });
})
const fraSelect = document.createDocumentFragment()

selectArray.forEach((element) =>{
    let options = document.createElement("option");
    options.textContent = element;
    options.value = element;
    fraSelect.appendChild(options);
})
elSelect.appendChild(fraSelect)


// SEARCH

elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    let elInputValue = elFormInput.value.trim(); 
    let elSelectValue = elSelect.value
    let optionValue = elSelectOption.value
    
    let regEx = new RegExp(elInputValue, "gi");
    let regExSelect = new RegExp(elSelectValue);
    
    const searchMove = movies.filter(el => String(el.Title).match(regEx) && el.Categories.match(regExSelect) || String(el.Title).match(regEx) && elSelectValue === "all")
    
    // if(elSelectValue === "all"){
    //     renderMovoi(movies.slice(0, 10))
    // }
    // const selectMove = movies.filter(el => String(el.Categories).match(regExSelect))
    
    if(searchMove.length > 0){
        renderMovoi(searchMove)
    }else{
        elList.textContent = "Bunday keno mavjud emas"
    }
    
    // if(selectMove.length > 0){
    //     renderMovoi(selectMove)
    // }
    
})

