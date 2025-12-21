"use client";

import { CreateButton } from "components/home/create-button";
import { JoinForm } from "components/home/join-form";
import { ThemeToggle } from "components/home/theme-toggle";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { generateTheme } from "lib/theme";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<React.CSSProperties>(
    {} as React.CSSProperties,
  );

  useEffect(() => {
    setTheme(generateTheme());
  }, []);

  return (
    <main
      style={theme}
      className="h-screen w-full flex flex-col items-center justify-center p-4 bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] transition-colors duration-500 relative"
    >
      <ThemeToggle
        onThemeChange={setTheme}
        className="absolute top-4 right-4 text-[var(--dynamic-primary)] hover:bg-[var(--dynamic-panel)]"
      />

      <Card className="w-full max-w-sm bg-[var(--dynamic-panel)] border-[var(--dynamic-border)] shadow-lg">
        <CardHeader className="text-center pb-2">
          <h1 className="text-3xl font-bold text-[var(--dynamic-primary)] tracking-tight">
            TrackHub
          </h1>
          <p className="text-sm opacity-70">Auth-less Kanban</p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <CreateButton />

          {/* Divider */}
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

          <JoinForm />
        </CardContent>
      </Card>

      <p className="absolute bottom-6 text-xs opacity-40">
        No login required. Just share the code.
      </p>
    </main>
  );
}
