'use client'

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";

type HeaderProps = {
  sticky?: boolean
}

function Header({ sticky }: HeaderProps) {
  const [offset, setOffset] = useState(0)

    useEffect(() => {
      const onScroll = () => {
        setOffset(document.body.scrollTop || document.documentElement.scrollTop)
      }

      document.addEventListener('scroll', onScroll, { passive: true })

      return () => document.removeEventListener('scroll', onScroll)
    }, [])

  return (
    <header className={cn(
      'flex items-center gap-3 sm:gap-4 bg-background h-12 mb-9 rounded-lg',
      sticky && 'sticky top-0 z-20 overflow-hidden transition-all ease-out duration-700',
      offset > 10 && sticky ? 'p-2 shadow' : 'shadow-none'
    )}>
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <Separator orientation="vertical" className="h-6" />

      <div className="ml-auto flex items-center space-x-4">
        <ProfileDropdown />
      </div>
    </header>
  );
}

export default Header;
