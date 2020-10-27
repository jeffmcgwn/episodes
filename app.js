const generate = document.getElementById('generate');
const episode = document.querySelector('.episode');
const enterShow = document.getElementById('enterShow');
const body = document.querySelector('body');
let newArr = [];

async function getId() {
  let response = await fetch(
    `https://rapidapi.p.rapidapi.com/?s=${enterShow.value}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
        'x-rapidapi-key': '5f7daf8231mshe0f6a7f36012aa4p1a2ae1jsn91d66c35c706',
      },
    }
  );
  let data3 = await response.json();
  data3 = JSON.stringify(data3);
  data3 = JSON.parse(data3);
  return data3;
}

async function fetchImdb() {
  let showId = await getId();
  console.log(showId);
  for (i = 0; i < showId.Search.length; i++) {
    if (showId.Search[i].Type === 'series') {
      newArr.push(showId.Search[i]);
    }
  }

  console.log(newArr);
  let realShowId = newArr[0].imdbID;
  let response = await fetch(
    `https://imdb8.p.rapidapi.com/title/get-seasons?tconst=${realShowId}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': '5f7daf8231mshe0f6a7f36012aa4p1a2ae1jsn91d66c35c706',
      },
    }
  );
  let data = await response.json();
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

generate.addEventListener('click', async function getImdb() {
  episode.innerHTML = `<img src='loading.gif'>`;
  let abc = await fetchImdb();
  console.log(abc);
  var randSeason = Math.floor(Math.random() * abc.length);
  var randEpisode = Math.floor(Math.random() * abc[randSeason].episodes.length);
  console.log(randSeason);
  console.log(randEpisode);
  var episodeId = abc[randSeason].episodes[randEpisode].id;
  var realId = episodeId.substr(7, episodeId.length);
  console.log(realId);
  console.log(abc[randSeason].episodes[randEpisode].title);

  async function fetchImdb2() {
    let response = await fetch(
      `https://rapidapi.p.rapidapi.com/title/get-plots?tconst=${realId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'imdb8.p.rapidapi.com',
          'x-rapidapi-key':
            '5f7daf8231mshe0f6a7f36012aa4p1a2ae1jsn91d66c35c706',
        },
      }
    );
    let data2 = await response.json();
    data2 = JSON.stringify(data2);
    data2 = JSON.parse(data2);
    return data2;
  }

  let def = await fetchImdb2();
  console.log(def);
  console.log(def.plots[0].text);

  setTimeout(function () {
    episode.innerHTML = `
          <img src = ${def.base.image.url} width='50%' id='showImage'>
          <h3>${def.base.title}</h3>
          
          <h4>Season ${def.base.season}, Episode ${def.base.episode}</h4>
          
          <br>
          <h6>${def.plots[0].text}</h6>`;
  }, 2000);
});
