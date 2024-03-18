const Saison = require('../models/saisons');
const fs = require('fs')

exports.createSaison = (req, res, next) => {
    let newSaison = new Saison({
        title: req.body.title,
        seasonNumber: req.body.seasonnumber,
        serieTitle: req.body.serieTitle,
        serieId: req.body.serieId,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        imageUrl: req.body.poster,
        plot: req.body.plot,
        noteTMDB: req.body.noteTMDB,
        nombreEpisodes: 0,
        TMDBId: req.body.tmdbid,
        airDate: req.body.airdate
    })
    newSaison.save()
        .then(() => { res.status(201).json({ message: "saison enregistrée" }) })
        .catch((error) => { res.status(401).json({ error }) })
}

exports.getSaisonBySerieId = (req, res, next) => {
    Saison.find({ serieId: req.params.serieId })
        .then((saisons) => res.status(201).json(saisons))
        .catch((error) => res.status(401).json(error))
}

exports.getOneSaison = (req, res, next) => {
    Saison.findOne({ _id: req.params.id })
        .then((saison) => res.status(201).json(saison))
        .catch((error) => res.status(401).json(error))
}

exports.majNoteSaison = (req, res, next) => {
    Saison.updateOne({ _id: req.params.id }, { $set: { note: req.body.note, decimale: req.body.decimale } })
        .then((saison) => res.status(201).json(saison))
        .catch((error) => res.status(401).json(error))
}

exports.majPoster = (req, res, next) => {
    Saison.updateOne({ _id: req.params.id }, { $set: { imageUrl: req.body.newPosterPath } })
        .then((saison) => res.status(201).json(saison))
        .catch((error) => res.status(401).json(error))
}