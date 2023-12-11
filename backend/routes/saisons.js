const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const saisonController = require('../controllers/saisons');

router.post("/", multer, saisonController.createSaison)
router.get('/serieId/:serieId', saisonController.getSaisonBySerieId)
router.get('/:id', saisonController.getOneSaison)
router.put('/:id', saisonController.majNbEpisodes)
router.put('/majNote/:id', saisonController.majNoteSaison)

module.exports = router