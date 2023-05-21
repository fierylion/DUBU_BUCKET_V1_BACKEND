const express = require('express')
const router = express.Router()
const {postUserToBucket, getAllUsersVcard} = require('../controllers/bucket')

//Controllers

//Routes
router.route('/').post(postUserToBucket)
router.route('/download').get(getAllUsersVcard)

module.exports = router