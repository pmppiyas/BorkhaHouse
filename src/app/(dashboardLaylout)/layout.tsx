import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getMe } from '@/services/auth/getMe';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <SidebarProvider className="container mx-auto max-w-7xl">
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
