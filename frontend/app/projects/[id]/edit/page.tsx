"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function EditProject() {

    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");

    useEffect(() => {

        fetch(api.projects)
            .then(res => res.json())
            .then(project => {

                setTitle(project.title);
                setDescription(project.description);
                setLocation(project.location);
                setStartDate(project.startDate);

            });

    }, []);


    const save = async () => {

        await fetch(`${api}/api/projects/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title,
                    description,
                    location,
                    startDate
                })

            }
        );

        router.push("/projects");

    };


    return (
        <main className="container-ui">
            <div className="max-w-3xl mx-auto">
                <div className="card">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">
                            Редактирование проекта
                        </h1>

                        <p className="text-slate-400">
                            Измените данные проекта и сохраните изменения
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Название проекта
                            </label>

                            <input
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Описание
                            </label>

                            <textarea
                                rows={5}
                                className="input resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 text-sm text-slate-300">
                                    Город
                                </label>

                                <input
                                    className="input"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-slate-300">
                                    Дата начала
                                </label>

                                <input
                                    type="date"
                                    className="input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={save}
                                className="btn"
                            >
                                Сохранить изменения
                            </button>

                            <button
                                onClick={() => router.back()}
                                className="secondary-btn"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}