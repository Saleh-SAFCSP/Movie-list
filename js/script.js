const API_KEY = '7d871d91';
const input = document.getElementById('movie-input');
const button = document.getElementById('search-button');
const movieList = document.getElementById('movie-area');

button.addEventListener('click', async () => {
  const value = input.value;
  // https://www.omdbapi.com/?s=naruto&apikey=7d871d91
  try {
    const request = await fetch(
      `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`
    );
    if (request.status != 200) {
      return;
    }
    const data = await request.json();

    if (data.Response === 'False') {
      alert(data.Error);
      return;
    }

    const dataMap = data.Search.map((item) => {
      return `
      <div class="col mt-3">
                <div id="${item.imdbID}" class="card text-center" >
                    <img src='${item.Poster}'
                        class="card-img-top" alt="img">
                    <div class="card-body">
                        <h5 class="card-title">${item.Title}</h5>
                        <h5 class="card-title">Year : ${item.Year}</h5>
                    </div>
                </div>
            </div>
      `;
    });

    movieList.innerHTML = dataMap.join('');

    console.log(data.Search);
  } catch (error) {
    console.log(error);
  }
});
