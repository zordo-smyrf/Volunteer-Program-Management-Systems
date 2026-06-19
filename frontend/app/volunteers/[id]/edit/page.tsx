"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditVolunteer() {

    const { id } = useParams();
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);


    useEffect(() => {

        fetch(`http://localhost:4000/api/volunteers/${id}`)
            .then(res => res.json())
            .then(v => {

                setFullName(v.fullName);
                setEmail(v.email);
                setAge(v.age);

            });

    }, []);


    const save = async () => {

        await fetch(

            `http://localhost:4000/api/volunteers/${id}`,

            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    fullName,
                    email,
                    age

                })

            }

        );

        router.push("/volunteers");

    };


    return (

        <main className="p-8">

            <h1 className="text-2xl mb-5">

                Редактировать волонтёра

            </h1>

            <input
                className="border p-2 w-full mb-3"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <input
                className="border p-2 w-full mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="number"
                className="border p-2 w-full mb-3"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
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