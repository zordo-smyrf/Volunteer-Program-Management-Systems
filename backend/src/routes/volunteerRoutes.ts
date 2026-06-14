import { Router } from "express";
import { volunteers } from "../store/data";

const router = Router();

router.get("/", (req, res) => {
  res.json(volunteers);
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