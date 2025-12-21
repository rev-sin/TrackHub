import { Button } from "components/ui/button";
import { RefreshCw } from "lucide-react";
import { generateTheme } from "lib/theme";

interface ThemeToggleProps {
  onThemeChange: (theme: React.CSSProperties) => void;
  className?: string;
}

export function ThemeToggle({ onThemeChange, className }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => onThemeChange(generateTheme())}
      title="Re-roll colors"
    >
      <RefreshCw size={20} />
    </Button>
  );
}
