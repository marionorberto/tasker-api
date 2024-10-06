import { DataSource } from "typeorm";

const myDataSourceConfig = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "marionorberto",
    password: "cavera?@mau",
    database: "tasker",
    entities: ["../entities/*.entity{*.ts,*.js}"],
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