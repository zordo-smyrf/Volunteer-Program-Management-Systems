import { getProject } from "@/lib/api";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);



  return (
    <main className="container-ui">
      <div className="max-w-5xl mx-auto">
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-cyan-400" />

            <h1 className="text-4xl font-bold">
              {project.title}
            </h1>
          </div>

          <p className="text-slate-300 leading-relaxed text-lg">
            {project.description}
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-300">
              👥 Волонтёров: {project.volunteers.length}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Волонтёры проекта
          </h2>
        </div>

        {project.volunteers.length === 0 && (
          <div className="card text-center py-10">
            <p className="text-slate-400">
              Пока никто не присоединился к проекту.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {project.volunteers.map((v: any) => (
            <div
              key={v.id}
              className="card hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {v.fullName}
                  </h3>

                  <p className="text-slate-400">
                    {v.email}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  👤
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}