"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "components/ui/input-otp";
import { boardExists } from "lib/boards";

export function JoinForm() {
  const router = useRouter();
  const [code, setCode] = useState("");

  async function handleJoin() {
    const normalized = code.toUpperCase();
    if (normalized.length !== 6) return;
    if (await boardExists(normalized)) router.push(`/b/${normalized}`);
    else alert("Board not found");
  }

  return (
    <div className="space-y-3 flex flex-col items-center">
      <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)}>
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="h-12 w-10 text-lg uppercase bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] focus:ring-[var(--dynamic-primary)]"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button
        variant="outline"
        className="w-full bg-transparent border-[var(--dynamic-border)] hover:bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] mt-2"
        onClick={handleJoin}
        disabled={code.length < 6}
      >
        Join Board
      </Button>
    </div>
  );
}
