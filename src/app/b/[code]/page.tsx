"use client";

import { BoardColumn } from "components/board/board-column";
import { BoardHeader } from "components/board/board-header";
import { TaskInput } from "components/board/task-input";
import { doc, onSnapshot } from "firebase/firestore";
import { COLUMN_ORDER } from "lib/boards";
import { db } from "lib/firebase-client";
import { generateTheme } from "lib/theme";
import type { Board } from "lib/types";
import { use, useEffect, useState } from "react";

export default function BoardPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);
  const [board, setBoard] = useState<Board | null>(null);
  const [theme, setTheme] = useState<React.CSSProperties>(
    {} as React.CSSProperties,
  );

  useEffect(() => {
    setTheme(generateTheme());
  }, []);

  useEffect(() => {
    const ref = doc(db, "boards", code);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setBoard(snap.data() as Board);
    });
  }, [code]);

  if (!board) {
    return (
      <div
        className="h-[100dvh] w-full flex items-center justify-center text-muted"
        style={theme}
      >
        Loading board…
      </div>
    );
  }

  return (
    <main
      style={theme}
      className="h-[100dvh] flex flex-col overflow-hidden bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] transition-colors duration-500"
    >
      <BoardHeader code={code} onThemeChange={setTheme} />

      <TaskInput code={code} />

      <section className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden px-4 md:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-full">
          {COLUMN_ORDER.map((colId) => (
            <BoardColumn
              key={colId}
              id={colId}
              tasks={board.columns[colId] || []}
              code={code}
              allColumns={board.columns}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
