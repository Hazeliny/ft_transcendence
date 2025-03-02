import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;
    public first_name!: string;
    public last_name!: string;
    public is_staff!: boolean;
    public is_active!: boolean;
    public is_superuser!: boolean;
    public date_joined!: Date;
    public last_login!: Date;
    public image_url!: string;
    public location!: string;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: true },
        last_name: { type: DataTypes.STRING, allowNull: true },
        is_staff: { type: DataTypes.BOOLEAN, defaultValue: false },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
        is_superuser: { type: DataTypes.BOOLEAN, defaultValue: false },
        date_joined: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        last_login: { type: DataTypes.DATE, allowNull: true },
        image_url: { type: DataTypes.STRING, allowNull: true },
        location: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
    }
);

export default User;
