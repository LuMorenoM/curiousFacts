import { getFact } from "./api.js";

async function showNewFact() {
  const fact = await getFact();
  document.getElementById("fact-text").textContent = fact.text;
}

document.getElementById("new-fact-btn").addEventListener("click", showNewFact);

showNewFact();
