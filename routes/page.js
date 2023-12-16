const express = require('express')
const { renderMain } = require('../controllers/page')


const router = express.Router()

router.get('/',renderMain)

router.get('/main', (req,res)=>{
    const test = req.params
    res.render("main",
    {   title: '메인페이지 - YSM', 
        'channels': {}
    })
})

router.get('/test',(req,res)=>{
    res.render('test',{title: '테스트 페이지 - YSM'})
})

module.exports = router