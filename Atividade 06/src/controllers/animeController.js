const { req, res } = require('express');
const animeService = require('../services/animeService');

class AnimeController {
    getAll(req, res) {
        const animes = animeService.getAllAnimes();
        res.status(200).json(animes);
    }

    getById(req, res) {
        const id = req.params.id;
        const anime = animeService.getAnimeById(id);
        if (anime) {
            res.status(200).json(anime);
        } else {
            res.status(404).json({ message: 'Anime não encontrado!' });
        }
    }

    add(req, res) {
        const result = animeService.addAnime(req.body);

        if (result && result.id) {
            res.status(201).json(result);
        } else if (result && result.error) {
            res.status(400).json(result);
        } else {
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    update(req, res) {
        const id = req.params.id;
        const result = animeService.updateAnime(id, req.body);

        if (result && result.id) {
            res.status(200).json(result);
        } else if (result && result.error) {
            res.status(400).json(result);
        } else if (result === null) {
            res.status(404).json({ message: "Anime para ser atualizado não encontrado!" });
        } else {
            res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    delete(req, res) {
        const id = req.params.id;
        animeService.deleteAnime(id);
        res.status(200).json({ message: 'Anime deletado com sucesso!' });
    }
}

module.exports = new AnimeController();