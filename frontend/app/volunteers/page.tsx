"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  useEffect(() => {
    fetch(api.volunteers)
      .then((res) => res.json())
      .then((data) => setVolunteers(data.items));
    fetch(api.volunteers)
      .then((res) => res.json())
      .then((data) => setProjects(data.items));
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        fetch(api.volunteers)
          .then((res) => res.json())
          .then((data) => setVolunteers(data.items));
        return;
      }
      fetch(`${api}/api/volunteers/${search}`)
        .then((res) => res.json())
        .then((data) => setVolunteers(data));
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);
  const filteredVolunteers =
    selectedProject === ""
      ? volunteers
      : volunteers.filter(
        (v) => v.projectId === selectedProject
      );
  const deleteVolunteer = async (id: string) => {

    await fetch(`${api}/api/projects/${id}`,
      {
        method: "DELETE"
      }
    );

    setVolunteers(
      volunteers.filter(v => v.id !== id)
    );
  };


  return (
    <main className="container-ui">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Волонтёры
          </h1>

          <p className="text-slate-400">
            Управление участниками программы
          </p>
        </div>

        <Link
          href="/volunteers/new"
          className="btn"
        >
          + Добавить волонтёра
        </Link>
      </div>

      <div className="card mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Поиск по имени..."
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input cursor-pointer"
            value={selectedProject}
            onChange={(e) =>
              setSelectedProject(e.target.value)
            }
          >
            <option value="">
              Все проекты
            </option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredVolunteers.length === 0 && (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-2">
            Волонтёры не найдены
          </h2>

          <p className="text-slate-400">
            Попробуйте изменить фильтр или добавить нового волонтёра.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {filteredVolunteers.map((v) => (
          <div
            key={v.id}
            className="card hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold mb-1">
                  {v.fullName}
                </h2>

                <p className="text-slate-400">
                  {v.email}
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                {v.age} лет
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/volunteers/${v.id}/edit`}
                  className="btn"
                >
                  Редактировать
                </Link>

                <button
                  onClick={() => deleteVolunteer(v.id)}
                  className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition"
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