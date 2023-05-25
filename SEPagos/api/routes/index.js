const express = require('express')
const router = express.Router();
const path = require("path");
const fs = require('fs')

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/../pages/index.html')); 
})
 

module.exports = router;