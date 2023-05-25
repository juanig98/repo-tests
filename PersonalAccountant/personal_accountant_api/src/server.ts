import * as dotenv from 'dotenv';
dotenv.config()
import * as express from 'express';
import * as cors from "cors";
import { dataSourceConnection } from './config/data-source';
import { getRoutes } from './routes/routes';

const app = express();
const port = process.env.PORT;


dataSourceConnection.initialize()
    .then(() => { console.log("Data Source has been initialized!") })
    .catch(err => console.log(`Ocurrió un error al intentar conectarse a la base de datos\nError: ${err}`));


app.use(express.json())
app.use(cors())

app.use('/api', getRoutes())

app.get('/', (req, res) => {
    res.send('Server found!');
}) 

app.listen(port || 3000, () => {
    console.log(`The application is listening on port ${port}!`);
})

export { dataSourceConnection }