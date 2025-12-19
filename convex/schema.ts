// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    code: v.string(), // unique 6-digit code
    createdAt: v.number(),
  }).index("by_code", ["code"]),

  tasks: defineTable({
    boardId: v.id("boards"), // foreign key to boards
    title: v.string(),
    column: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
    order: v.number(),
  }).index("by_board", ["boardId"]),
});
