"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "lib/firebase-client";
import { addTask, deleteTask, moveTask, COLUMN_ORDER } from "lib/boards";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
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

  useEffect(() => {
    const ref = doc(db, "boards", code);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setBoard(snap.data() as Board);
    });
  }, [code]);

  if (!board) {
    return (
      <div className="h-full flex items-center justify-center text-muted">
        Loading board…
      </div>
    );
  }

  return (
    <main className="h-full flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-1" /> Home
            </Button>
          </Link>

          <div>
            <h1 className="text-lg font-medium">Board</h1>
            <p className="text-xs text-muted tracking-widest">{code}</p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          Copy code
        </Button>
      </header>

      {/* Task input */}
      <div className="p-6">
        <form
          className="flex space-x-2"
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
          />
          <Button type="submit">Add</Button>
        </form>
      </div>

      {/* Kanban columns */}
      <section className="flex-1 overflow-x-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {COLUMN_ORDER.map((col) => {
            const tasks = board.columns[col] || [];
            return (
              <Card
                key={col}
                className="flex flex-col h-full bg-panel border border-border"
              >
                <CardHeader>
                  <h2 className="text-xs text-fg tracking-widest">
                    {col.toUpperCase()}
                  </h2>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 space-y-3">
                  <div className="flex-1 flex flex-col space-y-2 overflow-y-auto">
                    {tasks.length === 0 && (
                      <p className="text-xs text-muted italic">No tasks</p>
                    )}

                    {tasks.map((task, i) => (
                      <Card
                        key={i}
                        className="p-3 flex flex-col space-y-2 border-border"
                      >
                        <p className="text-sm">{task}</p>

                        <div className="flex justify-between text-xs text-muted">
                          <div className="flex space-x-2">
                            {col !== "Backlog" && (
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() =>
                                  moveTask(code, col, "left", i, board.columns)
                                }
                              >
                                <ArrowLeft size={16} />
                              </Button>
                            )}
                            {col !== "Done" && (
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() =>
                                  moveTask(code, col, "right", i, board.columns)
                                }
                              >
                                <ArrowRight size={16} />
                              </Button>
                            )}
                          </div>

                          <Button
                            variant="destructive"
                            size="xs"
                            onClick={() => deleteTask(code, col, i, tasks)}
                          >
                            <Trash2 size={16} />
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
