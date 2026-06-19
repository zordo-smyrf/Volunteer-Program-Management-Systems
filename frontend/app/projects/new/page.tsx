"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { api } from "@/lib/api";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [location, setLocation] =
    useState("");
  const [startDate, setStartDate] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(api.projects),
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          isActive: true,
          startDate,
        }),
      }
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }


  return (
    <main className="container-ui">
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Создание проекта
            </h1>

            <p className="text-slate-400">
              Заполните информацию о новом волонтёрском проекте
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Название проекта
              </label>

              <input
                type="text"
                placeholder="Например: Чистый город"
                value={title}
                required
                className="input"
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Описание
              </label>

              <textarea
                placeholder="Расскажите о проекте..."
                value={description}
                required
                rows={5}
                className="input resize-none"
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Город
                </label>

                <input
                  type="text"
                  placeholder="Варшава"
                  value={location}
                  required
                  className="input"
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Дата начала
                </label>

                <input
                  type="date"
                  value={startDate}
                  required
                  className="input"
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />
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
                  : "Создать проект"}
              </button>

              <BackButton />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}