"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
//import { Database, Resource } from "@adminjs/sequelize";
const AdminJSSequelize = __importStar(require("@adminjs/sequelize"));
const express_2 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const { Database, Resource } = AdminJSSequelize;
adminjs_1.default.registerAdapter({ Database, Resource });
const adminJs = new adminjs_1.default({
    resources: [
        {
            resource: User_1.default,
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
const app = (0, express_2.default)();
const adminRouter = express_1.default.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);
app.listen(3000, () => {
    console.log("AdminJS is running on http://localhost:3000/admin");
});
/*
手动创建项目：
用命令npm install express后根目录下才有了node_modules，
然后package.json里才有了 "dependencies" 或 "devDependencies"

*/
//# sourceMappingURL=admin.js.map