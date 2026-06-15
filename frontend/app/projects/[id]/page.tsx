import { getProject } from "@/lib/api";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      <p>{project.description}</p>

      <h2 className="mt-6 font-bold">
        Волонтёры
      </h2>

      {project.volunteers?.length ? (
        project.volunteers.map((v: any) => (
          <div key={v.id}>
            {v.fullName}
          </div>
        ))
      ) : (
        <p>Нет волонтёров</p>
      )}
    </main>
  );
}