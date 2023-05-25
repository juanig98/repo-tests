import * as express from 'express' 
import { TransactionController } from '../controllers/transaction.controller';
 

export function getExpensesRoutes() {
    const router = express.Router()
    router.get('/', getAll)
    router.get('/daily', getAll)
    router.get('/fixed', getAll)
    router.get('/extraordinary', getAll)
    return router
}

async function getAll(req, res) {
    
    

    const transactionController = new TransactionController();

    const response = await transactionController.getExpenses();

    return res.send(response)
}