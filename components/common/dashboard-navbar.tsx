"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/state/context/auth.context";
import { dashboardNavItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DashboardNavbar() {
  const pathname = usePathname();
  const { user, loading } = useAuthContext();

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex flex-col items-center pt-4 px-4 bg-transparent pointer-events-none">
      <nav className="flex items-center justify-between h-16 px-4 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full shadow-lg max-w-2xl w-full pointer-events-auto transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 ml-2">
          <div className="flex flex-col items-start leading-none gap-0.5">
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-base sm:text-lg text-foreground leading-tight">
                TradeLens
              </span>
            </Link>
          </div>
        </div>

        {/* Dashboard Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {dashboardNavItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  isActiveRoute(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
        </div>

        <div className="flex items-center gap-4 mr-1">
          {!loading && user && (
            <Link href="/profile" title="Go to Profile">
              {user.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="rounded-full border border-border hover:border-primary/50 transition-colors"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-glow-primary hover:shadow-glow-primary/80 transition-shadow">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
