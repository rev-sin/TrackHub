"use client";

import { FileQuestion, Home as HomeIcon, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function NotFound() {
  const [theme, setTheme] = useState<React.CSSProperties>(
    {} as React.CSSProperties,
  );

  // Wrapped in useCallback to prevent useEffect dependency warnings
  const generateTheme = useCallback(() => {
    const h = Math.floor(Math.random() * 360);
    return {
      "--dynamic-bg": `hsl(${h}, 50%, 95%)`,
      "--dynamic-panel": `hsl(${h}, 30%, 90%)`,
      "--dynamic-fg": `hsl(${h}, 50%, 10%)`,
      "--dynamic-primary": `hsl(${h}, 70%, 40%)`,
      "--dynamic-border": `hsl(${h}, 30%, 80%)`,
    } as React.CSSProperties;
  }, []);

  useEffect(() => {
    setTheme(generateTheme());
  }, [generateTheme]);

  return (
    <main
      style={theme}
      className="h-screen w-full flex flex-col items-center justify-center p-4 bg-[var(--dynamic-bg)] text-[var(--dynamic-fg)] transition-colors duration-500 relative"
    >
      {/* Re-roll button kept for consistency/fun */}
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
        <CardHeader className="text-center pb-2 flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-[var(--dynamic-bg)] flex items-center justify-center text-[var(--dynamic-primary)] border-2 border-[var(--dynamic-border)]">
            <FileQuestion size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--dynamic-primary)] tracking-tight">
              404
            </h1>
            <p className="text-sm opacity-70 mt-1">Board Not Found</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4 text-center">
          <p className="text-sm text-[var(--dynamic-fg)] opacity-80">
            The board you are looking for doesn&apos;t exist, or the 6-digit
            code was incorrect.
          </p>

          <Link href="/" passHref className="block w-full">
            <Button className="w-full bg-[var(--dynamic-primary)] hover:opacity-90 text-white border-none h-11 text-md gap-2">
              <HomeIcon size={18} />
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>

      <p className="absolute bottom-6 text-xs opacity-40">
        TrackHub &mdash; Auth-less Kanban
      </p>
    </main>
  );
}
