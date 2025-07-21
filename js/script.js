import { getFact } from "./api.js";

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentFact = null;

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addFactToFavorites(fact) {
  if (!favorites.some((f) => f.text === fact.text)) {
    favorites.push(fact);
    saveFavorites();
    renderFavorites();
  } else {
    alert("That fact's is already on the favorites list!");
  }
}

function renderFavorites() {
  const list = document.getElementById("favorites-list");
  list.innerHTML = "";

  favorites.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact.text;
    list.appendChild(li);
  });
}

async function showNewFact() {
  currentFact = await getFact();
  document.getElementById("fact-text").textContent = currentFact.text;
}

document.getElementById("new-fact-btn").addEventListener("click", showNewFact);
document.getElementById("save-fact-btn").addEventListener("click", () => {
  if (currentFact) {
    addFactToFavorites(currentFact);
  }
});

renderFavorites();
showNewFact();
