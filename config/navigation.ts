import { Home, Users, TrendingUp, BarChart3 } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

export const dashboardNavItems: NavItem[] = [
  { href: "/", label: "Dashboard", shortLabel: "Home", icon: Home },
  { href: "/creators", label: "Creators", shortLabel: "Creators", icon: Users },
  { href: "/trades", label: "Trades", shortLabel: "Trades", icon: TrendingUp },
  {
    href: "/my-performance",
    label: "My Performance",
    shortLabel: "Stats",
    icon: BarChart3,
  },
];
