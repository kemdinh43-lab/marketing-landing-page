import SuppliedArtwork from './ArtworkImage'
import { suppliedBrands } from './artworkAssets'
import './LogoMarquee.css'

export default function LogoMarquee() {
  return <section className="trust-section trust-strip" aria-label="Kinh nghiệm từ những dự án thực tế">
    <div className="container">
      <div className="trust-marquee" tabIndex={0} aria-label="Logo các dự án; giữ con trỏ hoặc chọn dải logo để tạm dừng">
        <div className="trust-marquee-track">
          {[0,1].map(copy => <div className="trust-logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {suppliedBrands.map(brand => <div className={`trust-logo trust-logo-${brand.name === 'KP' ? 'kp' : 'brand'}`} key={brand.name}><SuppliedArtwork artwork={brand} label={brand.name}/></div>)}
          </div>)}
        </div>
      </div>
    </div>
  </section>
}
