import { prisma } from "../server.js";


export const createTask = async (req, res) => {
  const { title, description, status, assignedTo, projectId, dueDate } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        assignedTo,
        projectId,
        dueDate: new Date(dueDate)
      },
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ include: { comments: true, attachments: true } });
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;
  try {
    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status, dueDate: new Date(dueDate) },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
