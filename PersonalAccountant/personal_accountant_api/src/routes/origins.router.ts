import * as express from 'express'
import { Origin } from '../models/Origin.entity'
import { dataSourceConnection } from '../config/data-source'

export function getOriginsRoutes() {
    const router = express.Router()
    router.get('/', getAll)
    return router
}

async function getAll(req, res) {



    // dataSourceConnection.initialize().then(()>)

    // const originRepo = await dataSourceConnection.manager.find(Origin);


    // const origins = await originRepo.find();
  
    const origins = await dataSourceConnection.manager.find(Origin);
 


 
    return res.send(origins)
}
