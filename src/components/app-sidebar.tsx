'use client';

import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { IUser } from '@/interface/user.interface';
import { getRoutesByRole } from '@/routes/routes';
import NavLinkClient from '@/components/navlink-client';
import Logo from '@/app/components/shared/Logo';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: IUser | undefined;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const myNavs = getRoutesByRole(user?.role || 'BUYER');

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {myNavs.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-4 last:mb-0">
            {section.title && (
              <SidebarGroupLabel className="mb-2 px-4 text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {section.nav.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <NavLinkClient
                      href={item.href}
                      title={item.title}
                      iconName={item.iconName || ''}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as IUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
