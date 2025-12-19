// convex/boards.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { generateBoardCode } from "./lib/code";

export const createBoard = mutation({
  args: {},
  handler: async (ctx) => {
    let code: string;
    let existing: any;
    do {
      code = generateBoardCode();
      existing = await ctx.db
        .query("boards")
        .withIndex("by_code", (q) => q.eq("code", code))
        .first();
    } while (existing);

    const boardId = await ctx.db.insert("boards", {
      code,
      createdAt: Date.now(),
    });

    return { boardId, code };
  },
});

export const getBoardByCode = query({
  args: { code: v.string() }, // must be validator!
  handler: async (ctx, { code }) => {
    return await ctx.db
      .query("boards")
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();
  },
});
