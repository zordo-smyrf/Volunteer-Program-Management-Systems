import { Router } from "express";
import { projects, volunteers } from "../store/data";
import { projectSchema } from "../validators/projectValidator";

const router = Router();

router.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const items = projects.slice(
    startIndex,
    endIndex
  );

  res.json({
    items,
    total: projects.length,
    page,
    pages: Math.ceil(projects.length / limit),
  });
});

router.get("/:id", (req, res) => {
  const project = projects.find(
    (p) => p.id === req.params.id
  );

  if (!project) {
    return res.status(404).json({
      error: "Проект не найден",
    });
  }

  const projectVolunteers = volunteers.filter(
    (v) => v.projectId === project.id
  );

  res.json({
    ...project,
    volunteers: projectVolunteers,
  });
});

export default router;


router.post("/", (req, res) => {
  const validation = projectSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(422).json({
      error: validation.error.issues,
    });
  }

  const newProject = {
    id: crypto.randomUUID(),
    ...validation.data,
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


router.delete("/:id", (req, res) => {
  const index = projects.findIndex(
    (p) => p.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Проект не найден",
    });
  }

  projects.splice(index, 1);

  res.status(204).send();
});