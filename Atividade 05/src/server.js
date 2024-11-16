const { request, response } = require('express');
const app = require('./app.js');
const port = 3030;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());

app.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
});

const animes = [
    {
        id: uuidv4(),
        name: 'Naruto',
        genre: 'Aventura, Comédia Dramática, Fantasia',
        studio: 'Pierrot'
    },
    {
        id: uuidv4(),
        name: 'Attack on Titan',
        genre: 'Ação, Fantasia Sombria, Pós-apocalítico',
        studio: 'MAPPA'
    },
    {
        id: uuidv4(),
        name: 'Inazuma Eleven',
        genre: 'Aventura, Comédia, Fantasia, ShonenEsporte, Shonen',
        studio: 'OLM'
    }
];

app.get('/animes', (request, response) => response.status(200).json({ animes }));

app.get('/animes/:id', (request, response) => {
    const { id } = request.params;
    const foundAnime = animes.find((anime) => anime.id === id);

    if (!foundAnime) {
        return response.status(404).json({ message: 'Anime não encontrado!' });
    }

    response.status(200).json({ anime: foundAnime });
});

app.post('/animes', (request, response) => {
    const { name, genre, studio } = request.body;

    if ((!name || name === '') || (!genre || genre === '') || (!studio || studio === '')){
        return response.status(400).json({ message: 'Campos inválidos!' });
    }

    const newAnime = {
        id: uuidv4(),
        name: name,
        genre: genre,
        studio: studio
    };

    animes.push(newAnime);
    response.status(201).json({ anime: newAnime });
});

app.put('/animes/:id', (request, response) => {
    const { id } = request.params;
    const { name, genre, studio } = request.body;
    
    if ((!name || name === '') || (!genre || genre === '') || (!studio || studio === '')){
        return response.status(400).json({ message: 'Campos inválidos!' });
    }

    const updateAnime = animes.find((anime) => anime.id === id);

    if (!updateAnime){
        return response.status(404).json({ message: 'Anime não encontrado!' });
    }

    updateAnime.name = name;
    updateAnime.genre = genre;
    updateAnime.studio = studio;

    response.status(200).json({ anime: updateAnime });
});

app.delete('/animes/:id', (request, response) => {
    const { id } = request.params;
    const deleteAnime = animes.findIndex((anime) => anime.id === id);

    if (deleteAnime === -1){
        return response.status(404).json({ message: 'Anime não encontrado!' });
    }

    animes.splice(deleteAnime, 1);

    response.status(200).end();
});