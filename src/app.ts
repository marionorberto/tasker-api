import express, { 
  Express,
  Request,
  Response,
} from 'express';
import myDataSourceConfig  from './config/datasource';
import dotenv from 'dotenv';

dotenv.config();
myDataSourceConfig;


const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;

