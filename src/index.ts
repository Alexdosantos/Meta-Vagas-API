import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Database } from "./database/db";
import { routers } from "./routes";

dotenv.config();
Database.initialize();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("🚀🚀🚀 Servidor está  rodando na port",port)
});
