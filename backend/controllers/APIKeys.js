const API = require('../models/APIKeys');
const fs = require('fs');

exports.getAPIKeys = (req, res, next) => {
    API.findOne({ _id: req.params.id })
        .then((api) => res.status(201).json(api))
        .catch((error) => res.status(401).json(error))
}