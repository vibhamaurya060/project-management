import { prisma } from "../server.js";

export const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        createdBy: req.user.id
      },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { createdBy: req.user.id },
      include: { tasks: true }
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;
  try {
    const updated = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, deadline: new Date(deadline) }
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete project" });
  }
};