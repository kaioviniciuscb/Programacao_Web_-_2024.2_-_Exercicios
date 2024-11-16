const Anime = require('../models/animeModel');
const animeRepository = require('../repositories/animeRepository');

class AnimeService {
    getAllAnimes() {
        return animeRepository.getAll();
    }

    getAnimeById(id) {
        const foundAnime = animeRepository.getById(id);

        if (!foundAnime) {
            return null;
        }

        return foundAnime;
    }

    addAnime(data) {
        const { name, genre, studio } = data;
        if ((!name || name === '') || (!genre || genre === '') || (!studio || studio === '')) {
            return { error: 'Preencha todos os campos!' };
        }
        const newAnime = new Anime(null, name, genre, studio);
        return animeRepository.create(newAnime);
    }

    updateAnime(id, data) {
        const { name, genre, studio } = data;
        if ((!name || name === '') || (!genre || genre === '') || (!studio || studio === '')) {
            return { error: 'Preencha todos os campos!' };
        }

        const updatedAnime = animeRepository.update(id, data);

        if (updatedAnime === null) {
            return null;
        }

        return updatedAnime;
    }

    deleteAnime(id) {
        return animeRepository.delete(id);
    }
}

module.exports = new AnimeService();