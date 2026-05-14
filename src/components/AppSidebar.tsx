"use client";

import {
  CalendarDays,
  Flame,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { href: "/today", label: "今日", icon: LayoutDashboard },
  { href: "/calendar", label: "カレンダー", icon: CalendarDays },
  { href: "/review", label: "ふりかえり", icon: LineChart },
  { href: "/settings", label: "設定", icon: Settings },
];

type UserInfo = {
  name: string;
  email: string;
  image: string | null;
};

export function AppSidebar({
  streak = 7,
  user,
}: {
  streak?: number;
  user: UserInfo;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const initial = (
    user.name?.trim()?.[0] ??
    user.email?.trim()?.[0] ??
    "?"
  ).toUpperCase();
  const displayName = user.name?.trim() || user.email;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            3
          </div>
          <span className="font-semibold text-sm">Three Good Things</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      render={<Link href={item.href} />}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {user.image ? (
              <AvatarImage src={user.image} alt={displayName} />
            ) : null}
            <AvatarFallback className="text-xs">{initial}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Flame className="h-3 w-3 text-orange-500" />
              <span>{streak}日連続</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {streak}🔥
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
