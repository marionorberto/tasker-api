import express, { 
  Express,
} from 'express';
import myDataSourceConfig  from './config/datasource';
import router from './routes/routes';
require('dotenv/config');

class Application {
  app: Express = express();
  
  bootstrap(port: number) {
    const PORT = process.env.PORT || port;

    this.app.listen(PORT, () => console.log(`Server Running 🔥 On Port:${PORT} | http://localhost:3000`));    
    this.appConfig();
  }
  
  appConfig() {
    myDataSourceConfig;
    this.app.use(express.json());
    this.app.use('/api/v1/tasker', router);
  }
}

export default new Application();