'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Clapperboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Discover' },
  { href: '/results', label: 'Matches' },
  { href: '/trending', label: 'Trending' },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105">
            <Clapperboard className="h-5 w-5 text-white" />
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] text-foreground">
            CAST CROODS
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-white/5 bg-white/5 p-1">
          {links.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
                  active
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-sm shadow-violet-500/30'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
