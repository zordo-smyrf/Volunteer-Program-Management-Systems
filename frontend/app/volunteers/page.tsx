import { getVolunteers } from "@/lib/api";

export default async function VolunteersPage() {
  const data = await getVolunteers();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Волонтеры
      </h1>

      <ul className="space-y-4">
        {data.items.map((volunteer: any) => (
          <li
            key={volunteer.id}
            className="border p-4 rounded"
          >
            <h2 className="font-semibold">
              {volunteer.fullName}
            </h2>

            <p>Email: {volunteer.email}</p>

            <p>Возраст: {volunteer.age}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}