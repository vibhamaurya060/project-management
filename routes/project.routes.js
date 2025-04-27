import express from "express";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.js";
const projectRouter = express.Router();

projectRouter.use(protect);
projectRouter.post("/", createProject);
projectRouter.get("/", getProjects);
projectRouter.put("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);
export default projectRouter;