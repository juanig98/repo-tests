import * as express from 'express' 
import { User } from '../models/User.entity';
 

export function getUserRoutes() {
    const router = express.Router()
    router.get('/', getProfile) 
    return router
}


async function getProfile(): Promise<User>{
    return undefined;
}