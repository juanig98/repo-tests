const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');


router.get('/', async (req, res) => {
    const { id, first_name, last_name, username, email } = await User.findOne({ where: { id: req.user.id } })
    const user = { id, first_name, last_name, username, email }
    res.send({ user })
});

module.exports = router;