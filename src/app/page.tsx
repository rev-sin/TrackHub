"use client";

import { boardExists, createBoard } from "lib/boards";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    const newCode = await createBoard();
    router.push(`/b/${newCode}`);
  }

  async function handleJoin() {
    const normalized = code.toUpperCase();
    if (normalized.length !== 6) return;

    const exists = await boardExists(normalized);
    if (exists) router.push(`/b/${normalized}`);
    else alert("Board not found");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-panel p-8 shadow-lg space-y-8">
        {/* Header */}
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">TrackHub</h1>
          <p className="text-sm text-muted">
            Auth-less Kanban with invite codes
          </p>
        </header>

        {/* Create */}
        <button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="w-full rounded-xl bg-accent py-2.5 text-sm font-medium text-black
                     hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create new board"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Join */}
        <div className="space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="ENTER CODE"
            className="w-full rounded-xl border border-border bg-bg px-4 py-2.5
                       text-center tracking-widest uppercase outline-none
                       focus:border-accent transition"
          />

          <button
            type="button"
            onClick={handleJoin}
            className="w-full rounded-xl border border-border py-2.5 text-sm
                       hover:bg-border transition"
          >
            Join board
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted text-center">
          Anyone with the code can collaborate
        </p>
      </div>
    </main>
  );
}
