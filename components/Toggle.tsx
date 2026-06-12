"use client";

import { useTheme } from "next-themes";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 防止 hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      className="flex items-center"
      onClick={() =>
        setTheme(
          resolvedTheme === "dark"
            ? "light"
            : "dark"
        )
      }
    >
      <Switch
        checked={resolvedTheme === "dark"}
      />

      {resolvedTheme === "dark"
        ? "Dark"
        : "Light"}
    </button>
  );
}