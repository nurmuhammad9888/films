const template = document.querySelector(".template").content;
const elList = document.querySelector(".move-list");
const elSearchTitle =  document.querySelector(".serach-title");
const elSaveList = document.querySelector(".save-list");
const elSaveTemplate = document.querySelector(".template-save").content;
const elSaveListBtn = document.querySelector(".btn-modal-save");
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
const elSearchStart = document.querySelector(".input-start-year");
const elSearchEnd = document.querySelector(".input-end-year");
const elSortSelect = document.querySelector(".select-sort-js");

// TIME
let timeFunc = function(time){
    let hour = Math.floor(time / 60);
    let minut = Math.floor(time % 60)
    return `${hour} hrs ${minut} min`
}
const localSave = JSON.parse(localStorage.getItem("bookmark"))
const saveArray = localSave || [];

function renderMovoi(moveie, regex = ""){
    elList.innerHTML = "";

    moveie.forEach((move) => {
        const temClone = template.cloneNode(true);
        temClone.querySelector(".move-img").src = move.poster_md;
        
        if(regex.source != "(?:)" && regex){
        temClone.querySelector(".move-title").innerHTML = move.title.replace(regex,
            `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`);
        }else{
            temClone.querySelector(".move-title").textContent = move.title;
        }
        temClone.querySelector(".move-year").textContent = move.movie_year;
        temClone.querySelector(".move-reating").textContent = move.imdb_rating;
        temClone.querySelector(".move-time").textContent = timeFunc(move.runtime);
        temClone.querySelector(".move-categores").textContent = move.categories.join(", ");
        temClone.querySelector(".btn-js").dataset.id = move.imdb_id;
        temClone.querySelector(".btn-save").dataset.id = move.imdb_id;
        
        movieFragmet.appendChild(temClone);
    });
    elList.appendChild(movieFragmet)
}

// Bokmmark 
function saveMove(moveie){
    elSaveList.innerHTML = "";
    moveie.forEach((move) => {
        const temClone = elSaveTemplate.cloneNode(true);
        temClone.querySelector(".move-img").src = move.poster_md;
        temClone.querySelector(".move-title").textContent = move.title;
        temClone.querySelector(".move-year").textContent = move.movie_year;
        temClone.querySelector(".move-reating").textContent = move.imdb_rating;
        temClone.querySelector(".move-time").textContent = timeFunc(move.runtime);
        temClone.querySelector(".btn-del").dataset.id = move.imdb_id;
        
        movieFragmet.appendChild(temClone);
    });
    elSaveList.appendChild(movieFragmet)
    localStorage.setItem("bookmark", JSON.stringify(saveArray))
}
saveMove(saveArray)

function modalFunc(mov){
    elModalTitle.textContent = mov.title;
    elModalIframe.src = mov.yt_iframe;
    elModalRetang.textContent = mov.imdb_rating;
    elModalYear.textContent = mov.movie_year;
    elModalTime.textContent = timeFunc(mov.runtime);
    elModalCategores.textContent = mov.categories.join(", ")
    elModalText.textContent = mov.summary
    elModalLink.href = mov.imdb_id_link;
} 
elList.addEventListener("click",(evt) =>{
    if(evt.target.matches(".btn-js")){
        let moveId = evt.target.dataset.id;
        let moveFind = movies.find((movv) => movv.imdb_id === moveId);
        modalFunc(moveFind)
    }
    if(evt.target.matches(".btn-save")){
        let saveId = evt.target.dataset.id;
        let saveFind = movies.find((item) => item.imdb_id === saveId);
        if(!saveArray.includes(saveFind)){
            saveArray.push(saveFind);
            saveMove(saveArray)
        }
        localStorage.setItem("bookmark", JSON.stringify(saveArray))
    }
})

elSaveList.addEventListener("click",(evt) =>{
    if(evt.target.matches(".btn-del")){
        let saveId = evt.target.dataset.id;
        let saveFind = saveArray.findIndex((elem) => elem.imdb_id === saveId);
        saveArray.splice(saveFind, 1);
        saveMove(saveArray)
        localStorage.setItem("bookmark", JSON.stringify(saveArray))
    }
})
elSaveListBtn.addEventListener("click" , () =>{
    elSaveList.classList.toggle("save-list-show")
})

elModal.addEventListener("hide.bs.modal", () =>{
    elModalIframe.src = "";
})

// SELECT
let selectArray = [];

movies.forEach((el) => {
    el.categories.forEach((ell) =>{
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

// SORT
function sortFunc(arrays,value){
    
    if(value == "a-z"){
        arrays.sort((a, b) =>{
            if(a.title > b.title){
                return 1
            }else if(a.title < b.title){
                return -1
            }
            return 0
        })
    }
    
    if(value == "z-a"){
        arrays.sort((a, b) =>{
            if(a.title > b.title){
                return -1
            }else if(a.title < b.title){
                return 1
            }
            return 0
        })
    }
    
    if(value == "2000-2018"){
        arrays.sort((a, b) => a.movie_year - b.movie_year)
    }
    if(value == "2018-2000"){
        arrays.sort((a, b) => b.movie_year - a.movie_year)
    }
    
    if(value == "1-10"){
        arrays.sort((a, b) => a.imdb_rating - b.imdb_rating)
    }
    if(value == "10-1"){
        arrays.sort((a, b) => b.imdb_rating - a.imdb_rating)
    }
}

// SEARCH
elForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    let elInputValue = elFormInput.value.trim(); 
    let elSelectValue = elSelect.value;
    
    let sortSElectValue = elSortSelect.value;
    
    let mov = movies.slice(0, 500)
    
    sortFunc(mov, sortSElectValue);
    
    let elSearchStartvalue = elSearchStart.value.trim()
    let elSearchEndvalue = elSearchEnd.value.trim()
    
    let regEx = new RegExp(elInputValue, "gi");
    // let regExSelect = new RegExp(elSelectValue);
    
    const searchMove = mov.filter(el => {
        // const inputFilter = (String(el.title).match(regEx) && el.categories.match(regExSelect) || elSelectValue === "all") && ((elSearchStartvalue <= el.movie_year && elSearchEndvalue >= el.movie_year) || (elSearchStartvalue == "" && elSearchEndvalue >= el.movie_year) || (elSearchStartvalue <= el.movie_year && elSearchEndvalue == "") || (elSearchStartvalue == "" && elSearchEndvalue == ""));
        
        const inputFilter = (String(el.title).match(regEx) && elSelectValue === "all" || String(el.title).match(regEx) && el.categories.includes(elSelectValue)) && ((elSearchStartvalue <= el.movie_year && elSearchEndvalue >= el.movie_year) || (elSearchStartvalue == "" && elSearchEndvalue >= el.movie_year) || (elSearchStartvalue <= el.movie_year && elSearchEndvalue == ""));
        return inputFilter
    })
    
    if(searchMove.length > 0){
        renderMovoi(searchMove,regEx)
    }else{
        elList.textContent = "Bunday keno mavjud emas";
    }
})
renderMovoi(movies.slice(0, 10))