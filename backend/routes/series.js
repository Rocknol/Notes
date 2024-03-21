const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const serieController = require("../controllers/series");


router.post('/', multer, serieController.createSerie)
router.get('/', serieController.getAllSeries)
router.get('/:id', serieController.getOneSerie)
router.get('/title/:title', serieController.getSerieByTitle)
router.get('/genre/:genre', serieController.getSerieByGenre)
router.get('/note/:note', serieController.getSerieByNote)
router.put('/majNote/:id', serieController.majNoteSerie)
router.put('/majGenre/:id', serieController.majGenre)
router.put('/addFanart/:id', multer, serieController.addFanart)
router.put('/removeFanart/:id', serieController.removeFanart)
// router.put('/logo/:id', multer, serieController.addLogo)
router.put('/majPoster/:id', serieController.majPoster)
router.put('/majLogo/:id', serieController.majLogo)

module.exports = router