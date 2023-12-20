const Album = require('../models/albums');
const fs = require('fs');

exports.createAlbum = (req, res, next) => {
    let newAlbum = new Album({
        artisteId: req.body.artisteId,
        title: req.body.title,
        artiste: req.body.artiste,
        note: req.body.note,
        genre: req.body.genre,
        annee: req.body.annee,
        type: req.body.type,
        format: req.body.format,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    newAlbum.save()
        .then(() => { res.status(201).json({ message: "album enregistré" }) })
        .catch((error) => { res.status(401).json({ error }) })
}

exports.getAlbumByArtisteId = (req, res, next) => {
    Album.find({ artisteId: req.params.artisteId })
        .then((albums) => res.status(201).json(albums))
        .catch((error) => res.status(401).json(error))
}