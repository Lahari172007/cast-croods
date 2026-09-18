'use client'

import { useMemo, useState } from 'react'
import { Crown, Flame, TrendingUp } from 'lucide-react'
import { creators, NICHES, type Niche } from '@/lib/creators'
import { formatFollowers } from '@/lib/format'
import { cn } from '@/lib/utils'

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function TrendingView() {
  const [niche, setNiche] = useState<Niche | 'all'>('all')

  const ranked = useMemo(() => {
    return [...creators]
      .filter((c) => niche === 'all' || c.niche === niche)
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 10)
  }, [niche])

  const max = ranked[0]?.engagementRate ?? 10
  const leader = ranked[0]

  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-12">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-fuchsia-500/30 text-orange-200">
          <Flame className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Weekly Trending
          </h1>
          <p className="text-sm text-muted-foreground">
            Creators ranked by engagement rate this week
          </p>
        </div>
      </div>

      {leader && (
        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-transparent p-5">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-bold text-white">
            {initials(leader.name)}
            <Crown className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 text-amber-300" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-violet-300">
              #1 this week
            </p>
            <p className="truncate text-lg font-semibold text-foreground">
              {leader.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {leader.handle} · {formatFollowers(leader.followers)} followers ·{' '}
              <span className="capitalize">{leader.niche}</span>
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold text-gradient">
              {leader.engagementRate}%
            </p>
            <p className="text-[11px] text-muted-foreground">engagement</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-1.5">
        <FilterChip
          active={niche === 'all'}
          onClick={() => setNiche('all')}
          label="All niches"
        />
        {NICHES.map((n) => (
          <FilterChip
            key={n}
            active={niche === n}
            onClick={() => setNiche(n)}
            label={n}
          />
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {ranked.map((creator, index) => {
          const width = Math.round((creator.engagementRate / max) * 100)
          return (
            <div
              key={creator.id}
              className="group flex items-center gap-4 rounded-xl border border-white/5 bg-card/40 px-4 py-3 transition-colors hover:border-violet-400/25"
            >
              <span
                className={cn(
                  'w-6 shrink-0 text-center text-sm font-bold',
                  index === 0
                    ? 'text-amber-300'
                    : index === 1
                      ? 'text-slate-300'
                      : index === 2
                        ? 'text-orange-300'
                        : 'text-muted-foreground',
                )}
              >
                {index + 1}
              </span>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/70 to-fuchsia-500/70 text-xs font-semibold text-white">
                {initials(creator.name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-sm font-medium text-foreground">
                    {creator.name}
                    <span className="ml-2 text-xs font-normal capitalize text-muted-foreground">
                      {creator.niche}
                    </span>
                  </p>
                  <span className="shrink-0 text-sm font-semibold text-violet-200">
                    {creator.engagementRate}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>

              <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
                <TrendingUp className="h-3.5 w-3.5 text-fuchsia-300" />
                {formatFollowers(creator.followers)}
              </span>
            </div>
          )
        })}
      </div>

      {ranked.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No creators in this niche yet.
        </p>
      )}
    </main>
  )
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
        active
          ? 'border-violet-400/40 bg-violet-500/20 text-violet-100'
          : 'border-white/8 bg-white/5 text-muted-foreground hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}
