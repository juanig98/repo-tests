import * as express from 'express';
import { getOriginsRoutes } from './origins.router';
import { getExpensesRoutes } from './expenses.router';
import { getBalancesRoutes } from './balances.router';
import { getUserRoutes } from './user.router';
import { getAuthRoutes } from './auth.router';


export function getRoutes() {
    // create a router for all the routes of our app
    const router = express.Router()

    router.use('/origins', getOriginsRoutes())
    router.use('/balances', getBalancesRoutes())
    router.use('/expenses', getExpensesRoutes())
    router.use('/user', getUserRoutes())
    router.use('/auth', getAuthRoutes())
    // any additional routes would go here

    return router
}
