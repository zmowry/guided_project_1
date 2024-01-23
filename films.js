const sp = new URLSearchParams(window.location.search)
const id = sp.get('id')

async function fetchFilms(id) {
    const url = `https://swapi2.azurewebsites.net/api/films/${id}`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }

document.querySelector('#join_list').addEventListener('submit', id => fetchFilms(id))
