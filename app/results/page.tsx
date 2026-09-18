import { SiteNav } from '@/components/site-nav'
import { ResultsView } from '@/components/results-view'
import { AGE_GROUPS, NICHES, type AgeGroup, type Niche } from '@/lib/creators'
import type { SearchCriteria } from '@/lib/match'

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; niche?: string; age?: string }>
}) {
  const params = await searchParams

  const niche =
    params.niche && NICHES.includes(params.niche as Niche)
      ? (params.niche as Niche)
      : 'any'
  const ageGroup =
    params.age && AGE_GROUPS.includes(params.age as AgeGroup)
      ? (params.age as AgeGroup)
      : 'any'

  const criteria: SearchCriteria = {
    requirement: params.q ?? '',
    niche,
    ageGroup,
  }

  return (
    <div className="min-h-screen bg-aurora">
      <SiteNav />
      <ResultsView criteria={criteria} />
    </div>
  )
}
