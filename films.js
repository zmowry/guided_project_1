let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  episodeSpan = document.querySelector('span#episode');
  directorSpan = document.querySelector('span#director');
  release_dateSpan = document.querySelector('span#release_date');
  filmsUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul')
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  // getPlanet(id)
  getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id)
      console.log({film})
      film.characters = await fetchCharacters(film)
      film.planets = await fetchPlanets(film)

    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }

async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/character/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchPlanet(id) {
  const url = `${baseUrl}/planets/${id}`;
  const planet = await fetch(url)
    .then(res => res.json())
  return planet;
}

async function fetchFilm(id) {
    const url = `${baseUrl}/films/${id}`;
    const film = await fetch(url)
      .then(res => res.json())
    return film;
  }
  

async function fetchCharacters(film) {
    
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
      console.log({characters})
      return characters;
  }

  async function fetchPlanets(film) {
    
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
      console.log({planets})
      return planets;
  }

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  release_dateSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  
  const charactersList = film?.characters?.map(character => `<li><a href="/films.html?id=${character.id}">${character.name}</li>`)
  filmsUl.innerHTML = charactersList.join("");

  const planetsList = film?.planets?.map(planet => `<li><a href="/films.html?id=${planet.id}">${planet.name}</li>`)
  planetsUl.innerHTML = planetsList.join("");
}
