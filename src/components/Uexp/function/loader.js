// https://api.rawg.io/api/games?key=INSERISCI_KEY&dates=2024-01-01,2024-12-31&page=1
// key API ===>    109f21d078f94b7c931505bddedd051d


const urls = ['https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&page_size=40&page=1',
    'https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&page_size=40&page=2',
    'https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&page_size=40&page=3',
    'https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&page_size=40&page=4',
    'https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&page_size=40&page=5',

]

// fetch per home
export const getGames = async () => {

    const promises = urls.map((url) => fetch(url).then((res) => res.json()));

    const results = await Promise.all(promises);

  const games = results.map((results) => results.results);
  // console.log(games); 

    const allGames = games.map((game) => game.map((game) => game)).flat();

    // console.log(allGames);

    const imgame = allGames.map((game) => game.background_image);
    // console.log(imgame);

    const named = allGames.map((game) => game.slug);
    // console.log(named);

    const genres = allGames.map((game) => game.genres[0].name);
    // console.log(genres);



    // const category = allGames.map((game) => game.genres);
    // console.log(category);

    return [    
        allGames,
        imgame,
        named,
        genres
    ];
};

// fetch per categoria
export const getGamesByGenre = async ({ params }) => {
  const [allGames] = await getGames();
  const filteredGames = allGames.filter(game =>
    game.genres.some(g => g.name.toLowerCase() === params.id.toLowerCase())
  );
  return filteredGames;
};

// fetch per detail
export const getGameBySlug = async ({ params }) => {
  const response = await fetch(
    `https://api.rawg.io/api/games/${params.id}?key=109f21d078f94b7c931505bddedd051d`
  );
  if (!response.ok) {
    throw new Response("Gioco non trovato", { status: 404 });
  }
  return response.json();
};

// fetch per search
export const getGamesBySearch = async ({ params }) => {
  const { search } = params;
  const response = await fetch(
    `https://api.rawg.io/api/games?key=109f21d078f94b7c931505bddedd051d&search=${search}`
  );
  const data = await response.json();
  return data.results;
};


