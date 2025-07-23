import { getFact } from "./api.js";

let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
let currentFact = null;

function saveFavorites() {
  sessionStorage.setItem("favorites", JSON.stringify(favorites));
}

function addFactToFavorites(fact) {
  if (!favorites.some((f) => f.text === fact.text)) {
    favorites.push(fact);
    saveFavorites();
    renderFavorites();
  } else {
    alert("That fact is already on the favorites list!");
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

function showHome() {
  document.getElementById("home-page").style.display = "block";
  document.getElementById("favorites-page").style.display = "none";
}

function showFavorites() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("favorites-page").style.display = "block";
  renderFavorites();
}

function router() {
  const hash = window.location.hash;
  if (hash === "#favorites") {
    showFavorites();
  } else {
    showHome();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  router();
  showNewFact();
  renderFavorites();
});

document.getElementById("new-fact-btn").addEventListener("click", showNewFact);
document.getElementById("save-fact-btn").addEventListener("click", () => {
  if (currentFact) {
    addFactToFavorites(currentFact);
  }
});
