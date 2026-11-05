# GitHub / Vercel handoff verification

- Clean npm ci: passed. Strict TypeScript: passed. Production build: passed.
- Verified all 15 image sources and responsive variants, local fonts, route metadata, Linux native build dependency in lockfile, and Vercel configuration.
- npm audit --omit=dev: zero vulnerabilities reported. This excludes development dependencies.
- Landing and case study checked at 1440, 1024, 768, 390 and 375px: no horizontal overflow or broken images detected. Local fonts loaded.
- Mobile navigation and landing-to-case-study link worked.
- Mobile image dialog opened, switched to Desktop, and closed via Escape. Modal device state was subsequently separated from inline device state so the original trigger remains visible when closing. Final automated focus-return verification was interrupted by the Chrome connection; it is not reported as completed.
- Vercel rewrites/cache configuration checked statically. No Vercel deployment was performed.

## Assets

Original public directory: 14,927,863 bytes. Packaged public directory: 4,545,091 bytes, including responsive variants and local fonts. Reduction: 69.6%.

Screenshots use high-quality WebP at original dimensions, plus smaller variants; statistical screenshots use lossless WebP. Original PNG files remain in the earlier working project.

## Remaining integration

Contact form is a frontend demo and does not send leads. Footer has pending contact/agency content. No credentials are included. A final domain was not provided, so domain-specific canonical URLs and a sitemap should be added after domain configuration.

## Supplied artwork update

- Replaced code-built device frames with eight supplied laptop/iPhone artworks, including the separately supplied Klook iPhone. Standardized device display sizes.
- Four supplied logos replace the landing text strip; white background, continuous scrolling with pause control and reduced-motion fallback.
- Strict TypeScript, production build and asset checks passed after the update. Asset check includes all 24 artwork/preview files.
- Desktop Maps artwork was visually verified on the blue panel at 1440px with no horizontal overflow. Full post-update mobile/browser verification was not completed: local browser use was disabled in Work settings.
- Previous verification above applies to the earlier release; previous asset byte totals exclude the new supplied artwork.
