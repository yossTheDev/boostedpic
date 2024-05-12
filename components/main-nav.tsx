import * as React from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="flex items-center space-x-2  hover:animate-tada"
      >
        <Icons.logo className="size-8" />
        <span className="inline-block text-2xl font-bold">BoostedPic</span>
      </Link>
      {items?.length ? (
        <div className="hidden gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <>
                  <Link
                    target={item.external ? "_blank" : ""}
                    key={index + "-nav"}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                    {item.external && (
                      <ArrowUpRightIcon className="ml-1 size-4"></ArrowUpRightIcon>
                    )}
                  </Link>
                </>
              )
          )}
        </div>
      ) : null}
    </div>
  )
}
