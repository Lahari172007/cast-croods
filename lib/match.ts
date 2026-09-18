import { creators, type AgeGroup, type Creator, type Niche } from './creators'

export interface SearchCriteria {
  requirement: string
  niche: Niche | 'any'
  ageGroup: AgeGroup | 'any'
}

export interface MatchResult {
  creator: Creator
  score: number
  reasons: string[]
  matchedKeywords: string[]
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'with', 'we',
  'our', 'is', 'are', 'be', 'need', 'needs', 'want', 'looking', 'look', 'who',
  'that', 'this', 'show', 'shows', 'creator', 'creators', 'someone', 'people',
  'audience', 'content', 'making', 'make', 'about', 'their', 'has', 'have',
  'can', 'should', 'would', 'like', 'good', 'great', 'us', 'my', 'me', 'i',
])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

function buildHaystack(creator: Creator): string {
  return [
    creator.niche,
    creator.bio,
    creator.tone.join(' '),
    creator.keywords.join(' '),
    creator.location,
    creator.language,
    creator.platform,
  ]
    .join(' ')
    .toLowerCase()
}

const NICHE_SYNONYMS: Record<Niche, string[]> = {
  comedy: ['funny', 'humor', 'humour', 'laugh', 'skit', 'standup', 'satire'],
  dance: ['dancing', 'choreography', 'choreo', 'moves', 'hiphop'],
  cooking: ['food', 'recipe', 'chef', 'kitchen', 'cuisine', 'baking'],
  tech: ['technology', 'gadget', 'coding', 'developer', 'software', 'ai'],
  fitness: ['workout', 'gym', 'yoga', 'health', 'training', 'wellness'],
  fashion: ['style', 'styling', 'outfit', 'clothing', 'ootd', 'wear'],
  beauty: ['makeup', 'skincare', 'cosmetics', 'glam', 'grooming'],
  travel: ['trip', 'wander', 'vlog', 'adventure', 'tourism', 'explore'],
  education: ['learning', 'teacher', 'tutor', 'study', 'exam', 'academic'],
  gaming: ['gamer', 'esports', 'stream', 'streamer', 'game', 'play'],
  music: ['singer', 'song', 'rap', 'musician', 'cover', 'instrumental'],
  storytelling: ['story', 'stories', 'narration', 'poetry', 'shayari', 'narrative'],
  lifestyle: ['daily', 'routine', 'vlog', 'wellness', 'minimalism', 'decor'],
  sports: ['athlete', 'cricket', 'football', 'match', 'sport', 'training'],
  art: ['artist', 'painting', 'sketch', 'illustration', 'drawing', 'creative'],
}

export function matchCreators(criteria: SearchCriteria): MatchResult[] {
  const tokens = tokenize(criteria.requirement)
  const tokenSet = new Set(tokens)

  const results = creators.map((creator) => {
    let score = 0
    const reasons: string[] = []
    const matchedKeywords = new Set<string>()

    const haystack = buildHaystack(creator)

    // 1. Explicit niche filter selection (strong signal).
    if (criteria.niche !== 'any') {
      if (creator.niche === criteria.niche) {
        score += 40
        reasons.push(`Specializes in ${creator.niche}, your selected niche`)
      } else {
        score -= 18
      }
    }

    // 2. Age group alignment.
    if (criteria.ageGroup !== 'any') {
      if (creator.audienceAge === criteria.ageGroup) {
        score += 18
        reasons.push(`Audience skews ${creator.audienceAge}, matching your target`)
      } else {
        score -= 6
      }
    }

    // 3. Keyword overlap with the creator's keywords + bio + tone.
    let keywordHits = 0
    for (const token of tokenSet) {
      if (haystack.includes(token)) {
        keywordHits += 1
        matchedKeywords.add(token)
      }
    }
    if (keywordHits > 0) {
      score += Math.min(keywordHits * 9, 36)
    }

    // 4. Requirement mentions this niche (or a synonym) even without the dropdown.
    const nicheHitFromText =
      tokenSet.has(creator.niche) ||
      NICHE_SYNONYMS[creator.niche].some((syn) => tokenSet.has(syn))
    if (nicheHitFromText && criteria.niche === 'any') {
      score += 22
      reasons.push(`Requirement points toward ${creator.niche} content`)
    }

    // 5. Tone alignment surfaced explicitly.
    const toneHits = creator.tone.filter((t) => haystack && tokenSet.has(t))
    if (toneHits.length > 0) {
      score += toneHits.length * 4
      reasons.push(`Tone reads as ${toneHits.join(', ')}`)
    }

    // 6. Engagement quality bonus (well-engaged creators are safer bets).
    score += Math.min(creator.engagementRate, 10)

    // Reasoning fallbacks so every card has something to say.
    if (matchedKeywords.size > 0 && reasons.length < 3) {
      reasons.push(
        `Overlaps on ${Array.from(matchedKeywords).slice(0, 3).join(', ')}`,
      )
    }
    if (reasons.length === 0) {
      reasons.push(
        `Strong ${creator.engagementRate}% engagement in the ${creator.niche} space`,
      )
    }

    const normalized = Math.max(0, Math.min(100, Math.round(score)))

    return {
      creator,
      score: normalized,
      reasons: reasons.slice(0, 3),
      matchedKeywords: Array.from(matchedKeywords),
    }
  })

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.creator.engagementRate - a.creator.engagementRate
  })
}

export function buildReasoningLine(result: MatchResult): string {
  const { creator, matchedKeywords, score } = result
  if (score >= 75) {
    return `Excellent fit — ${creator.name} lives in ${creator.niche}${
      matchedKeywords.length ? ` and hits on ${matchedKeywords.slice(0, 2).join(' & ')}` : ''
    }, with ${creator.engagementRate}% engagement to back it up.`
  }
  if (score >= 50) {
    return `Solid match — ${creator.niche} focus${
      matchedKeywords.length ? `, overlapping on ${matchedKeywords.slice(0, 2).join(' & ')}` : ''
    }, and a ${creator.tone[0]} tone your brief hints at.`
  }
  return `Worth a look — adjacent ${creator.niche} creator with a ${creator.tone[0]} voice and healthy ${creator.engagementRate}% engagement.`
}
