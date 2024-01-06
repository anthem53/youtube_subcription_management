const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const User = require('../models/user');
const router = express.Router()

router.post("/update/inactiveTime", async (req,res)=>{
    let newValue =  req.body.newValue   
    let user = await User.findOne({where:{id:req.user.id}})
    console.log(">>>>>>> User: ",user)

    User.update({
        inactiveTime:newValue
    },{
        where:{ id : req.user.id}
    })

    res.json({
        status:200,
        message:"inactive update Complete"
    })

})


module.exports= router