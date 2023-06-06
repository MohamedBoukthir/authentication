const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require ('bcrypt')
const {User} = require('../models/user')



router.post('/' , async (req , res ) => {
    try {
        const {error} = validate(req.body)
        if(error)
            return res.status(400).send({message : error.details[0].message})

        const user = await User.findOne({email : req.body.email})
        if (!user)
            return res.status(401).send({message : 'Invalid Email Or Password'})

        const validPassword = await bcrypt.compare(
            req.body.password , user.password
        );

        if(!validPassword)
            return res.status(401).send({message : 'Invalid Email Or Password'})

        const token = user.generateAuthToken();
        res.status(200).send({message : 'Logged In Successfully'})
    } catch (error) {
        res.status(500).send({message : 'Error'})        
    }
});


const validate = (data) => {
    const schema = Joi.object ({
        email :joi.string().email().required().label('Email'),
        password : joi.string().required().label('Password') 
    });
    return schema.validate(data)
};


module.exports = router