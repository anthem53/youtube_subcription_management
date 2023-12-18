const express = require('express')
const { renderMain , renderTest, renderLogin, rend } = require('../controllers/page')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {printd} = require('lee-simple-log')

const router = express.Router()

router.get('/',isNotLoggedIn,renderLogin)

router.get('/main',isLoggedIn ,renderMain)

router.get('/test',renderTest)

module.exports = router