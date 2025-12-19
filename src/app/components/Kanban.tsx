"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const columns = [
  { key: "todo", title: "Todo" },
  { key: "in_progress", title: "In Progress" },
  { key: "done", title: "Done" },
] as const;

export function Kanban({ boardId }: { boardId: string }) {
  const tasks = useQuery(api.tasks.getTasks, { boardId });
  const createTask = useMutation(api.tasks.createTask);
  const moveTask = useMutation(api.tasks.moveTask);

  if (!tasks) return <p>Loading tasks...</p>;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {columns.map((col) => (
        <div key={col.key} style={{ minWidth: 200 }}>
          <h3>{col.title}</h3>
          {tasks
            .filter((t) => t.column === col.key)
            .map((t) => (
              <div
                key={t._id}
                style={{ margin: 4, padding: 4, border: "1px solid #ccc" }}
              >
                {t.title}
                <button
                  type="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    const nextColumn =
                      col.key === "todo"
                        ? "in_progress"
                        : col.key === "in_progress"
                          ? "done"
                          : "todo";
                    moveTask({ taskId: t._id, column: nextColumn });
                  }}
                >
                  →
                </button>
              </div>
            ))}
          <button
            type="button"
            style={{ marginTop: 8 }}
            onClick={() =>
              createTask({ boardId, title: "New Task", column: col.key })
            }
          >
            + Add
          </button>
        </div>
      ))}
    </div>
  );
}
