const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isActive = require('../middlewares/user-active');
const verifyToken = require('../middlewares/validate-token');
require('dotenv').config()

const validRegister = Joi.object({
    username: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

const validLogin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/register', async (req, res) => {
    try {
        const { error } = validRegister.validate(req.body)
        if (error) throw new Error(error.details[0].message)

        const { username, password, first_name, last_name, email } = req.body;

        const existUsername = await User.findOne({ where: { username } });
        if (existUsername) return res.status(400).json({ error: 'Ya existe un usuario con ese nombre' })

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico' })

        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hash, first_name, last_name, email, status: 'AC' });

        const save = await user.save();

        res.json({ data: "Su usuario ha sido creado", data: save });
    } catch (error) { res.status(400).json({ error: error.message }) }
})


router.post('/login', async (req, res) => {
    try {
        const { error } = validLogin.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const { username, password } = req.body;
        console.log("🚀 ~ file: auth.js ~ line 49 ~ router.post ~ username, password ", username, password)

        const user = await User.findOne({ where: { username } });
        if (!user) throw new Error('Usuario no encontrado');
        if (user.status != 'AC') throw new Error('Acceso denegado');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Contraseña incorrecta');

        const token = jwt.sign({  id: user.id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '180m' })
 
        res.header('auth-token', token).json({ token }) 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/validate', verifyToken, isActive, async (req, res) => {
    res.send({ "data": "authenticated" })
});

module.exports = router;