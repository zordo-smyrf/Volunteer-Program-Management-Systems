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