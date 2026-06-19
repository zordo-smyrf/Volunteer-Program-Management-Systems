"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await fetch("http://localhost:4000/api/projects");
    const data = await res.json();
    setProjects(data.items);
  };

  const deleteProject = async (id: string) => {
    await fetch(`http://localhost:4000/api/projects/${id}`, {
      method: "DELETE",
    });

    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <main className="p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Проекты
        </h1>

        <Link
          href="/projects/new"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          + Создать проект
        </Link>

      </div>

      {projects.map((project) => (

        <div
          key={project.id}
          className="border p-4 rounded mb-4"
        >

          <h2 className="font-bold">
            {project.title}
          </h2>

          <p>{project.description}</p>
          <p>Город: {project.location}</p>
          <p>Дата: {project.startDate}</p>

          <div className="flex gap-3 mt-3">

            <Link
              href={`/projects/${project.id}`}
              className="bg-green-600 px-3 py-1 rounded text-white"
            >
              Подробнее
            </Link>

            <Link
              href={`/projects/${project.id}/edit`}
              className="bg-blue-600 px-3 py-1 rounded text-white"
            >
              Редактировать
            </Link>

            <button
              onClick={() => deleteProject(project.id)}
              className="bg-red-600 px-3 py-1 rounded text-white"
            >
              Удалить
            </button>

          </div>

        </div>

      ))}
    </main>
  );
}