'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import { CreatorCard } from '@/components/creator-card'
import { matchCreators, type SearchCriteria } from '@/lib/match'
import type { Platform } from '@/lib/creators'
import { cn } from '@/lib/utils'

const PLATFORMS: (Platform | 'All')[] = [
  'All',
  'Instagram',
  'YouTube',
  'X',
  'LinkedIn',
]

const AGE_LABELS: Record<string, string> = {
  '13-17': '13-17',
  '18-24': '18-24',
  '25-34': '25-34',
  '35-44': '35-44',
  '45+': '45+',
}

export function ResultsView({ criteria }: { criteria: SearchCriteria }) {
  const [platform, setPlatform] = useState<Platform | 'All'>('All')
  const [strongOnly, setStrongOnly] = useState(false)

  const allResults = useMemo(() => matchCreators(criteria), [criteria])

  const results = useMemo(() => {
    return allResults.filter((r) => {
      if (platform !== 'All' && r.creator.platform !== platform) return false
      if (strongOnly && r.score < 50) return false
      return true
    })
  }, [allResults, platform, strongOnly])

  const topScore = allResults[0]?.score ?? 0

  return (
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        New search
      </Link>

      <div className="mt-4 flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {results.length} matching creator{results.length === 1 ? '' : 's'}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {criteria.niche !== 'any' && (
              <Pill label="Niche" value={criteria.niche} />
            )}
            {criteria.ageGroup !== 'any' && (
              <Pill label="Age" value={AGE_LABELS[criteria.ageGroup]} />
            )}
            <span className="text-muted-foreground">
              Top match score{' '}
              <span className="font-semibold text-violet-200">{topScore}</span>
            </span>
          </div>
          {criteria.requirement && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground/80">Brief:</span> “
              {criteria.requirement}”
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filter
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                platform === p
                  ? 'border-violet-400/40 bg-violet-500/20 text-violet-100'
                  : 'border-white/8 bg-white/5 text-muted-foreground hover:text-foreground',
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStrongOnly((v) => !v)}
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
            strongOnly
              ? 'border-fuchsia-400/40 bg-fuchsia-500/20 text-fuchsia-100'
              : 'border-white/8 bg-white/5 text-muted-foreground hover:text-foreground',
          )}
        >
          Strong matches only
        </button>
      </div>

      {results.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-white/8 bg-card/40 p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No creators match these filters. Try widening the platform or turning
            off “Strong matches only”.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <CreatorCard key={result.creator.id} result={result} />
          ))}
        </div>
      )}
    </main>
  )
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-muted-foreground">
      <span className="text-muted-foreground/70">{label}:</span>
      <span className="font-medium capitalize text-foreground">{value}</span>
    </span>
  )
}
