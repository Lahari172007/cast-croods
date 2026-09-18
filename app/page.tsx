import { Sparkles, Target, TrendingUp, Users } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SearchForm } from '@/components/search-form'
import { creators } from '@/lib/creators'

const stats = [
  { label: 'Creators indexed', value: `${creators.length}` },
  { label: 'Niches covered', value: '15' },
  { label: 'Avg. engagement', value: '7.6%' },
  { label: 'Languages', value: '11' },
]

const features = [
  {
    icon: Target,
    title: 'Requirement-aware matching',
    body: 'Describe the show in plain language. We rank creators by niche, tone and keyword relevance instantly.',
  },
  {
    icon: Sparkles,
    title: 'Explainable match scores',
    body: 'Every profile carries a 0-100 score and a short reasoning line so casting decisions are defensible.',
  },
  {
    icon: TrendingUp,
    title: 'Trending intelligence',
    body: 'A weekly leaderboard surfaces the creators pulling the strongest engagement right now.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-aurora">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-5 pb-24">
        <section className="grid items-start gap-10 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Talent discovery for production houses
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Cast the right creators for{' '}
              <span className="text-gradient">every show</span>
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              CAST CROODS matches your show requirements against a curated roster
              of social media creators — ranked, scored and explained, so you
              spend less time scouting and more time producing.
            </p>

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-3"
                >
                  <dt className="text-[11px] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-xl font-bold text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <SearchForm />
        </section>

        <section className="mt-24">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-violet-300" />
            Built for casting teams
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/8 bg-card/40 p-6 transition-colors hover:border-violet-400/25"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-200">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
