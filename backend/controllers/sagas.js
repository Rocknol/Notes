const Saga = require('../models/film-sagas')
const fs = require('fs');

exports.createSaga = (req, res, next) => {
    let newSaga = new Saga({
        title: req.body.name,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    newSaga.save()
        .then(() => { res.status(201).json({ message: "saga enregistrée" }) })
        .catch((error) => { res.status(401).json({ error }) });
}

exports.getAllSagas = (req, res, next) => {
    Saga.find().sort({ decimale: -1 }).collation({ locale: "en_US", numericOrdering: true })
        .then((sagas) => res.status(201).json(sagas))
        .catch((error) => res.status(401).json(error))
}

exports.getOneSaga = (req, res, next) => {
    Saga.findOne({ _id: req.params.id })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}

exports.getSagaByTitle = (req, res, next) => {
    Saga.findOne({ title: req.params.title })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}

exports.majSagaAdd = (req, res, next) => {
    Saga.updateOne({ title: req.params.title }, { $push: { films: req.body.filmTitle } })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}

exports.majSagaDelete = (req, res, next) => {
    Saga.updateOne({ title: req.params.title }, { $pull: { films: req.body.filmTitle } })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}

exports.majNoteSaga = (req, res, next) => {
    Saga.updateOne({ title: req.params.title }, { $set: { note: req.body.note, decimale: req.body.decimale } })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}

exports.unsetNoteSaga = (req, res, next) => {
    Saga.updateOne({ title: req.params.title }, { $unset: { note: "", decimale: "" } })
        .then((saga) => res.status(201).json(saga))
        .catch((error) => res.status(401).json(error))
}