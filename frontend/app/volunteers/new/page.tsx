"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { api } from "@/lib/api";

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
    fetch(api.volunteers)
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

      const res = await fetch(api.volunteers,
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
    <main className="container-ui">
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Создание волонтёра
            </h1>

            <p className="text-slate-400">
              Добавьте нового участника в систему
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                ФИО
              </label>

              <input
                className="input"
                placeholder="Иван Иванов"
                value={fullName}
                required
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Email
              </label>

              <input
                className="input"
                type="email"
                placeholder="mail@example.com"
                value={email}
                required
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Возраст
                </label>

                <input
                  className="input"
                  type="number"
                  placeholder="25"
                  value={age}
                  required
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Проект
                </label>

                <select
                  className="input cursor-pointer"
                  value={projectId}
                  required
                  onChange={(e) =>
                    setProjectId(e.target.value)
                  }
                >
                  <option value="">
                    Выберите проект
                  </option>

                  {projects.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                    >
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn disabled:opacity-50"
              >
                {loading
                  ? "Создание..."
                  : "Создать волонтёра"}
              </button>

              <BackButton />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}