import { DataSource } from "typeorm";
require('dotenv/config');


const myDataSourceConfig = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:[`${__dirname}/../entities/**.entity{.ts,.js}`],
    logging: true,
    synchronize: true,
});


myDataSourceConfig
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
});

export default myDataSourceConfig;