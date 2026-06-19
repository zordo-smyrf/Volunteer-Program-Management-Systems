"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="
        px-5 py-3
        rounded-xl
        border border-white/10
        bg-white/5
        hover:bg-white/10
        text-white
        transition
        cursor-pointer
      "
        >
            ← Назад
        </button>
    );
}