import { Button } from "components/ui/button";
import { ArrowLeft, Github, RefreshCw } from "lucide-react";
import Link from "next/link";
import { generateTheme } from "lib/theme";

interface BoardHeaderProps {
  code: string;
  onThemeChange: (theme: React.CSSProperties) => void;
}

export function BoardHeader({ code, onThemeChange }: BoardHeaderProps) {
  return (
    <header className="flex-none border-b border-[var(--dynamic-border)] px-4 md:px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-[var(--dynamic-panel)]/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 md:gap-4 flex-wrap">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)]"
          >
            <ArrowLeft size={16} className="mr-1" />{" "}
            <span className="hidden sm:inline">Home</span>
          </Button>
        </Link>
        <a
          href="https://github.com/rev-sin/trackhub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
          >
            <Github size={16} className="mr-2" />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
        </a>
        <div>
          <h1 className="text-base md:text-lg font-bold text-[var(--dynamic-primary)] leading-tight">
            Board
          </h1>
          <p className="text-[10px] md:text-xs opacity-70 font-mono tracking-widest uppercase truncate max-w-[100px] md:max-w-none">
            {code}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onThemeChange(generateTheme())}
          className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
        >
          <RefreshCw size={16} />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigator.clipboard.writeText(code)}
          className="bg-[var(--dynamic-bg)] border-[var(--dynamic-border)] hover:bg-[var(--dynamic-panel)] text-[var(--dynamic-fg)]"
        >
          <span className="hidden sm:inline">Copy code</span>
          <span className="sm:hidden">Copy</span>
        </Button>
      </div>
    </header>
  );
}
