import { Sequelize } from "sequelize";
import path from "path";

//const sequelize = new Sequelize("database", "username", "password", {
const sequelize = new Sequelize({
//    host: "localhost",
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../../database/database.sqlite"),
//    logging: console.log,
});

export default sequelize;
