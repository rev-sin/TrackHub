"use client";

import { Button } from "components/ui/button";
import { createBoard } from "lib/boards";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const router = useRouter();

  async function handleCreate() {
    const newCode = await createBoard();
    router.push(`/b/${newCode}`);
  }

  return (
    <Button
      className="w-full bg-[var(--dynamic-primary)] hover:opacity-90 text-white border-none h-11 text-md"
      onClick={handleCreate}
    >
      Create New Board
    </Button>
  );
}