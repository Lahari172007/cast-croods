import { Heart, MapPin, Languages, Users } from 'lucide-react'
import type { MatchResult } from '@/lib/match'
import { buildReasoningLine } from '@/lib/match'
import { formatFollowers, scoreTier } from '@/lib/format'
import { cn } from '@/lib/utils'

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function CreatorCard({ result }: { result: MatchResult }) {
  const { creator, score, matchedKeywords } = result
  const tier = scoreTier(score)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-500/10">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/80 to-fuchsia-500/80 text-sm font-semibold text-white">
            {initials(creator.name)}
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-tight text-foreground">
              {creator.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {creator.handle} · {creator.platform}
            </p>
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col items-center rounded-xl bg-gradient-to-br px-3 py-1.5 text-center shadow-lg',
            tier.className,
          )}
        >
          <span className="text-base font-bold leading-none">{score}</span>
          <span className="text-[9px] font-medium uppercase tracking-wider opacity-90">
            {tier.label}
          </span>
        </div>
      </div>

      <span className="mt-4 inline-flex items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-200">
        {creator.niche}
      </span>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-3.5 w-3.5 text-violet-300" />
          <span className="font-medium text-foreground">
            {formatFollowers(creator.followers)}
          </span>
          followers
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Heart className="h-3.5 w-3.5 text-fuchsia-300" />
          <span className="font-medium text-foreground">
            {creator.engagementRate}%
          </span>
          engagement
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-indigo-300" />
          <span className="truncate">{creator.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Languages className="h-3.5 w-3.5 text-indigo-300" />
          <span>{creator.language}</span>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
          Why this creator matches
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {buildReasoningLine(result)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {creator.tone.map((tone) => (
          <span
            key={tone}
            className={cn(
              'rounded-md px-2 py-0.5 text-[10px] font-medium',
              matchedKeywords.includes(tone)
                ? 'bg-fuchsia-500/20 text-fuchsia-200'
                : 'bg-white/5 text-muted-foreground',
            )}
          >
            {tone}
          </span>
        ))}
      </div>
    </article>
  )
}
