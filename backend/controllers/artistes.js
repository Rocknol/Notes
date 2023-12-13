const Artiste = require('../models/artistes');
const fs = require('fs');

exports.createArtist = (req, res, next) => {
    let newArtist = new Artiste({
        name: req.body.name,
        nationalite: req.body.nationalite,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    newArtist.save()
        .then(() => { res.status(201).json({ message: "artiste enregistré" }) })
        .catch((error) => { res.status(401).json({ error }) })
}

exports.getAllArtists = (req, res, next) => {
    Artiste.find().sort({ decimale: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((artistes) => res.status(201).json(artistes))
        .catch((error) => res.status(401).json(error))
}

exports.getOneArtist = (req, res, next) => {
    Artiste.findOne({ _id: req.params.id })
        .then((artiste) => res.status(201).json(artiste))
        .catch((error) => res.status(401).json(error))
}

exports.majNoteArtiste = (req, res, next) => {
    Artiste.updateOne({ _id: req.params.id }, { $set: { note: req.body.note, decimale: req.body.decimale, nombreAlbums: req.body.nombreAlbums } })
        .then((artiste) => res.status(201).json(artiste))
        .catch((error) => res.status(401).json(error))
}