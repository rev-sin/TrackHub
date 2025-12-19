"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const createBoard = useMutation(api.boards.createBoard);
  const router = useRouter();

  const handleCreate = async () => {
    const { code } = await createBoard();
    router.push(`/b/${code}`);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>TrackHub Kanban</h1>
      <button onClick={handleCreate} style={{ marginTop: 20 }}>
        Create Board
      </button>
    </main>
  );
}
