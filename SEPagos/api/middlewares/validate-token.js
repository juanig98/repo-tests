const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    let token = req.header('Authorization')
    try {
        if (!token) throw new Error('Acceso denegado')
        token = token.substring(7, token.length);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified 
        next()
    } catch (error) { res.status(400).json({ error: error.message }) }
}

module.exports = verifyToken;