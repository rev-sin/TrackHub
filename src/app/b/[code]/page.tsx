"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "lib/firebase-client";
import { use, useEffect, useState } from "react";

type Board = {
  columns: Record<string, string[]>;
};

export default function BoardPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const ref = doc(db, "boards", code);
      return onSnapshot(
        ref,
        (snap) => {
          if (!snap.exists()) {
            setError("Board not found");
            return;
          }
          setBoard(snap.data() as Board);
        },
        (err) => {
          console.error(err);
          setError("Failed to load board");
        },
      );
    } catch (e) {
      console.error(e);
      setError("Fatal error loading board");
    }
  }, [code]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        {error}
      </div>
    );
  }

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Loading board…
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 space-y-6">
      <header>
        <h1 className="text-lg font-medium">Board</h1>
        <p className="text-sm text-muted tracking-widest">{code}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(board.columns).map(([col, tasks]) => (
          <section
            key={col}
            className="bg-panel border border-border rounded-xl p-4"
          >
            <h2 className="text-xs tracking-widest text-muted mb-3">
              {col.toUpperCase()}
            </h2>

            <div className="space-y-2">
              {tasks.length === 0 && (
                <p className="text-xs text-muted italic">No tasks</p>
              )}

              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="bg-bg border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {task}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
