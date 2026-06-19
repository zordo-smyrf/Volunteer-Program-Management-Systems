import { Project } from "../types/project.js";
import { Volunteer } from "../types/volunteer.js";
import crypto from "crypto";

const project1Id = crypto.randomUUID();
const project2Id = crypto.randomUUID();
const project3Id = crypto.randomUUID();
const project4Id = crypto.randomUUID();
const project5Id = crypto.randomUUID();

export const projects: Project[] = [
  {
    id: project1Id,
    title: "Экологическая акция",
    description: "Уборка городского парка",
    location: "Москва",
    isActive: true,
    startDate: "2025-05-10",
  },
  {
    id: project2Id,
    title: "Помощь приюту",
    description: "Уход за животными",
    location: "Санкт-Петербург",
    isActive: true,
    startDate: "2025-06-15",
  },
  {
    id: project3Id,
    title: "День донора",
    description: "Организация донорской акции",
    location: "Казань",
    isActive: false,
    startDate: "2025-04-20",
  },
  {
    id: project4Id,
    title: "Лес Победы",
    description: "Посадка деревьев",
    location: "Новосибирск",
    isActive: true,
    startDate: "2025-07-01",
  },
  {
    id: project5Id,
    title: "Помощь ветеранам",
    description: "Социальная поддержка ветеранов",
    location: "Екатеринбург",
    isActive: false,
    startDate: "2025-03-12",
  },
];

export const volunteers: Volunteer[] = [
  {
    id: crypto.randomUUID(),
    fullName: "Илья Холибаев",
    email: "IlyaXolibaev@gmail.ru",
    age: 21,
    projectId: project1Id,
  },
  {
    id: crypto.randomUUID(),
    fullName: "Савелий Протасов",
    email: "SavelyiProtasov@gmail.ru",
    age: 23,
    projectId: project2Id,
  },
  {
    id: crypto.randomUUID(),
    fullName: "Станислав Синицкий",
    email: "StanislavSinickiy@gmail.ru",
    age: 19,
    projectId: project3Id,
  },
  {
    id: crypto.randomUUID(),
    fullName: "Ризван Мацкеевич",
    email: "RizvanMackeevich@gmail.ru",
    age: 25,
    projectId: project4Id,
  },
  {
    id: crypto.randomUUID(),
    fullName: "Данил Штелле",
    email: "DabilShtelle@gmail.ru",
    age: 22,
    projectId: project5Id,
  },
];