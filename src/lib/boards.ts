"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { generateCode } from "./code";
import { db } from "./firebase-client";

export async function createBoard(): Promise<string> {
  let code = generateCode();

  while (true) {
    const ref = doc(db, "boards", code);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        createdAt: serverTimestamp(),
        columns: {
          todo: [],
          doing: [],
          done: [],
        },
      });
      return code;
    }

    code = generateCode();
  }
}

export async function boardExists(code: string) {
  const ref = doc(db, "boards", code);
  const snap = await getDoc(ref);
  return snap.exists();
}
