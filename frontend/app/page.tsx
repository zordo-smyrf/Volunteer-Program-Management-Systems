import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container-ui">
      <div className="card">
        <h1 className="text-5xl font-bold mb-4">
          Volunteer Program Management
        </h1>

        <p className="text-slate-400 text-lg mb-8 max-w-2xl">
          Управляйте волонтерами и проектами.
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/projects"
            className="btn"
          >
            Проекты
          </Link>

          <Link
            href="/volunteers"
            className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold transition"
          >
            Волонтеры
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-2">
            Проекты
          </h3>

          <p className="text-slate-400">
            Создание и управление волонтерскими инициативами.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-2">
            Волонтеры
          </h3>

          <p className="text-slate-400">
            Учет участников и распределение по проектам.
          </p>
        </div>
      </div>
    </main>
  );
}