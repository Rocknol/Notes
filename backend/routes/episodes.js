const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const episodeController = require('../controllers/episodes')

router.post('/', multer, episodeController.createEpisode)
router.get('/saisonId/:id', episodeController.getEpisodeBySaisonId)
router.put('/majNote/:id', episodeController.majNote)

module.exports = router