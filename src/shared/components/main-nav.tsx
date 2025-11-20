"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Home, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { authClient } from "@/shared/lib/auth/auth-client";

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  // Don't show nav on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/recipes",
      label: "Recipes",
      icon: ChefHat,
      requireAuth: true,
    },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <ChefHat className="h-6 w-6" />
              <span className="hidden sm:inline">Generic Auth</span>
            </Link>
            <div className="flex items-center gap-4">
              {navItems.map((item) => {
                if (item.requireAuth && !session?.user) {
                  return null;
                }
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "gap-2",
                        isActive && "bg-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
          {session?.user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">
                {session.user.email}
              </span>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
