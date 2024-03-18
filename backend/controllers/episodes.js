const Episode = require("../models/episodes");
const fs = require('fs');

exports.createEpisode = (req, res, next) => {
    let newEpisode = new Episode({
        numero: req.body.numero,
        title: req.body.title,
        saisonId: req.body.saisonId,
        serieId: req.body.serieId,
        note: req.body.note,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        imageUrl: req.body.thumbnail,
        airDate: req.body.airdate,
        runtime: req.body.runtime,
        plot: req.body.plot,
        noteTMDB: req.body.noteTMDB,
        nombreVotesTMDB: req.body.nombrevotesTMDB,
        director: req.body.director,
        noteIMDB: req.body.noteIMDB,
        nombreVotesIMDB: req.body.nombrevotesIMDB
    })
    newEpisode.save()
        .then(() => { res.status(201).json({ message: "épisode enregistré" }) })
        .catch((error) => { res.status(401).json({ error }) })
}

exports.getAllEpisodes = (req, res, next) => {
    Episode.find()
        .then((episodes) => res.status(201).json(episodes))
        .catch((error) => res.status(401).json(error))
}

exports.getEpisodeBySaisonId = (req, res, next) => {
    Episode.find({ saisonId: req.params.id }).sort({ numero: 1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))
}

exports.majNote = (req, res, next) => {
    Episode.updateOne({ _id: req.params.id }, { $set: { note: req.body.note } })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))

}

exports.getEpisodeBySerieId = (req, res, next) => {
    Episode.find({ serieId: req.params.id })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))
}

exports.majStill = (req, res, next) => {
    Episode.updateOne({ _id: req.params.id }, { $set: { imageUrl: req.body.newStillPath } })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))
}
