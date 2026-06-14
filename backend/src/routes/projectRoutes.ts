import { Router } from "express";
import { projects } from "../store/data";

const router = Router();

router.get("/", (req, res) => {
  res.json(projects);
});

router.get("/:id", (req, res) => {
  const project = projects.find(
    (p) => p.id === req.params.id
  );

  if (!project) {
    return res.status(404).json({
      error: "Такого проекта не существует",
    });
  }

  res.json(project);
});

export default router;

router.post("/", (req, res) => {
  const { title, description, location, isActive, startDate } = req.body;

  if (!title || !description || !location || !startDate) {
    return res.status(400).json({
      error: "Необходимо заполнить все обязательные поля",
    });
  }

  const newProject = {
    id: crypto.randomUUID(),
    title,
    description,
    location,
    isActive,
    startDate,
  };

  projects.push(newProject);

  res.status(201).json(newProject);
});

router.patch("/:id", (req, res) => {
  const project = projects.find(
    (p) => p.id === req.params.id
  );

  if (!project) {
    return res.status(404).json({
      error: "Проект не найден",
    });
  }

  Object.assign(project, req.body);

  res.json(project);
});