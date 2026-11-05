import { useState } from 'react'
import SuppliedArtwork from './ArtworkImage'
import { suppliedBrands } from './artworkAssets'
import './LogoMarquee.css'

export default function LogoMarquee() {
  const [paused, setPaused] = useState(false)
  return <section className="trust-section" aria-label="Kinh nghiệm từ những dự án thực tế">
    <div className="container">
      <div className="trust-heading"><p className="section-kicker">Kinh nghiệm từ những dự án thực tế</p><button type="button" className="trust-motion-control" aria-label={paused ? 'Chạy dải logo' : 'Tạm dừng dải logo'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Chạy' : 'Tạm dừng'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div>
      <div className={`trust-marquee${paused ? ' is-paused' : ''}`}>
        <div className="trust-marquee-track">
          {[0,1].map(copy => <div className="trust-logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {suppliedBrands.map(brand => <div className={`trust-logo trust-logo-${brand.name === 'KP' ? 'kp' : 'brand'}`} key={brand.name}><SuppliedArtwork artwork={brand} label={brand.name}/></div>)}
          </div>)}
        </div>
      </div>
    </div>
  </section>
}
