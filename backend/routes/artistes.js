const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const artisteController = require('../controllers/artistes');

router.get('/', artisteController.getAllArtists);
router.get('/:id', artisteController.getOneArtist);
router.post('/', multer, artisteController.createArtist);
router.put('/majNote/:id', artisteController.majNoteArtiste);


module.exports = router