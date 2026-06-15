"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/volunteers")
      .then((res) => res.json())
      .then((data) => setVolunteers(data.items));
  }, []);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Волонтёры
        </h1>

        <Link
          href="/volunteers/new"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Добавить
        </Link>
      </div>

      <div className="space-y-3">
        {volunteers.map((v) => (
          <div
            key={v.id}
            className="border p-3 rounded"
          >
            <p className="font-semibold">
              {v.fullName}
            </p>
            <p>{v.email}</p>
            <p>Возраст: {v.age}</p>
          </div>
        ))}
      </div>
    </main>
  );
}