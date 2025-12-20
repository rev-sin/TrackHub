import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-client";

export const COLUMN_ORDER = ["Backlog", "In Progress", "Done"];

export async function createBoard(): Promise<string> {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const ref = doc(db, "boards", code);
  await setDoc(ref, { columns: { Backlog: [], "In Progress": [], Done: [] } });
  return code;
}

export async function boardExists(code: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "boards", code));
  return snap.exists();
}

export async function addTask(code: string, column: string, task: string) {
  const ref = doc(db, "boards", code);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const tasks = [...(data.columns[column] || []), task];
  await updateDoc(ref, { [`columns.${column}`]: tasks });
}

export async function deleteTask(
  code: string,
  column: string,
  index: number,
  tasks: string[],
) {
  const ref = doc(db, "boards", code);
  const newTasks = [...tasks];
  newTasks.splice(index, 1);
  await updateDoc(ref, { [`columns.${column}`]: newTasks });
}

export async function moveTask(
  code: string,
  fromColumn: string,
  direction: "left" | "right",
  taskIndex: number,
  columns: Record<string, string[]>,
) {
  const normalizedColumns: Record<string, string[]> = {};
  for (const col of COLUMN_ORDER) {
    normalizedColumns[col] = columns[col] || [];
  }

  const fromIndex = COLUMN_ORDER.indexOf(fromColumn);
  if (fromIndex === -1) return;

  const toIndex = direction === "left" ? fromIndex - 1 : fromIndex + 1;
  if (toIndex < 0 || toIndex >= COLUMN_ORDER.length) return;

  const toColumn = COLUMN_ORDER[toIndex];
  const task = normalizedColumns[fromColumn][taskIndex];

  const nextFrom = [...normalizedColumns[fromColumn]];
  nextFrom.splice(taskIndex, 1);

  const nextTo = [...normalizedColumns[toColumn], task];

  await updateDoc(doc(db, "boards", code), {
    [`columns.${fromColumn}`]: nextFrom,
    [`columns.${toColumn}`]: nextTo,
  });
}
