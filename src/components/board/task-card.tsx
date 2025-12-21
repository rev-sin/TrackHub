import { Button } from "components/ui/button";
import { Card } from "components/ui/card";
import { deleteTask, moveTask } from "lib/boards";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Trash2,
} from "lucide-react";

interface TaskCardProps {
  task: string;
  index: number;
  columnId: string;
  code: string;
  allColumns: Record<string, string[]>;
}

export function TaskCard({
  task,
  index,
  columnId,
  code,
  allColumns,
}: TaskCardProps) {
  return (
    <Card className="flex-none p-3 flex flex-col space-y-2 bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] shadow-sm active:scale-95 transition-transform">
      <p className="text-sm font-medium break-words">{task}</p>

      <div className="flex justify-between text-xs opacity-70 pt-2">
        <div className="flex space-x-1">
          {columnId !== "Backlog" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
              onClick={() =>
                moveTask(code, columnId, "left", index, allColumns)
              }
            >
              <ArrowUp size={14} className="md:hidden" />
              <ArrowLeft size={14} className="hidden md:block" />
            </Button>
          )}
          {columnId !== "Done" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-[var(--dynamic-primary)] hover:text-white"
              onClick={() =>
                moveTask(code, columnId, "right", index, allColumns)
              }
            >
              <ArrowDown size={14} className="md:hidden" />
              <ArrowRight size={14} className="hidden md:block" />
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-6 md:w-6 p-0 hover:bg-red-500 hover:text-white"
          onClick={() =>
            deleteTask(code, columnId, index, allColumns[columnId])
          }
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </Card>
  );
}
