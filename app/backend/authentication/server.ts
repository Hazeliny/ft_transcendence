import express from "express";
import sequelize from "./config/database";
//import authRoutes from "./routes/auth";
import adminRouter from "./admin/admin"; // 引入 AdminJS

const app = express();
app.use(express.json()); // 解析 JSON 请求体
//app.use("/auth", authRoutes); // 挂载认证路由
app.use("/admin", adminRouter); // 挂载 AdminJS

// 连接数据库并启动服务器
const startServer = async () => {
  await sequelize.sync(); // 自动创建数据库表
  console.log("📦 数据库已同步");

  app.listen(3000, () => {
    console.log("🚀 服务器运行在 http://localhost:3000");
  });
};

startServer();
