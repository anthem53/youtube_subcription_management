const express = require('express')
const { renderMain , renderTest, renderLogin, renderSubscription } = require('../controllers/page')
const { saveSubscriptChannel}  =require('../controllers/channel')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const router = express.Router()

router.post('/save',saveSubscriptChannel)

module.exports= router