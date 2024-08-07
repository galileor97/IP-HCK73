const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const errorHandler = require('../middleware/errorHandler')
const PredictionController = require('../controllers/PredictionController')
const isAuthenticate = require('../middleware/isAuthenticate')

router.post('/login', UserController.login)
router.post('/register', UserController.register)


router.post('/predict', isAuthenticate, PredictionController.createPrediction)
// router.post()
router.use(errorHandler)

module.exports = router;