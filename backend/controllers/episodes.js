const Episode = require("../models/episodes");
const fs = require('fs');

exports.createEpisode = (req, res, next) => {
    let newEpisode = new Episode({
        numero: "Episode " + req.body.numero,
        title: req.body.title,
        saisonId: req.body.saisonId,
        note: req.body.note,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    Episode.find({ saisonId: req.params.id })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))
}

exports.majNote = (req, res, next) => {
    Episode.updateOne({ _id: req.params.id }, { $set: { note: req.body.note } })
        .then((episode) => res.status(201).json(episode))
        .catch((error) => res.status(401).json(error))

}