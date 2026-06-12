import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeImageProps = {
  light: string;
  dark: string;
} & Omit<ImageProps, "src">;

export default function ThemeImage({ light, dark, ...props }: ThemeImageProps) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // avoid hydration mismatch
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  return <Image className="" src={isDark ? dark : light} {...props} />;
}
