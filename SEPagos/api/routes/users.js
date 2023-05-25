const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const validCreate = Joi.object({
    username: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    status: Joi.string()
})

router.post('/', async (req, res) => {
    try {
        const { error } = validCreate.validate(req.body)
        if (error) throw new Error(error.details[0].message)

        const { username, password, first_name, last_name, email, status } = req.body;

        const existUsername = await User.findOne({ where: { username } });
        if (existUsername) return res.status(400).json({ error: 'Ya existe un usuario con ese nombre' })

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) return res.status(400).json({ error: 'Ya existe un usuario con ese correo electrónico' })

        const salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hash, first_name, last_name, email, status: status ? status : 'AC' });

        const save = await user.save();

        res.json({ data: "Usuario creado", data: save });
    } catch (error) {
        console.log("🚀 ~ file: users.js ~ line 32 ~ router.post ~ error", error)
        res.status(400).json({ error: error.message })
    }
})

router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });

    res.json(user);
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.destroy({ where: { id } });

    res.json({ data: "Usuario borrado!" });
})

module.exports = router;
