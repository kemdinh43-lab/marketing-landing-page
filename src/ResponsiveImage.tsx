import type { ImgHTMLAttributes } from 'react'
import { imageAssets } from './imageAssets'
export default function ResponsiveImage({src, sizes = '100vw', ...props}: ImgHTMLAttributes<HTMLImageElement>) {
  const asset = src ? imageAssets[src] : undefined
  return <img decoding="async" {...props} src={src} srcSet={asset?.srcSet} sizes={asset ? sizes : undefined} width={asset?.width ?? props.width} height={asset?.height ?? props.height}/>
}
