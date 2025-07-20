export async function getFact() {
  const url = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
