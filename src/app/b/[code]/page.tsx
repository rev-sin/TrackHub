"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "lib/firebase-client";
import { addTask, deleteTask, moveTask, COLUMN_ORDER } from "lib/boards";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";

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
        className="h-screen w-full flex items-center justify-center text-muted"
        style={theme}
      >
        Loading board…
      </div>
    );
  }

  return (
    <main
      style={theme}
      // 1. h-screen: Force full viewport height
      // 2. overflow-hidden: Stop the body from scrolling
      className="h-screen flex flex-col overflow-hidden bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] transition-colors duration-500"
    >
      {/* Header - Fixed height */}
      <header className="flex-none border-b border-[var(--dynamic-border)] px-6 py-4 flex items-center justify-between bg-[var(--dynamic-panel)]/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)]"
            >
              <ArrowLeft size={16} className="mr-1" /> Home
            </Button>
          </Link>

          <div>
            <h1 className="text-lg font-bold text-[var(--dynamic-primary)]">
              Board
            </h1>
            <p className="text-xs opacity-70 font-mono tracking-widest uppercase">
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
            <RefreshCw size={16} className="mr-2" /> Re-roll Colors
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(code)}
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
          >
            Copy code
          </Button>
        </div>
      </header>

      {/* Input Area - Fixed height */}
      <div className="flex-none p-6">
        <form
          className="flex space-x-2 max-w-lg mx-auto"
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
            placeholder="Add task to Backlog"
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] focus-visible:ring-[var(--dynamic-primary)]"
          />
          <Button
            type="submit"
            className="bg-[var(--dynamic-primary)] hover:opacity-90 text-white border-none"
          >
            Add
          </Button>
        </form>
      </div>

      {/* Kanban Columns Section - Takes remaining space */}
      {/* flex-1: Grow to fill space */}
      {/* min-h-0: Essential for nested scrolling in Flexbox */}
      <section className="flex-1 min-h-0 overflow-x-auto px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-w-[800px] md:min-w-0">
          {COLUMN_ORDER.map((col) => {
            const tasks = board.columns[col] || [];
            return (
              <Card
                key={col}
                // h-full here ensures the card stretches to the bottom of the section
                className="flex flex-col h-full bg-[var(--dynamic-panel)] border-[var(--dynamic-border)] shadow-sm"
              >
                <CardHeader className="flex-none pb-3 border-b border-[var(--dynamic-border)]">
                  <h2 className="text-xs font-bold text-[var(--dynamic-primary)] tracking-widest uppercase">
                    {col}
                  </h2>
                </CardHeader>

                {/* CardContent: flex-1 allows it to fill the card */}
                {/* min-h-0 ensures the internal scroll works */}
                <CardContent className="flex flex-col flex-1 min-h-0 space-y-3 pt-3">
                  {/* Internal Scroll Container */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                    {tasks.length === 0 && (
                      <div className="h-full flex items-center justify-center opacity-50">
                        <p className="text-xs italic">No tasks</p>
                      </div>
                    )}

                    {tasks.map((task, i) => (
                      <Card
                        key={i}
                        className="flex-none p-3 flex flex-col space-y-2 bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] shadow-sm"
                      >
                        <p className="text-sm font-medium">{task}</p>

                        <div className="flex justify-between text-xs opacity-70 pt-2">
                          <div className="flex space-x-1">
                            {col !== "Backlog" && (
                              <Button
                                variant="ghost"
                                className="xs h-6 w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
                                onClick={() =>
                                  moveTask(code, col, "left", i, board.columns)
                                }
                              >
                                <ArrowLeft size={14} />
                              </Button>
                            )}
                            {col !== "Done" && (
                              <Button
                                variant="ghost"
                                className="h-6 w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
                                onClick={() =>
                                  moveTask(code, col, "right", i, board.columns)
                                }
                              >
                                <ArrowRight size={14} />
                              </Button>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
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
