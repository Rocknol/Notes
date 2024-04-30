const Film = require('../models/films')
const fs = require('fs')

exports.createFilm = (req, res, next) => {
    let newFilm = new Film({
        realisateurId: req.body.realisateurId,
        title: req.body.title,
        realisateur: req.body.realisateur,
        plot: req.body.plot,
        releaseDate: req.body.releasedate,
        note: req.body.note,
        genres: req.body.genres,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        imageUrl: req.body.poster,
        fanartUrl: req.body.fanart,
        runtime: req.body.runtime,
        awards: req.body.awards,
        noteTMDB: req.body.noteTMDB,
        nombreVotesTMDB: req.body.nombrevotesTMDB,
        noteIMDB: req.body.noteIMDB,
        nombreVotesIMDB: req.body.nombrevotesIMDB,
        metascore: req.body.metascore,
        TMDBId: req.body.tmdbid

    })
    newFilm.save()
        .then(() => { res.status(201).json({ message: "film enregistré" }) })
        .catch((error) => { res.status(401).json({ error }) });
}

exports.getAllFilms = (req, res, next) => {
    Film.find().sort({ note: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getOneFilm = (req, res, next) => {
    Film.findOne({ _id: req.params.id })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByTitle = (req, res, next) => {
    Film.find({ title: { $regex: req.params.name } })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByRealisateur = (req, res, next) => {
    Film.find({ realisateur: { $regex: req.params.realisateur } }).sort({ note: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByRealisateurId = (req, res, next) => {
    Film.find({ realisateurId: req.params.realisateurId })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByNote = (req, res, next) => {
    Film.find({ note: req.params.note })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByGenre = (req, res, next) => {
    Film.find({ genres: req.params.genre })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmByAnnee = (req, res, next) => {
    Film.find({ annee: req.params.annee })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.getFilmBySaga = (req, res, next) => {
    Film.find({ saga: req.params.saga })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))

}

exports.getFilmByFilter = (req, res, next) => {
    Film.find({ title: { $regex: req.params.name }, note: req.params.note, genres: req.params.genre, realisateur: { $regex: req.params.realisateur }, annee: req.params.annee })
        .then((films) => res.status(201).json(films))
        .catch((error) => res.status(401).json(error))
}

exports.deleteFilm = (req, res, next) => {
    Film.findOne({ _id: req.params.id })
        .then(film => {
            let imageFileName = film.imageUrl.split('/images/')[1];
            fs.unlink(`images/${imageFileName}`, () => {
                Film.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json(film))
                    .catch((error) => res.status(401).json({ error }))
            })
        })
}

exports.majNoteFilm = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $set: { note: req.body.note } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.majSagaFilm = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $set: { saga: req.body.saga } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.majGenre = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $push: { genres: req.body.genre } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.addFanart = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $push: { fanartUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.addLogo = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $set: { logo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.majPoster = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $set: { imageUrl: req.body.newPosterPath } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.addFanart = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $push: { fanartUrl: req.body.fanartToAdd } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.removeFanart = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $pull: { fanartUrl: req.body.fanartToRemove } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}

exports.majLogo = (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { $set: { logo: req.body.newLogoPath } })
        .then((film) => res.status(201).json(film))
        .catch((error) => res.status(401).json(error))
}