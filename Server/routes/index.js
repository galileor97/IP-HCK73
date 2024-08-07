const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const errorHandler = require('../middleware/errorHandler')

router.post('/login', UserController.login)
router.post('/register', UserController.register)



router.use(errorHandler)

module.exports = router;