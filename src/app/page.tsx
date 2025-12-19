"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBoard, boardExists } from "lib/boards";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");

  async function handleCreate() {
    const newCode = await createBoard();
    router.push(`/b/${newCode}`);
  }

  async function handleJoin() {
    const normalized = code.toUpperCase();
    if (normalized.length !== 6) return;
    if (await boardExists(normalized)) router.push(`/b/${normalized}`);
    else alert("Board not found");
  }

  return (
    <main className="h-full flex items-center justify-center px-4">
      <Card className="w-full max-w-sm bg-panel border border-border">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-semibold text-fg">TrackHub</h1>
          <p className="text-sm text-muted">Auth-less Kanban</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button className="w-full" onClick={handleCreate}>
            Create board
          </Button>

          <div className="space-y-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ENTER CODE"
              className="tracking-widest text-center uppercase"
            />
            <Button variant="outline" className="w-full" onClick={handleJoin}>
              Join board
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
