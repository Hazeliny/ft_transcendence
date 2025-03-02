"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    first_name: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    last_name: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    is_staff: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    is_superuser: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    date_joined: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    last_login: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    image_url: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    location: { type: sequelize_1.DataTypes.STRING, allowNull: true },
}, {
    sequelize: database_1.default,
    modelName: "User",
    tableName: "users",
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=User.js.map