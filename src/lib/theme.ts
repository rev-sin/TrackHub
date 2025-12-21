export const generateTheme = (): React.CSSProperties => {
  const h = Math.floor(Math.random() * 360);
  return {
    "--dynamic-bg": `hsl(${h}, 50%, 95%)`,
    "--dynamic-panel": `hsl(${h}, 30%, 90%)`,
    "--dynamic-fg": `hsl(${h}, 50%, 10%)`,
    "--dynamic-primary": `hsl(${h}, 70%, 40%)`,
    "--dynamic-border": `hsl(${h}, 30%, 80%)`,
  } as React.CSSProperties;
};
