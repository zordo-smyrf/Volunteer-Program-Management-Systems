"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

    // 💥 ПРОВЕРКИ
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

      if (!res.ok) {
        throw new Error("Ошибка создания волонтёра");
      }

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
        Создание волонтёра
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
      >
        <input
          className="border p-2 w-full"
          placeholder="ФИО"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Возраст"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          className="border p-2 w-full"
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
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
    </main>
  );
}