"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNavMenuProps } from "@/types";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function MobileNavMenu({
  menuitem,
  onClose,
}: MobileNavMenuProps) {
  const { user } = useUser();
  const pathName = usePathname();

  return (
    <div className="absolute right-0 top-12 w-28 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-xl p-3 flex flex-col gap-2">
      {menuitem
        .filter((item) => {
          if (item.label === "Sign In" && user?.firstName) return false;
          return true;
        })
        .map(({ label, href }) => {
          const isActive =
            pathName === href || (href !== "/" && pathName.startsWith(href));

          return (
            <Link
              href={href}
              key={label}
              onClick={onClose}
              className={cn(
                "nav-link-base",
                isActive ? "nav-link-active" : "text-black hover:opacity-70",
              )}
            >
              {label}
            </Link>
          );
        })}
    </div>
  );
}
