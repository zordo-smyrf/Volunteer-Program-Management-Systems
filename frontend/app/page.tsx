import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Система управления волонтерскими проектами
      </h1>
      <div className="flex gap-4">
        <Link href="/projects" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          Проекты
        </Link>
        <Link href="/volunteers" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer">
          Волонтеры
        </Link>
      </div>
    </main>
  );
}