"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "./icons"

interface MainButtonProps {
  items?: NavItem[]
}

export const MenuWithButton: React.FC<MainButtonProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded bg-neutral-900 p-1">
            <Menu className="size-5"></Menu>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem asChild>
                  <Link
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : ""}
                    role="menuitem"
                  >
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              )
          )}
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex gap-2"
              role="menuitem"
            >
              <Icons.gitHub className="size-3" />
              GitHub
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex gap-2"
              role="menuitem"
            >
              <Icons.X className="size-3 dark:fill-white" />X{"(Twitter)"}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noreferrer"
              className="flex gap-2"
              role="menuitem"
            >
              <Icons.Telegram className="size-3 dark:fill-white" />
              Telegram
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
