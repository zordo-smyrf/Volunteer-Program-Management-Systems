"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      await fetch(
        "http://localhost:4000/api/projects",
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
      );

      router.push("/projects");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Создание проекта
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
      >
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Город"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Создание..."
            : "Создать"}
        </button>
      </form>
    </main>
  );
}