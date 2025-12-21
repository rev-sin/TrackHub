"use client";

import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { doc, onSnapshot } from "firebase/firestore";
import { addTask, COLUMN_ORDER, deleteTask, moveTask } from "lib/boards";
import { db } from "lib/firebase-client";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Github,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Link from "next/link";
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
  const [taskText, setTaskText] = useState("");
  const [theme, setTheme] = useState<React.CSSProperties>(
    {} as React.CSSProperties,
  );

  const generateTheme = () => {
    const h = Math.floor(Math.random() * 360);
    return {
      "--dynamic-bg": `hsl(${h}, 50%, 95%)`,
      "--dynamic-panel": `hsl(${h}, 30%, 90%)`,
      "--dynamic-fg": `hsl(${h}, 50%, 10%)`,
      "--dynamic-primary": `hsl(${h}, 70%, 40%)`,
      "--dynamic-border": `hsl(${h}, 30%, 80%)`,
    } as React.CSSProperties;
  };

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
      <header className="flex-none border-b border-[var(--dynamic-border)] px-4 md:px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-[var(--dynamic-panel)]/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)]"
            >
              <ArrowLeft size={16} className="mr-1" />{" "}
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <a
            href="https://github.com/rev-sin/trackhub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
            >
              <Github size={16} className="mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </a>
          <div>
            <h1 className="text-base md:text-lg font-bold text-[var(--dynamic-primary)] leading-tight">
              Board
            </h1>
            <p className="text-[10px] md:text-xs opacity-70 font-mono tracking-widest uppercase truncate max-w-[100px] md:max-w-none">
              {code}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(generateTheme())}
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
          >
            <RefreshCw size={16} />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(code)}
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
          >
            <span className="hidden sm:inline">Copy code</span>
            <span className="sm:hidden">Copy</span>
          </Button>
        </div>
      </header>

      <div className="flex-none p-4 md:p-6">
        <form
          className="flex space-x-2 w-full max-w-lg mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            if (taskText.trim() === "") return;
            addTask(code, "Backlog", taskText);
            setTaskText("");
          }}
        >
          <Input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add task..."
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] focus-visible:ring-[var(--dynamic-primary)]"
          />
          <Button
            type="submit"
            className="bg-[var(--dynamic-primary)] hover:opacity-90 text-white border-none shrink-0"
          >
            Add
          </Button>
        </form>
      </div>

      {/* Container:
         - Mobile: overflow-y-auto (page scroll), h-auto
         - Desktop: overflow-hidden (fixed), h-full (so columns can scroll internally)
      */}
      <section className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden px-4 md:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-full">
          {COLUMN_ORDER.map((col) => {
            const tasks = board.columns[col] || [];
            return (
              <Card
                key={col}
                // Mobile: h-[500px] fixed height with internal scroll. Desktop: h-full.
                className="flex flex-col h-[500px] md:h-full bg-[var(--dynamic-panel)] border-[var(--dynamic-border)] shadow-sm"
              >
                <CardHeader className="flex-none pb-3 border-b border-[var(--dynamic-border)]">
                  <h2 className="text-xs font-bold text-[var(--dynamic-primary)] tracking-widest uppercase">
                    {col}{" "}
                    <span className="opacity-50 ml-2">({tasks.length})</span>
                  </h2>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 min-h-0 space-y-3 pt-3">
                  <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                    {tasks.length === 0 && (
                      <div className="h-full flex items-center justify-center opacity-50">
                        <p className="text-xs italic">No tasks</p>
                      </div>
                    )}

                    {tasks.map((task, i) => (
                      <Card
                        key={i}
                        className="flex-none p-3 flex flex-col space-y-2 bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] shadow-sm active:scale-95 transition-transform"
                      >
                        <p className="text-sm font-medium break-words">
                          {task}
                        </p>

                        <div className="flex justify-between text-xs opacity-70 pt-2">
                          <div className="flex space-x-1">
                            {col !== "Backlog" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
                                onClick={() =>
                                  moveTask(code, col, "left", i, board.columns)
                                }
                              >
                                {/* Mobile: Up Arrow (Prev stage). Desktop: Left Arrow */}
                                <ArrowUp size={14} className="md:hidden" />
                                <ArrowLeft
                                  size={14}
                                  className="hidden md:block"
                                />
                              </Button>
                            )}
                            {col !== "Done" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
                                onClick={() =>
                                  moveTask(code, col, "right", i, board.columns)
                                }
                              >
                                {/* Mobile: Down Arrow (Next stage). Desktop: Right Arrow */}
                                <ArrowDown size={14} className="md:hidden" />
                                <ArrowRight
                                  size={14}
                                  className="hidden md:block"
                                />
                              </Button>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-red-500 hover:text-white"
                            onClick={() => deleteTask(code, col, i, tasks)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
