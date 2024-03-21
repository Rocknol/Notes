const Serie = require('../models/series')
const fs = require('fs')

exports.createSerie = (req, res, next) => {
    let newSerie = new Serie({
        title: req.body.title,
        genres: req.body.genres,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        imageUrl: req.body.poster,
        fanartUrl: req.body.fanart,
        plot: req.body.plot,
        nombreSaisons: 0,
        lienTVDB: req.body.lienTVDB,
        firstAirDate: req.body.firstairdate,
        lastAirDate: req.body.lastairdate,
        status: req.body.status,
        noteTMDB: req.body.noteTMDB,
        nombreVotesTMDB: req.body.nombrevotesTMDB,
        TMDBId: req.body.tmdbid,
        awards: req.body.awards,
        noteIMDB: req.body.noteIMDB,
        nombreVotesIMDB: req.body.nombrevotesIMDB
    })
    newSerie.save()
        .then(() => { res.status(201).json({ message: "série enregistrée" }) })
        .catch((error) => { res.status(401).json({ error }) })
}

exports.getAllSeries = (req, res, next) => {
    Serie.find().sort({ decimale: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((series) => res.status(201).json(series))
        .catch((error) => res.status(401).json(error))
}

exports.getOneSerie = (req, res, next) => {
    Serie.findOne({ _id: req.params.id })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

exports.getSerieByTitle = (req, res, next) => {
    Serie.find({ title: { $regex: req.params.title } })
        .then((series) => res.status(201).json(series))
        .catch((error) => res.status(401).json(error))
}

exports.getSerieByGenre = (req, res, next) => {
    Serie.find({ genres: req.params.genre })
        .then((series) => res.status(201).json(series))
        .catch((error) => res.status(401).json(error))
}

exports.getSerieByNote = (req, res, next) => {
    Serie.find({ note: req.params.note })
        .then((series) => res.status(201).json(series))
        .catch((error) => res.status(401).json(error))
}

exports.majNoteSerie = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $set: { note: req.body.note, decimale: req.body.decimale } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

exports.majGenre = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $push: { genres: req.body.genre } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

exports.addFanart = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $push: { fanartUrl: req.body.fanartToAdd } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

exports.removeFanart = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $pull: { fanartUrl: req.body.fanartToRemove } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

// exports.addLogo = (req, res, next) => {
//     Serie.updateOne({ _id: req.params.id }, { $set: { logo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } })
//         .then((serie) => res.status(201).json(serie))
//         .catch((error) => res.status(401).json(error))
// }

exports.majPoster = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $set: { imageUrl: req.body.newPosterPath } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}

exports.majLogo = (req, res, next) => {
    Serie.updateOne({ _id: req.params.id }, { $set: { logo: req.body.newLogoPath } })
        .then((serie) => res.status(201).json(serie))
        .catch((error) => res.status(401).json(error))
}