"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProject() {

    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");

    useEffect(() => {

        fetch(`http://localhost:4000/api/projects/${id}`)
            .then(res => res.json())
            .then(project => {

                setTitle(project.title);
                setDescription(project.description);
                setLocation(project.location);
                setStartDate(project.startDate);

            });

    }, []);


    const save = async () => {

        await fetch(
            `http://localhost:4000/api/projects/${id}`,
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

        <main className="p-8">

            <h1 className="text-2xl mb-5">
                Редактировать проект
            </h1>

            <input
                className="border p-2 w-full mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="border p-2 w-full mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                className="border p-2 w-full mb-3"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                className="border p-2 w-full mb-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <button
                onClick={save}
                className="bg-blue-600 px-4 py-2 rounded text-white"
            >
                Сохранить
            </button>

        </main>
    );
}