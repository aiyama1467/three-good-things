import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/dal";
import { STREAK } from "@/lib/mock-data";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // proxy.ts は Cookie の存在しか見ないので、ここで真の検証を行う。
  // redirect() は throw するため try/catch の外で呼ぶ。
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <AppSidebar
        streak={STREAK}
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
        }}
      />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
