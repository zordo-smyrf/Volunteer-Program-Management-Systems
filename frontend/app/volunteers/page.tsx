"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/api/volunteers")
      .then((res) => res.json())
      .then((data) => setVolunteers(data.items));
    fetch("http://localhost:4000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.items));
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        fetch("http://localhost:4000/api/volunteers")
          .then((res) => res.json())
          .then((data) => setVolunteers(data.items));
        return;
      }
      fetch(
        `http://localhost:4000/api/volunteers/search?q=${search}`
      )
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



  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Волонтeры
        </h1>
        <Link
          href="/volunteers/new" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          + Добавить
        </Link>
      </div>

      <input
        type="text" placeholder="Поиск по имени..." className="border p-2 rounded w-full mb-4" value={search}
        onChange={(e) => setSearch(e.target.value)} />

      <select
        className="w-full border border-gray-600 bg-zinc-900 text-white p-3 mb-5 cursor-pointer" value={selectedProject}
        onChange={(e) =>
          setSelectedProject(e.target.value)}>

        <option value=""> Все проекты </option>

        {projects.map((project) => (
          <option
            key={project.id}
            value={project.id}>
            {project.title}
          </option>
        ))}
      </select>

      <div className="space-y-3">
        {filteredVolunteers.map((v) => (
          <div key={v.id} className="border p-3 rounded">
            <p className="font-semibold">{v.fullName}</p>
            <p>{v.email}</p>
            <p>Возраст: {v.age}</p>
          </div>
        ))}
      </div>
    </main>
  );
}