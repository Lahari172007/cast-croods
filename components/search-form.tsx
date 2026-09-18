'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sparkles, Search } from 'lucide-react'
import { NICHES, AGE_GROUPS } from '@/lib/creators'
import { cn } from '@/lib/utils'

const EXAMPLES = [
  'Upbeat comedy creators for a family sketch show targeting young adults',
  'Cooking creators who make quick regional recipes for a food reality series',
  'High-energy dancers for a hip-hop dance battle format',
]

const AGE_LABELS: Record<string, string> = {
  '13-17': '13-17 (Teens)',
  '18-24': '18-24 (Gen Z)',
  '25-34': '25-34 (Young adults)',
  '35-44': '35-44 (Adults)',
  '45+': '45+ (Mature)',
}

const selectClass =
  'w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.07]'

export function SearchForm() {
  const router = useRouter()
  const [requirement, setRequirement] = useState('')
  const [niche, setNiche] = useState<string>('any')
  const [ageGroup, setAgeGroup] = useState<string>('any')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (requirement.trim()) params.set('q', requirement.trim())
    if (niche !== 'any') params.set('niche', niche)
    if (ageGroup !== 'any') params.set('age', ageGroup)
    router.push(`/results?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-card/50 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
    >
      <div className="space-y-2">
        <label
          htmlFor="requirement"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <Sparkles className="h-4 w-4 text-violet-300" />
          Describe your show requirement
        </label>
        <textarea
          id="requirement"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          rows={4}
          placeholder="e.g. We're casting for a late-night comedy series and need witty, relatable creators who make relatable urban sketches for a Gen Z audience..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-violet-400/50 focus:bg-white/[0.07]"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setRequirement(example)}
              className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-violet-400/30 hover:text-foreground"
            >
              {example.length > 46 ? `${example.slice(0, 46)}…` : example}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="niche"
            className="text-sm font-medium text-foreground"
          >
            Preferred niche
          </label>
          <div className="relative">
            <select
              id="niche"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className={cn(selectClass, 'capitalize')}
            >
              <option value="any">Any niche</option>
              {NICHES.map((n) => (
                <option key={n} value={n} className="capitalize">
                  {n}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="age"
            className="text-sm font-medium text-foreground"
          >
            Target audience age
          </label>
          <div className="relative">
            <select
              id="age"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className={selectClass}
            >
              <option value="any">Any age group</option>
              {AGE_GROUPS.map((age) => (
                <option key={age} value={age}>
                  {AGE_LABELS[age]}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40 active:scale-[0.99]"
      >
        <Search className="h-4 w-4" />
        Find matching creators
      </button>
    </form>
  )
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
