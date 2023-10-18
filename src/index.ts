import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Database } from "./database/db";
import { routers } from "./routes";
const port = process.env.PORT || 3000;

dotenv.config();
Database.initialize();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);



app.listen(port, () => {
    console.log("🚀🚀🚀 Servidor está  rodando na port",port)
});
