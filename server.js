import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth.Routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";


const app = express();
dotenv.config();
export const prisma = new PrismaClient();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => res.send("Project Management API Running"));

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));