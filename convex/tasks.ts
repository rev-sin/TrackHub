import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, { boardId }) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_board", (q) => q.eq("boardId", boardId))
      .collect();
  },
});

export const createTask = mutation({
  args: {
    boardId: v.id("boards"),
    title: v.string(),
    column: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", { ...args, order: Date.now() });
  },
});

export const moveTask = mutation({
  args: {
    taskId: v.id("tasks"),
    column: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
  },
  handler: async (ctx, { taskId, column }) => {
    await ctx.db.patch(taskId, { column });
  },
});
