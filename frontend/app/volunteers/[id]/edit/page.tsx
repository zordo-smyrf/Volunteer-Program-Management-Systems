"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditVolunteerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // загрузка волонтёра
    fetch(`http://localhost:4000/api/volunteers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.fullName);
        setEmail(data.email);
        setAge(data.age);
        setProjectId(data.projectId);
      });

    // загрузка проектов
    fetch("http://localhost:4000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.items));
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`http://localhost:4000/api/volunteers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        age: Number(age),
        projectId,
      }),
    });

    router.push("/volunteers");
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Редактирование волонтёра
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="ФИО"
        />

        <input
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="border p-2 w-full rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Возраст"
        />

        <select
          className="border p-2 w-full rounded"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Выберите проект</option>

          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Сохранить
        </button>
      </form>
    </main>
  );
}