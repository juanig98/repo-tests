import * as express from 'express'
import { User } from '../models/User.entity';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { UserController } from '../controllers/user.controller';
import { StatusMessageResponse } from '../models/StatusMessageResponse';

export function getAuthRoutes() {
    const router = express.Router()
    router.post('/login', login)
    router.post('/register', register)
    return router
}


async function login(req, res) {

    try {

        const userController = new UserController();
        const user = await userController.getByUsername(req.body.username);


        if (!user) {

            res.send({ code: 400, status: 'Not found', message: "Usuario inválido" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        console.log({ pass: user.password }, { hash });
        const passwordValid = await bcrypt.compare(user.password, hash);

        if (!passwordValid) res.send({ code: 400, status: 'Not found', message: "Contraseña inválida" });

        const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET_KEY);

        return res.send({ token });
    } catch (error) {
        console.error(error);
        throw new Error(error);


    }
}

async function register() {
    return undefined;
}