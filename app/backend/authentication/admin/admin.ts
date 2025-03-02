import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/sequelize";
//import * as AdminJSSequelize from "@adminjs/sequelize";
import express from "express";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";
import User from "../models/User";

//const { Database, Resource } = AdminJSSequelize;

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
    resources: [
        {
            resource: User,
            rootPath: "/admin",
            options: {
                listProperties: [
                    "id",
                    "email",
                    "username",
                    "first_name",
                    "last_name",
                    "is_staff",
                    "is_active",
                    "date_joined",
                    "is_superuser",
                    "last_login",
                    "image_url",
                    "location",
                ],
                filterProperties: ["email", "is_active", "is_superuser"],
                editProperties: ["email", "username", "first_name", "last_name", "image_url", "location"],
                showProperties: [
                    "id",
                    "email",
                    "username",
                    "first_name",
                    "last_name",
                    "is_staff",
                    "is_active",
                    "date_joined",
                    "is_superuser",
                    "last_login",
                    "image_url",
                    "location",
                ],
            },
        },
    ],
});

const app = express();
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
        authenticate: async (email, password) => {
            const user = await User.findOne({ where: { email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            }
            return null;
        },
        cookiePassword: "some-secret-password",
    }
);

export default adminRouter;

/*
app.use(adminJs.options.rootPath, adminRouter);

app.listen(3000, () => {
    console.log("AdminJS is running on http://localhost:3000/admin");
});
*/


/*
手动创建项目：
用命令npm install express后根目录下才有了node_modules，
然后package.json里才有了 "dependencies" 或 "devDependencies"

*/
