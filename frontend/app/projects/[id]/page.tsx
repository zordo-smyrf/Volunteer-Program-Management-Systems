import { getProject } from "@/lib/api";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);



  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      <p>{project.description}</p>
      <h2 className="mt-6 text-xl font-semibold">
        Волонтeры проекта
      </h2>

      <div className="space-y-3 mt-3">
        {project.volunteers.map((v: any) => (
          <div key={v.id} className="border p-3 rounded">
            <p>{v.fullName}</p>
            <p>{v.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}