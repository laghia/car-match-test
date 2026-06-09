# RACV Car Match — User Testing Prototype

A high-fidelity recreation of the [RACV Car Match landing page](https://www.racv.com.au/car-match.html) built for inserting and testing new screens in the user flow.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## What's included

- Hero banner with RACV branding, journey-line graphics, and hero image
- Car search filter (Make, Model, Fuel type, Body type)
- Category tiles (Electric, Hybrids, Family, Utes, etc.)
- Feature comparison section
- Article grids (EV news, reviews, advice)
- Award-winning finance banner
- Finance product tiles
- Mock search results page

## Inserting a new screen in the flow

1. Open `src/flow/config.ts`
2. Set `enableNewScreen: true`
3. Build your screen in `src/pages/NewScreenPage.tsx`

**Flow with new screen enabled:**
```
Landing page → Your new screen → Search results
```

**Flow with new screen disabled (default):**
```
Landing page → Search results
```

Search filters and category selections pass query parameters through the flow automatically.

## Customisation

| File | Purpose |
|------|---------|
| `src/flow/config.ts` | Toggle new screen, configure paths |
| `src/pages/NewScreenPage.tsx` | Your prototype screen |
| `src/pages/SearchPage.tsx` | Mock search results |
| `src/data/content.ts` | Page content and image URLs |

## Notes

- Images are loaded from the live RACV CDN for visual fidelity
- This is a prototype for user testing — not connected to RACV's backend
- Header/footer are simplified recreations of the RACV site chrome
