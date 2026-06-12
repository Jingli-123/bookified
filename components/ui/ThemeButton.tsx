
"use client";

import Button, { ButtonProps } from "@mui/material/Button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeButtonProps = ButtonProps;

export default function ThemeButton({
  children,
  sx,
  ...props
}: ThemeButtonProps) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // avoid hydration mismatch
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      {...props}
      sx={{
        color: isDark ? "#fff" : "#1976d2",

        borderColor: isDark ? "#334155" : "#1976d2",

        backgroundColor: isDark
          ? "transparent"
          : "transparent",

        "&:hover": {
          borderColor: isDark ? "#475569" : "#1565c0",

          backgroundColor: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(25,118,210,0.04)",
        },

        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

