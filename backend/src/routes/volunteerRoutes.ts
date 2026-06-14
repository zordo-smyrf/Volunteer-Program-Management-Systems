import { Router } from "express";
import { volunteers } from "../store/data";

const router = Router();

router.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const items = volunteers.slice(
    startIndex,
    endIndex
  );

  res.json({
    items,
    total: volunteers.length,
    page,
    pages: Math.ceil(volunteers.length / limit),
  });
});

export default router;

router.get("/:id", (req, res) => {
  const volunteer = volunteers.find(
    (v) => v.id === req.params.id
  );

  if (!volunteer) {
    return res.status(404).json({
      error: "Волонтер не найден",
    });
  }

  res.json(volunteer);
});


router.post("/", (req, res) => {
  const {
    fullName,
    email,
    age,
    projectId,
  } = req.body;

  if (!fullName || !email || !age || !projectId) {
    return res.status(400).json({
      error: "Необходимо заполнить все обязательные поля.",
    });
  }

  const newVolunteer = {
    id: crypto.randomUUID(),
    fullName,
    email,
    age,
    projectId,
  };

  volunteers.push(newVolunteer);

  res.status(201).json(newVolunteer);
});


router.patch("/:id", (req, res) => {
  const volunteer = volunteers.find(
    (v) => v.id === req.params.id
  );

  if (!volunteer) {
    return res.status(404).json({
      error: "Volunteer not found",
    });
  }

  Object.assign(volunteer, req.body);

  res.json(volunteer);
});


router.delete("/:id", (req, res) => {
  const index = volunteers.findIndex(
    (v) => v.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Volunteer not found",
    });
  }

  volunteers.splice(index, 1);

  res.status(204).send();
});