const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const realisateurController = require('../controllers/realisateurs');

router.get('/', realisateurController.getAllRealisateurs)
router.get('/:id', realisateurController.getOneRealisateur)
router.get('/name/:name', realisateurController.getRealisateurByName)
router.get('/nationalite/:nationalite', realisateurController.getRealisateurByNationality)
router.get('/note/:note', realisateurController.getRealisateurByNote)
router.post('/', multer, realisateurController.createRealisateur)
router.put('/majNote/:id', realisateurController.majNoteRealisateur)
router.put('/unsetNote/:realisateurId', realisateurController.unsetNoteRealisateur)

module.exports = router