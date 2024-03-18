const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const episodeController = require('../controllers/episodes')

router.post('/', multer, episodeController.createEpisode)
router.get('/', episodeController.getAllEpisodes)
router.get('/saisonId/:id', episodeController.getEpisodeBySaisonId)
router.get('/serieId/:id', episodeController.getEpisodeBySerieId)
router.put('/majNote/:id', episodeController.majNote)
router.put('/majStill/:id', episodeController.majStill)

module.exports = router