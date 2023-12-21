const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const albumController = require('../controllers/albums');

router.post('/', multer, albumController.createAlbum);
router.get('/', albumController.getAllAlbums);
router.get('/artisteId/:artisteId', albumController.getAlbumByArtisteId);
router.get('/artiste/:artiste', albumController.getAlbumByArtiste);

module.exports = router;