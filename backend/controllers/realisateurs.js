const Realisateur = require("../models/realisateurs");
const fs = require('fs');

exports.createRealisateur = (req, res, next) => {
    let newRealisateur = new Realisateur({
        name: req.body.name,
        nationalite: req.body.nationalite,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        imageUrl: req.body.photo,
        lieuDeNaissance: req.body.birthplace,
        biographie: req.body.biographie,
        birthday: req.body.birthday,
        deathday: req.body.deathday

    })
    newRealisateur.save()
        .then(() => { res.status(201).json({ message: "realisateur enregistré" }) })
        .catch((error) => { res.status(401).json({ error }) })

}

exports.getAllRealisateurs = (req, res, next) => {
    Realisateur.find().sort({ decimale: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((realisateurs) => res.status(201).json(realisateurs))
        .catch((error) => res.status(401).json(error))
}

exports.getOneRealisateur = (req, res, next) => {
    Realisateur.findOne({ _id: req.params.id })
        .then((realisateur) => res.status(201).json(realisateur))
        .catch((error) => res.status(401).json(error))
}

exports.getRealisateurByName = (req, res, next) => {
    Realisateur.findOne({ name: { $regex: req.params.name } })
        .then((realisateur) => res.status(201).json(realisateur))
        .catch((error) => res.status(401).json(error))
}

exports.getRealisateurByNationality = (req, res, next) => {
    Realisateur.find({ nationalite: req.params.nationalite })
        .then((realisateurs) => res.status(201).json(realisateurs))
        .catch((error) => res.status(401).json(error))
}

exports.getRealisateurByNote = (req, res, next) => {
    Realisateur.find({ note: req.params.note })
        .then((realisateurs) => res.status(201).json(realisateurs))
        .catch((error) => res.status(401).json(error))
}

exports.majNoteRealisateur = (req, res, next) => {
    Realisateur.updateOne({ _id: req.params.id }, { $set: { note: req.body.note, decimale: req.body.decimale, nombreFilms: req.body.nombreFilms } })
        .then((realisateur) => res.status(201).json(realisateur))
        .catch((error) => res.status(401).json(error))
}

exports.unsetNoteRealisateur = (req, res, next) => {
    Realisateur.updateOne({ _id: req.params.realisateurId }, { $unset: { note: "", decimale: "" } })
        .then((realisateur) => res.status(201).json(realisateur))
        .catch((error) => res.status(401).json(error))
}