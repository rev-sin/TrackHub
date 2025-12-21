import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { addTask } from "lib/boards";
import { useState } from "react";

interface TaskInputProps {
  code: string;
}

export function TaskInput({ code }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    addTask(code, "Backlog", taskText);
    setTaskText("");
  };

  return (
    <div className="flex-none p-4 md:p-6">
      <form
        className="flex space-x-2 w-full max-w-lg mx-auto"
        onSubmit={handleSubmit}
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
  );
}
