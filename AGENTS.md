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
- **Mandatory Bilingual Publication**: Every future article published on Sidhu's Views MUST ALWAYS be created as a synchronized bilingual pair: an English edition (`article-[slug].html`) and a natural Hindi edition (`article-[slug]-hi.html`).
- **Natural, Elegant Hindi (Strictly No Awkward Transliterations)**:
  - Never phonetically transliterate English lifestyle/buzzwords into Devanagari (e.g., NEVER write "डीक्लटर", "एस्थेटिक" repeated excessively, "रीडिंग नुक", "वॉल मोमेंट", "विजुअल शोर", "ट्यूटोरियल").
  - Always use natural, culturally grounded Hindi phrases:
    - *Declutter / Decluttering* &rarr; "फालतू सामान की छंटाई (Decluttering)" / "कबाड़ और गैर-ज़रूरी सामान हटाना"
    - *Aesthetic* &rarr; "खूबसूरत", "सलीकेदार", "शांत", "मनभावन", "आकर्षक"
    - *Reading Nook* &rarr; "किताबों का कोना (Reading Nook)" / "रीडिंग कॉर्नर" / "पढ़ने का शांत कोना"
    - *Accent Wall / Wall Moment* &rarr; "दीवार का एक खूबसूरत कोना (Accent Wall)"
    - *Visual Noise / Clutter* &rarr; "आंखों को चुभने वाला बिखराव"
    - *Tutorial* &rarr; "आसान विधि / गाइड (Step-by-step Guide)"
  - When an English technical or SEO keyword is helpful, mention it gracefully in English/brackets alongside the genuine Hindi term (e.g., *फालतू सामान की छंटाई (Decluttering)*).
- **Never a mechanical or pure textbook Hindi translation**: Use warm, conversational modern Hindi woven naturally with common everyday words.
- **Identical Narrative Structure**: Keep every scene, character, comedic nuance, and itemized tip intact across both versions.

### 4. Personal Memoirs & Authentic Nostalgia
- **Never fabricate family members or inject artificial routines**: When Gurdeep shares a personal real-life memory, never invent characters (e.g., father reading newspaper on veranda) or assume false weekly habits. Respect the actual family members involved (e.g. Mother, sisters, brother Raju).
- **Accurate 90s Historical Context**: In 1990s Indian childhood stories, always capture the true screen-free atmosphere (no mobile phones, kids playing together), the reality of fast food (strictly not allowed daily, not a trend; outside treats like halwai samosas were rare, cherished events with sky-high sibling excitement).
- **Household Context for Girls & Boys**: In Gurdeep's household stories, girls stayed comfortably indoors (chatting on the veranda, playing carrom or ludo, helping at home); they did NOT play gully cricket in the street. Gully cricket was played exclusively by her brother Raju with neighborhood boys.
- **Dining Custom**: Family meals were never eaten inside the kitchen (rasoi). A cotton durrie was spread across the floor, and the family sat together on the durrie to eat.

### 5. Technical Publishing Standards
- Always create both English and Hindi editions together.
- Always include the top navigation bar toggle (`[ 🇮🇳 हिंदी में पढ़ें ]` on English / `[ 🇬🇧 Read in English ]` on Hindi) and the in-header bilingual badge pill.
- Always maintain bidirectional `hreflang` tags (`en`, `hi`, `x-default`) and self-referencing canonical tags.
- Always provide dual action buttons (`Read in English` + `🇮🇳 हिंदी में पढ़ें`) on `explore.html`, `index.html`, and `journal.html`.
- Register all new articles in `articles.json` and run `python publish.py --validate` and `python publish.py --build`.
