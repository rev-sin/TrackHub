import { customAlphabet } from "nanoid";

export const generateCode = customAlphabet(
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  6,
);
