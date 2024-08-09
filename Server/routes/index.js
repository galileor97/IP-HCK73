const express = require('express')
const router = express.Router()
const cors = require('cors')


const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const PredictionController = require('../controllers/PredictionController')
const ImageController = require('../controllers/ImageController');
const UserController = require('../controllers/UserController')
const isAuthenticate = require('../middleware/isAuthenticate')
const errorHandler = require('../middleware/errorHandler');
const { isAuthorized } = require('../middleware/isAuthorized');


router.use(cors())

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/auth/google',UserController.googleAuth)


router.get('/user',isAuthenticate, UserController.getUserById)
router.put('/user/profile-photo', isAuthenticate, UserController.editPhoto)

router.post('/predict', isAuthenticate, upload.fields([
    { name: 'base_image', maxCount: 1 },
    { name: 'style_image', maxCount: 1 },
    { name: 'identity_image', maxCount: 1 },
    { name: 'composition_image', maxCount: 1 },
]), PredictionController.createPrediction)
// router.post('/generate', isAuthenticate, PredictionController.generateImage)

// router.post('/predict', isAuthenticate, upload.array('files', 4), PredictionController.createPrediction)

router.get('/images', isAuthenticate, ImageController.getAllImage)
router.get('/images/:id', isAuthenticate, ImageController.findImageByPk)
router.delete('/images/:id', isAuthenticate, isAuthorized, ImageController.deleteImage)

router.use(errorHandler)

module.exports = router;