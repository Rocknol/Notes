const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const artisteController = require('../controllers/artistes');

router.get('/', artisteController.getAllArtists);
router.post('/', multer, artisteController.createArtist);

module.exports = router