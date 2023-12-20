const express = require('express')
const { renderMain , renderTest, renderLogin, renderSubscription } = require('../controllers/page')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {printd} = require('lee-simple-log')

const router = express.Router()

router.get('/',isNotLoggedIn,renderLogin)

router.get('/main',isLoggedIn ,renderMain)

router.get('/test',renderTest)

router.get('/subs',isLoggedIn,renderSubscription)

module.exports = router