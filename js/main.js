const template = document.querySelector(".template").content;
const elList = document.querySelector(".move-list");
const fragmet = document.createDocumentFragment()

for (const move of movies.slice(0, 100)) {
    const temClone = template.cloneNode(true);
    temClone.querySelector(".move-title").textContent = move.Title;
    temClone.querySelector(".move-year").textContent = move.movie_year;
    temClone.querySelector(".move-time").textContent = `${Math.floor(move.runtime / 60)} hours : ${move.runtime % 60} minutes`;
    temClone.querySelector(".move-categores").textContent = move.Categories;
    fragmet.appendChild(temClone);
}
elList.appendChild(fragmet)