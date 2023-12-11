const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const sagaController = require('../controllers/sagas');

router.post('/', multer, sagaController.createSaga);
router.get('/', sagaController.getAllSagas);
router.get('/:id', sagaController.getOneSaga);
router.get('/title/:title', sagaController.getSagaByTitle);
router.put('/majSagaAdd/:title', sagaController.majSagaAdd);
router.put('/majNote/:title', sagaController.majNoteSaga);
router.put('/majSagaDelete/:title', sagaController.majSagaDelete);
router.put('/unsetNote/:title', sagaController.unsetNoteSaga)

module.exports = router