# AGENTS.md — Sidhu's Views Project Guidelines & Editorial Rules

## Project Overview
Sidhu's Views is an aesthetic, personal online magazine exploring slow living, budget home decor, handmade crafting, and nostalgic Indian memories.

## Permanent Editorial & Language Settings

### 1. Author Identity
- **Author**: Gurdeep Sidhu
- **Hindi Spelling**: **गुरदीप सिधू** (बड़ी 'ू' की मात्रा, बिना किसी आधे 'द' के).
- **Gender**: Female / **लेखिका** (Always use लेखिका in Hindi, never लेखक; feminine past verbs: रही थी, आई थी, की थी).
- **Hindi Byline & Bio Standard**: Use the smart hybrid format: **`लेखिका: गुरदीप सिधू (Gurdeep Sidhu)`** for bylines and author bio boxes to ensure cultural resonance, brand clarity, and searchability.

### 2. Literary Style: R.K. Narayan Observational Humor
- Warm, gentle, Malgudi-style storytelling with witty observations on Indian family life, everyday quirks, and nostalgic moments that naturally bring a smile to readers' faces.
- Realistic details, relatable Indian homes, zero pretense.

### 3. Bilingual Parity Standard (English & Hinglish)
- Every article must have complete parity between English and Hindi.
- **Never a mechanical or pure textbook Hindi translation**: Use natural conversational **Hinglish** (modern Hindi woven with everyday English words written in Devanagari) to preserve charm, warmth, and easy readability.
- **Identical Narrative Structure**: Keep every scene, character, comedic nuance, and itemized tip intact across both versions.

### 4. Personal Memoirs & Authentic Nostalgia
- **Never fabricate family members or inject artificial routines**: When Gurdeep shares a personal real-life memory, never invent characters (e.g., father reading newspaper on veranda) or assume false weekly habits. Respect the actual family members involved (e.g. Mother, sisters, brother Raju).
- **Accurate 90s Historical Context**: In 1990s Indian childhood stories, always capture the true screen-free atmosphere (no mobile phones, kids playing together), the reality of fast food (strictly not allowed daily, not a trend; outside treats like halwai samosas were rare, cherished events with sky-high sibling excitement).

### 5. Technical Publishing Standards
- Always maintain bidirectional `hreflang` tags (`en`, `hi`, `x-default`).
- Always include an on-page bilingual toggle switcher.
- Register all new articles in `articles.json` and run `python publish.py --validate` and `python publish.py --build`.
