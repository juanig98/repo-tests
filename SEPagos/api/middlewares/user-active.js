const User = require("../models/User");

// middleware to validate token (rutas protegidas)
const isActive = async (req, res, next) => {
    try { 
        const id = req.user.id;
        console.log("🚀 ~ file: user-active.js ~ line 7 ~ isActive ~ req.user.id", req.user.id)
        const user = await User.findOne({ where: { id } })  

        if (user.status != 'AC') throw new Error('Acceso denegado')

        next()
    } catch (error) { res.status(400).json({ error: error.message }) }
}

module.exports = isActive;