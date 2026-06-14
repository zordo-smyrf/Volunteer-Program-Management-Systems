import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const data = await getProjects();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Проекты
      </h1>

      <ul className="space-y-4">
        {data.items.map((project: any) => (
          <li
            key={project.id}
            className="border p-4 rounded">
            <h2 className="font-semibold">
              {project.title}
            </h2>
            <p>{project.description}</p>
            <h2 className="font-semibold">
             Город: {project.location}
            </h2>
            <h2 className="font-semibold">
              {project.isActive}
            </h2>
            <h2 className="font-semibold">
             Дата: {project.startDate}
            </h2>
          </li>
        ))}
      </ul>
    </main>
  );
}