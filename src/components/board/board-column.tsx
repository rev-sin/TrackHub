import { Card, CardContent, CardHeader } from "components/ui/card";
import { TaskCard } from "./task-card";

interface BoardColumnProps {
  id: string;
  tasks: string[];
  code: string;
  allColumns: Record<string, string[]>;
}

export function BoardColumn({ id, tasks, code, allColumns }: BoardColumnProps) {
  return (
    <Card className="flex flex-col h-[500px] md:h-full bg-[var(--dynamic-panel)] border-[var(--dynamic-border)] shadow-sm">
      <CardHeader className="flex-none pb-3 border-b border-[var(--dynamic-border)]">
        <h2 className="text-xs font-bold text-[var(--dynamic-primary)] tracking-widest uppercase">
          {id} <span className="opacity-50 ml-2">({tasks.length})</span>
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
            <TaskCard
              key={`${id}-${i}`}
              task={task}
              index={i}
              columnId={id}
              code={code}
              allColumns={allColumns}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
