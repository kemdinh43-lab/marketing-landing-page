import { useId } from 'react'
import type { Artwork } from './artworkAssets'

/** Use the supplied artwork directly; the vector clip only hides its white exterior. */
export default function SuppliedArtwork({artwork, label, expanded = false}: {artwork: Artwork; label: string; expanded?: boolean}) {
  const id = `artwork-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return <svg className="supplied-artwork" viewBox={artwork.viewBox} preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
    {artwork.outline && <defs><clipPath id={id} clipPathUnits="userSpaceOnUse"><path d={artwork.outline}/></clipPath></defs>}
    <image href={expanded ? artwork.src : artwork.preview} width={artwork.width} height={artwork.height} clipPath={artwork.outline ? `url(#${id})` : undefined}/>
  </svg>
}
