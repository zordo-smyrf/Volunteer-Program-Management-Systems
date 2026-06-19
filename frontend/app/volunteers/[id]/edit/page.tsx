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
        <main className="container-ui">
            <div className="max-w-3xl mx-auto">
                <div className="card">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">
                            Редактирование волонтёра
                        </h1>

                        <p className="text-slate-400">
                            Обновите информацию об участнике
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                ФИО
                            </label>

                            <input
                                className="input"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-slate-300">
                                Возраст
                            </label>

                            <input
                                type="number"
                                className="input"
                                value={age}
                                onChange={(e) =>
                                    setAge(Number(e.target.value))
                                }
                            />
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