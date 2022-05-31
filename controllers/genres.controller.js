const res = require("express/lib/response");
const Genre = require("../models/Genre.model");

module.exports.genresController = {
    postGenre: async (req, res) => {
        try {
            const Genres = await Genre.create({
                name: req.body.name
            });
            res.json(Genres)
        } catch (err) {
            res.json("ошибка при добавлении жанра")
        };
    },
    patchGenre: async (req, res) => {
        try {
            const Genres = await Genre.findByIdAndUpdate(req.params.id, {
                name: req.body.name
            });
            res.json(Genres)
        } catch (err) {
            res.json("ошибка при изменении жанра")
        };
    },
    deleteGenre: async (req, res) => {
        try {
            await Genre.findByIdAndRemove(req.params.id);
            res.json("удалено")
        } catch (err) {
            res.json("ошибка при удалении жанра")
        };
    },
    getGenre: async (req,res) => {
        try {
            const genres = await Genre.find();
            res.json(genres)
        } catch (err) {
            res.json("ошибка при выведени жанра")
        }
    }
}