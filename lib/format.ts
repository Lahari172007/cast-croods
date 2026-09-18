export function formatFollowers(count: number): string {
  if (count >= 10000000) return `${(count / 10000000).toFixed(1)}Cr`
  if (count >= 100000) return `${(count / 100000).toFixed(1)}L`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return `${count}`
}

export function scoreTier(score: number): {
  label: string
  className: string
} {
  if (score >= 75)
    return {
      label: 'Excellent',
      className:
        'from-violet-500/90 to-fuchsia-500/90 text-white shadow-violet-500/30',
    }
  if (score >= 50)
    return {
      label: 'Strong',
      className: 'from-indigo-500/90 to-violet-500/90 text-white shadow-indigo-500/30',
    }
  if (score >= 25)
    return {
      label: 'Moderate',
      className: 'from-slate-600/90 to-indigo-600/80 text-white shadow-slate-500/20',
    }
  return {
    label: 'Low',
    className: 'from-slate-700/80 to-slate-600/70 text-slate-200 shadow-black/20',
  }
}
