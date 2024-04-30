const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config')
const filmController = require('../controllers/films')

router.get('/', filmController.getAllFilms)
router.get('/:id', filmController.getOneFilm)
router.get('/title/:name', filmController.getFilmByTitle)
router.get('/realisateurId/:realisateurId', filmController.getFilmByRealisateurId)
router.get('/realisateur/:realisateur', filmController.getFilmByRealisateur)
router.get('/note/:note', filmController.getFilmByNote)
router.get('/genre/:genre', filmController.getFilmByGenre)
router.get('/annee/:annee', filmController.getFilmByAnnee)
router.get('/saga/:saga', filmController.getFilmBySaga)
router.get('/filter/:name&:note&:genre&:realisateur&:annee', filmController.getFilmByFilter)
router.post('/', multer, filmController.createFilm)
router.delete('/delete/:id', filmController.deleteFilm)
router.put('/majnote/:id', filmController.majNoteFilm)
router.put('/majfilmsaga/:id', filmController.majSagaFilm)
router.put('/:id', filmController.majGenre)
router.put('/fanart/:id', multer, filmController.addFanart)
router.put('/logo/:id', multer, filmController.addLogo)
router.put('/majPoster/:id', filmController.majPoster)
router.put('/addFanart/:id', filmController.addFanart)
router.put('/removeFanart/:id', filmController.removeFanart)
router.put('/majLogo/:id', filmController.majLogo)

module.exports = router