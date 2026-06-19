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
    <main className="container-ui">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Проекты
          </h1>

          <p className="text-slate-400">
            Управление волонтерскими проектами
          </p>
        </div>

        <Link
          href="/projects/new"
          className="btn"
        >
          + Создать проект
        </Link>
      </div>

      {projects.length === 0 && (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-2">
            Пока нет проектов
          </h2>

          <p className="text-slate-400 mb-5">
            Создайте первый проект для начала работы.
          </p>

          <Link
            href="/projects/new"
            className="btn"
          >
            Создать проект
          </Link>
        </div>
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />

                  <h2 className="text-2xl font-bold">
                    {project.title}
                  </h2>
                </div>

                <p className="text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                    📍 {project.location}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                    📅 {project.startDate}
                  </span>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[170px]">
                <Link
                  href={`/projects/${project.id}`}
                  className="btn text-center"
                >
                  Подробнее
                </Link>

                <Link
                  href={`/projects/${project.id}/edit`}
                  className="px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-center font-medium transition"
                >
                  Изменить
                </Link>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-medium transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}