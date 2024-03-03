const express = require('express')
const path = require('path')


const router = express.Router()
router.use('/bootstrap',express.static(path.join(__dirname,'../node_modules/bootstrap/dist')))
//router.use('/img',express.static(path.join(__dirname,'')))

module.exports = router