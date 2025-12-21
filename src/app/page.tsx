"use client";

import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "components/ui/input-otp";
import { boardExists, createBoard } from "lib/boards";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState<React.CSSProperties>(
    {} as React.CSSProperties,
  );

  const generateTheme = () => {
    const h = Math.floor(Math.random() * 360);
    return {
      "--dynamic-bg": `hsl(${h}, 50%, 95%)`,
      "--dynamic-panel": `hsl(${h}, 30%, 90%)`,
      "--dynamic-fg": `hsl(${h}, 50%, 10%)`,
      "--dynamic-primary": `hsl(${h}, 70%, 40%)`,
      "--dynamic-border": `hsl(${h}, 30%, 80%)`,
    } as React.CSSProperties;
  };

  useEffect(() => {
    setTheme(generateTheme());
  }, []);

  async function handleCreate() {
    const newCode = await createBoard();
    router.push(`/b/${newCode}`);
  }

  async function handleJoin() {
    const normalized = code.toUpperCase();
    if (normalized.length !== 6) return;
    if (await boardExists(normalized)) router.push(`/b/${normalized}`);
    else alert("Board not found");
  }

  return (
    <main
      style={theme}
      className="h-screen w-full flex flex-col items-center justify-center p-4 bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] transition-colors duration-500 relative"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-[var(--dynamic-primary)] hover:bg-[var(--dynamic-panel)]"
        onClick={() => setTheme(generateTheme())}
        title="Re-roll colors"
      >
        <RefreshCw size={20} />
      </Button>
      <Card className="w-full max-w-sm bg-[var(--dynamic-panel)] border-[var(--dynamic-border)] shadow-lg">
        <CardHeader className="text-center pb-2">
          <h1 className="text-3xl font-bold text-[var(--dynamic-primary)] tracking-tight">
            TrackHub
          </h1>
          <p className="text-sm opacity-70">Auth-less Kanban</p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <Button
            className="w-full bg-[var(--dynamic-primary)] hover:opacity-90 text-white border-none h-11 text-md"
            onClick={handleCreate}
          >
            Create New Board
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--dynamic-border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--dynamic-panel)] px-2 opacity-50">
                Or join existing
              </span>
            </div>
          </div>

          <div className="space-y-3 flex flex-col items-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
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
        </CardContent>
      </Card>

      <p className="absolute bottom-6 text-xs opacity-40">
        No login required. Just share the code.
      </p>
    </main>
  );
}
