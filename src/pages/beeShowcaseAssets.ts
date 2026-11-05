/** Original screenshots supplied by the user; each channel has its own device captures. */
const base = '/images/bee-case/screens/'
export const beeShowcaseAssets = {
  channelDesktop: { maps: base + 'google-desktop.webp', instagram: base + 'instagram-desktop.webp', klook: base + 'klook-desktop.webp' },
  desktop: base + 'website-desktop.webp',
  mobile: base + 'website-mobile.webp',
  maps: base + 'google-mobile.webp',
  instagram: base + 'instagram-mobile.webp',
  klook: base + 'klook-mobile.webp',
}
export const beeScreenshotSizes: Record<string, {width: number; height: number}> = {
  "/images/bee-case/screens/website-desktop.webp": {
    "width": 2910,
    "height": 1558
  },
  "/images/bee-case/screens/website-mobile.webp": {
    "width": 550,
    "height": 944
  },
  "/images/bee-case/screens/instagram-desktop.webp": {
    "width": 2880,
    "height": 1480
  },
  "/images/bee-case/screens/instagram-mobile.webp": {
    "width": 550,
    "height": 1066
  },
  "/images/bee-case/screens/klook-desktop.webp": {
    "width": 2906,
    "height": 1484
  },
  "/images/bee-case/screens/klook-mobile.webp": {
    "width": 442,
    "height": 870
  },
  "/images/bee-case/screens/google-desktop.webp": {
    "width": 2912,
    "height": 1480
  },
  "/images/bee-case/screens/google-mobile.webp": {
    "width": 410,
    "height": 794
  }
}
