import { getProjects } from "@/lib/api";
import Link from "next/link";

export default async function ProjectsPage() {
  const data = await getProjects();
  

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold mb-4">
        Проектыы
      </h1>
      <Link
      href="/projects/new"
      className="bg-green-500 text-white px-4 py-2 rounded">
      + Создать проект
      </Link>
      </div>
      <ul className="space-y-4">
        {data.items.map((project: any) => (
          <Link href={`/projects/${project.id}`}>
  <li
    key={project.id}
    className="border p-4 rounded cursor-pointer hover:bg-gray-50"
  >
    <h2 className="font-semibold">
      {project.title}
    </h2>

    <p>{project.description}</p>
    <p>Город: {project.location}</p>
    <p>Дата: {project.startDate}</p>
  </li>
</Link>
        ))}
      </ul>
    </main>
    
  );
}