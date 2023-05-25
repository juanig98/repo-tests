// restore-password

const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
require('dotenv').config()

const validRestore = Joi.object({
    email: Joi.string().required().email()
})

router.post('', async (req, res) => {
    try {
        const { email } = req.body; 

        const user = await User.findOne({ where: { email } }) 

        if(!user) throw new Error("No existe usuario con el correo electrónico ingresado")

        // Enviar el mail

        res.send({ message: "Hemos enviado un link a tu correo electrónico para que puedas reiniciar tu clave" })
    } catch (error) { res.status(400).json({ error: error.message }) }
})


module.exports = router