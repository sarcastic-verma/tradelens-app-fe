"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useAuthContext } from "@/state/context/auth.context";
import { dashboardNavItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileNavbar() {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-3 mb-3">
        <div className="flex items-center justify-around h-[68px] px-1 bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl shadow-elevated">
          {dashboardNavItems.map((item, index) => {
            const isActive = isActiveRoute(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground active:scale-95",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]",
                  )}
                />
                <span className="text-[10px] font-medium">
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}

          {/* Profile */}
          <Link
            href="/profile"
            className={cn(
              "relative flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300",
              pathname === "/profile"
                ? "text-primary scale-105"
                : "text-muted-foreground hover:text-foreground active:scale-95",
            )}
          >
            {user?.photo ? (
              <Image
                src={user.photo}
                alt={user.name || "Profile"}
                width={20}
                height={20}
                className={cn(
                  "rounded-full transition-all duration-200",
                  pathname === "/profile" &&
                    "ring-2 ring-primary ring-offset-1 ring-offset-background",
                )}
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
