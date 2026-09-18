import { SiteNav } from '@/components/site-nav'
import { TrendingView } from '@/components/trending-view'

export default function TrendingPage() {
  return (
    <div className="min-h-screen bg-aurora">
      <SiteNav />
      <TrendingView />
    </div>
  )
}
