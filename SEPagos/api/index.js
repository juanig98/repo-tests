const express = require('express');
const sequelize = require('sequelize');
const User = require('./models/User');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profileRoute = require('./routes/profile');
const indexRoute = require('./routes/index');
const restorePasswordRoute = require('./routes/restore-password');
const cors = require('cors')
const bodyParser = require('body-parser');
const verifyToken = require('./middlewares/validate-token');
const corsOptions = require('./config/cors');
const isActive = require('./middlewares/user-active');
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.use('/users', verifyToken, isActive, userRoutes);
app.use('/profile', verifyToken, isActive, profileRoute);
app.use('/auth', authRoutes);
app.use('/restore-password', restorePasswordRoute);

app.use('/', indexRoute)


app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
})