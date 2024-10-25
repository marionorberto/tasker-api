"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var myDataSourceConfig = new typeorm_1.DataSource({
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
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
exports.default = myDataSourceConfig;
