const Anime = require('../models/animeModel');
const { v4: uuidv4 } = require('uuid');

let animes = [
    new Anime(
        uuidv4(),
        'Naruto',
        'Aventura, Comédia Dramática, Fantasia',
        'Pierrot'
    ),
    new Anime(
        uuidv4(),
        'Attack on Titan',
        'Ação, Fantasia Sombria, Pós-apocalítico',
        'MAPPA'
    ),
    new Anime(
        uuidv4(),
        'Inazuma Eleven',
        'Aventura, Comédia, Fantasia, ShonenEsporte, Shonen',
        'OLM'
    )
];

class AnimeRepository {
    getAll() {
        return animes;
    }

    getById(id) {
        return animes.find(anime => anime.id === id);
    }

    create(anime) {
        anime.id = uuidv4();
        animes.push(anime);
        return anime;
    }

    update(id, updatedAnime) {
        const index = animes.findIndex(anime => anime.id === id);
        if (index !== -1) {
            animes[index] = { ...animes[index], ...updatedAnime };
            return animes[index];
        }
        return null;
    }

    delete(id) {
        animes = animes.filter(anime => anime.id !== id);
        return true;
    }
}

module.exports = new AnimeRepository();