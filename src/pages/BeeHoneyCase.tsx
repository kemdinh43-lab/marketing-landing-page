import ResponsiveImage from '../ResponsiveImage'
import { useEffect, useRef, useState } from 'react'
import { suppliedMockups } from '../artworkAssets'
import SuppliedArtwork from '../ArtworkImage'
import './BeeArtwork.css'
import './BeeHoneyCase.css'
import BeeResults from './BeeResults'
import './BeeScale.css'

// Illustrative photography and user-supplied complete device mockups.
const spaPhotos = {
  hero: '/images/bee-case/bee-honey-storefront.webp',
  treatment: '/images/bee-case/unsplash-spa-room.webp',
}

const channels = [
  { key: 'maps', number: '01', icon: 'map', title: 'Google Maps', purpose: 'Tìm thấy & đánh giá', href: 'https://maps.app.goo.gl/reyuWbqBnmDX8aAX9' },
  { key: 'mobile', number: '02', icon: 'web', title: 'Website', purpose: 'Tìm hiểu dịch vụ', href: 'https://beehoneyspa.com/' },
  { key: 'instagram', number: '03', icon: 'social', title: 'Instagram', purpose: 'Hình dung trải nghiệm', href: 'https://www.instagram.com/beehoneyspa0803/' },
  { key: 'klook', number: '04', icon: 'ticket', title: 'Klook', purpose: 'Đặt dịch vụ thuận tiện', href: 'https://www.klook.com/en-US/activity/176077-premium-massage-spa-treatments-in-da-nang-by-bee-honey-spa/' },
] as const

function ChannelIcon({ type }: { type: string }) {
  if (type === 'map') return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 25s8-8.2 8-14A8 8 0 0 0 6 11c0 5.8 8 14 8 14Z"/><circle cx="14" cy="11" r="2.7"/></svg>
  if (type === 'web') return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="5" width="21" height="16" rx="2"/><path d="M10 25h8M14 21v4"/></svg>
  if (type === 'social') return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="20" height="20" rx="6"/><circle cx="14" cy="14" r="4.7"/><circle cx="20" cy="8" r="1" fill="currentColor" stroke="none"/></svg>
  return <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7.5h18v5c-3.2 0-3.2 3 0 3v5H5v-5c3.2 0 3.2-3 0-3z"/><path d="M14 8v12" strokeDasharray="2 2"/></svg>
}

type ChannelKey = (typeof channels)[number]['key']
type Device = 'desktop' | 'mobile'

function TouchpointShowcase() {
  const readPreview = (): ChannelKey => {
    const value = new URLSearchParams(window.location.search).get('preview')
    return channels.find(item => item.key === value)?.key ?? 'maps'
  }
  const [selected, setSelected] = useState<ChannelKey>(readPreview)
  const [device, setDevice] = useState<Device>('mobile')
  const [expandedDevice, setExpandedDevice] = useState<Device>('mobile')
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const channel = channels.find(item => item.key === selected)!
  const artworkKey = selected === 'mobile' ? 'website' : selected
  const desktopArtwork = suppliedMockups[`${artworkKey}-desktop`]
  const mobileArtwork = suppliedMockups[`${artworkKey}-mobile`]
  useEffect(() => {
    const restore = () => setSelected(readPreview())
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [])
  useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previous }
  }, [expanded])
  const choose = (key: ChannelKey) => {
    setSelected(key)
    const url = new URL(window.location.href)
    url.searchParams.set('preview', key)
    window.history.replaceState(window.history.state, '', url)
  }
  const open = (mode: Device) => { setExpandedDevice(mode); setExpanded(true) }
  const deviceSwitch = (inDialog = false) => <div className="bee-device-switch" role="group" aria-label="Chọn kích thước bản xem">
    {(['desktop', 'mobile'] as const).map(mode => <button key={mode} type="button" aria-pressed={(inDialog ? expandedDevice : device) === mode} onClick={() => inDialog ? setExpandedDevice(mode) : setDevice(mode)}>{mode === 'desktop' ? 'Desktop' : 'Mobile'}</button>)}
  </div>
  return <section className="bee-strategy bee-touchpoints" id="bee-showcase" aria-labelledby="bee-strategy-title">
    <div className="container bee-strategy-panel">
      <div className="bee-strategy-heading"><h2 id="bee-strategy-title">Bốn điểm chạm.<br/><span>Một mục tiêu chung.</span></h2></div>
      <div className="bee-channel-grid" role="group" aria-label="Chọn kênh để xem giao diện">
        {channels.map(item => <button className="bee-channel" type="button" key={item.key} aria-pressed={selected === item.key} aria-controls="bee-combined-preview" onClick={() => choose(item.key)}><span className="bee-channel-number">{item.number}</span><span className="bee-channel-symbol"><ChannelIcon type={item.icon}/></span><span><strong><span className="bee-channel-full-name">{item.title}</span>{item.key === 'maps' && <span className="bee-channel-short-name">Maps</span>}</strong><span className="bee-channel-purpose">{item.purpose}</span></span><span className="bee-channel-arrow" aria-hidden="true">{selected === item.key ? '←' : '→'}</span></button>)}
      </div>
      <div className="bee-combined-preview" id="bee-combined-preview" role="region" aria-label={`Giao diện ${channel.title}`}>
        <div className="bee-preview-topline"><span aria-live="polite">{channel.title} / Bee Honey Spa</span><span className="bee-inline-device-switch">{deviceSwitch()}</span></div>
        <div className={`bee-combined-stage bee-device-${device}`}>
          <button className="bee-artwork-laptop" type="button" onClick={() => open('desktop')} aria-label={`Phóng lớn ${channel.title} Desktop`}><SuppliedArtwork artwork={desktopArtwork} label={`Mockup laptop ${channel.title} do bạn cung cấp`}/></button>
          <button className="bee-artwork-phone" type="button" onClick={() => open('mobile')} aria-label={`Phóng lớn ${channel.title} Mobile`}><SuppliedArtwork artwork={mobileArtwork} label={`Mockup iPhone ${channel.title} do bạn cung cấp`}/></button>
        </div>
        <div className="bee-combined-footer"><button type="button" onClick={() => open(device)}>Phóng lớn <span aria-hidden="true">⤢</span></button><a href={channel.href} target="_blank" rel="noopener noreferrer">Mở kênh thực tế <span aria-hidden="true">↗</span></a></div>
        
      </div>
    </div>
    <dialog ref={dialog} className="bee-lightbox" aria-labelledby="bee-lightbox-title" onClose={() => setExpanded(false)} onClick={event => { if (event.target === dialog.current) dialog.current?.close() }}>
      <div className="bee-lightbox-content"><header><h3 id="bee-lightbox-title">{channel.title} / Bee Honey Spa</h3><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Đóng bản xem">Đóng ×</button></header>{deviceSwitch(true)}<div className={`bee-expanded-artwork bee-expanded-artwork-${expandedDevice}`}><SuppliedArtwork artwork={expandedDevice === 'desktop' ? desktopArtwork : mobileArtwork} label={`Mockup ${channel.title} ${expandedDevice}`} expanded/></div><a className="bee-expanded-link" href={channel.href} target="_blank" rel="noopener noreferrer">Mở {channel.title} thực tế ↗</a></div>
    </dialog>
  </section>
}

export default function BeeHoneyCase() {
  useEffect(() => {
    if (window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView())
  }, [])
  return <main className="bee-page" id="main-content"><div id="top"/>
    <section className="bee-hero" aria-labelledby="bee-title">
      <div className="container">
        <div className="bee-project-topline"><a href="/#work">← Tất cả dự án</a></div>
        <div className="bee-hero-heading">
          <div><p className="bee-eyebrow">BEE HONEY SPA · ĐÀ NẴNG</p><h1 id="bee-title">Một điểm đến.<br/><span>Nhiều kết nối.</span></h1></div>
          <div className="bee-hero-summary"><span className="bee-project-mark" aria-hidden="true">↗</span><p>Từ một địa điểm spa đến hệ sinh thái hiện diện và đặt dịch vụ trực tuyến.</p><a href="#bee-showcase">Khám phá dự án <span aria-hidden="true">↓</span></a></div>
        </div>
        <figure className="bee-hero-visual bee-hero-visual--storefront">
          <ResponsiveImage sizes="(max-width: 820px) 100vw, 1200px" src={spaPhotos.hero} alt="Mặt tiền Bee Honey Spa với bảng tên trên nền gỗ và đèn lồng" width="829" height="1020" fetchPriority="high"/>
        </figure>
        <div className="bee-project-meta"><div><span>LĨNH VỰC</span><strong>Spa & wellness</strong></div><div><span>ĐỊA ĐIỂM</span><strong>Đà Nẵng, Việt Nam</strong></div><div><span>CÁC ĐIỂM CHẠM</span><p>Website · Google Maps<br/>Instagram · Klook</p></div><a href="https://beehoneyspa.com/" target="_blank" rel="noopener noreferrer">Ghé thăm website <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="bee-statement" aria-labelledby="bee-statement-title">
      <div className="container bee-statement-grid"><div><h2 id="bee-statement-title">Một trải nghiệm spa tốt cần được tìm thấy <span>đúng lúc, đúng cách.</span></h2><p className="bee-body-copy">Chúng tôi xây dựng các điểm chạm digital giúp khách quốc tế dễ dàng khám phá dịch vụ, tin tưởng và đặt lịch theo cách phù hợp với họ.</p></div></div>
    </section>

    <TouchpointShowcase/>

    <BeeResults/>

    <section className="bee-insight" aria-labelledby="bee-insight-title"><div className="container bee-insight-grid"><figure className="bee-insight-photo"><ResponsiveImage sizes="(max-width: 700px) 100vw, 600px" src={spaPhotos.treatment} alt="Phòng massage sáng và thoáng, ảnh minh họa từ Unsplash" width="1600" height="1067" loading="lazy" decoding="async"/><figcaption>Ảnh minh họa / Unsplash</figcaption></figure><div className="bee-insight-copy"><h2 id="bee-insight-title">Đơn giản hơn.<br/><span>Kết nối hơn.</span></h2><p>Một hệ sinh thái digital đơn giản, dễ tiếp cận. Mỗi kênh có một vai trò rõ ràng: giúp khách tìm thấy, tìm hiểu và lựa chọn dịch vụ theo cách thuận tiện với họ.</p><a href="#bee-showcase">Xem các điểm chạm <span aria-hidden="true">↗</span></a></div></div></section>

    <section className="bee-ending" aria-labelledby="bee-ending-title"><div className="container bee-ending-panel"><div className="bee-ending-grid"><div><h2 id="bee-ending-title">Spa của bạn đang thiếu<br/><span>điểm chạm nào?</span></h2><p>Cùng xem điều gì nên ưu tiên trong hành trình digital của doanh nghiệp bạn.</p></div><a className="bee-ending-button" href="/#contact"><span className="bee-ending-arrow" aria-hidden="true">↗</span><span>Đánh giá hệ thống hiện tại</span></a></div></div></section>
  </main>
}
