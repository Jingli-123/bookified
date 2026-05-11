"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { getAllBooks } from "@/lib/actions/book.actions";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const { userId } = useAuth();
  const [allBooks, setAllBooks] = useState<number>(0);
  useEffect(() => {
    const fetchBooks = async () => {
      if (userId) {
        const books = await getAllBooks(userId);
        setAllBooks(books.data?.length || 0);
      }
    };
    fetchBooks();
  }, [userId]);

  return (
    <header className="w-full fixed top-0 z-50 bg-white/40 backdrop-blur-2xl border-b border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-0.5 items-center">
          <Image
            src="/assets/logo.png"
            alt="Bookified"
            width={42}
            height={26}
          />
          <span className="logo-text">MindShelf</span>
        </Link>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems
            .filter((item) => {
              if (item.label === "Add New" && allBooks >= 1) {
                return false;
              }

              return true;
            })
            .map(({ label, href }) => {
              const isActive =
                pathName === href ||
                (href !== "/" && pathName.startsWith(href));

              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "nav-link-base",
                    isActive
                      ? "nav-link-active"
                      : "text-black hover:opacity-70",
                  )}
                >
                  {label}
                </Link>
              );
            })}

          <div className="flex gap-7.5 items-center">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
