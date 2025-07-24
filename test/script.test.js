// tests/script.test.js
import { expect } from "chai";

// Manual mock for localStorage (safe for ESM)
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  clear() {
    this.store = {};
  },
  removeItem(key) {
    delete this.store[key];
  }
};

// Logic under test
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addFactToFavorites(fact) {
  if (!favorites.some((f) => f.text === fact.text)) {
    favorites.push(fact); 
    saveFavorites();
  } else {
    alert("That fact's is already on the favorites list!");
  }
}

// The test
describe("addFactToFavorites", () => {
  beforeEach(() => {
    favorites = [];
    localStorage.clear();
  });

  it("should add a new fact and store it", () => {
    const fact = { text: "Sharks are older than trees" };
    addFactToFavorites(fact); 

    const stored = JSON.parse(localStorage.getItem("favorites"));
    expect(favorites).to.have.lengthOf(1);
    expect(stored[0].text).to.equal("Sharks are older than trees");
  });
});
