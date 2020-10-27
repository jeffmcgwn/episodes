async function fetchData() 
{
  let response = await fetch('https://officeapi.dev/api/episodes/random');
  let data = await response.json();
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

async function fetchImdb() 
{
  let response = await fetch('https://imdb8.p.rapidapi.com/title/get-seasons?tconst=tt0386676', {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "5f7daf8231mshe0f6a7f36012aa4p1a2ae1jsn91d66c35c706"
	}
})
  let data2 = await response.json();
  data2 = JSON.stringify(data2);
  data2 = JSON.parse(data2);
  return data2;
}

async function main() {
    let abc = await fetchData();
    let def = await fetchImdb();
    // console.log(def)
    console.log(abc.data);

    for(i = 0; i < def.length; i++){
        for(j = 0; j < def[i].episodes.length; j++){
            if(def[i].episodes[j].title === abc.data.title){
            console.log(abc.data.description)
            }
        }
     
    }
  }
  
  main();