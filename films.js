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
//   homeworldSpan = document.querySelector('span#homeworld');
  filmsUl = document.querySelector('#films>ul');
//   filmID = document.querySelector('');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
//   getCharacter(id)
  getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        console.log({film})
    //   film = await fetchFilm(id)
    //   film.films = await fetchFilms(film)

      film.characters = await fetchCharacters(film)
      film.planets = await fetchPlanets(film)

    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }

async function getCharacter(id) {
  let character;
  try {
    character = await fetchCharacter(id)
    character.homeworld = await fetchHomeworld(character)
    character.films = await fetchFilms(character)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderCharacter(character);

}

async function fetchCharacter(id) {
  let characterUrl = `${baseUrl}/characters/${id}`;
  return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchHomeworld(character) {
  const url = `${baseUrl}/planets/${character?.homeworld}`;
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
  

async function fetchFilms(character) {
  const url = `${baseUrl}/characters/${character?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  nameH1.textContent = film?.title;
  release_dateSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
