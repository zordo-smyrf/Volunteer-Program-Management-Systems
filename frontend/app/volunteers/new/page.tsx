"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function NewVolunteerPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState<
    { id: string; title: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.items || []);
      })
      .catch(() => {
        setError("Ошибка загрузки проектов");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !age) {
      setError("Заполни все поля");
      return;
    }
    if (!projectId) {
      setError("Выбери проект");
      return;
    }
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:4000/api/volunteers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim(),
            age: Number(age),
            projectId: projectId.trim(),
          }),
        }
      );
      router.push("/volunteers");
    } catch (err) {
      setError("Не удалось создать волонтёра");
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Создание волонтeра
      </h1>
      {error && (
        <div className="mb-4 rounded bg-red-500/20 border border-red-500 p-3 text-red-400">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md">

        <input
          className="border p-2 w-full" placeholder="ФИО" value={fullName} required
          onChange={(e) => setFullName(e.target.value)} />

        <input
          className="border p-2 w-full" placeholder="Email" value={email} required
          onChange={(e) => setEmail(e.target.value)} />

        <input
          className="border p-2 w-full" type="number" placeholder="Возраст" value={age} required
          onChange={(e) => setAge(e.target.value)} />

        <select
          className="w-full border border-gray-600 bg-zinc-900 text-white p-3" value={projectId} required
          onChange={(e) => setProjectId(e.target.value)}>

          <option value=""> Выберите проект </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}> {p.title}</option>
          ))}
        </select>
        <BackButton />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          {"Создать"}
        </button>
      </form>
    </main>
  );
}