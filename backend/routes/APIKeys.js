const express = require('express');
const router = express.Router();
const APIKeysController = require('../controllers/APIKeys');

router.get('/:id', APIKeysController.getAPIKeys)

module.exports = router;