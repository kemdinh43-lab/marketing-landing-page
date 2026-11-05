import SuppliedArtwork from '../ArtworkImage'
import { useEffect, useRef, useState } from 'react'
import './BeeResults.css'

// Values transcribed from the screenshots supplied by the user, not growth estimates.
const metrics = [
  { value: 10601, label: 'Người xem hồ sơ Google', source: 'Google Business Profile', period: 'Tháng 6 – tháng 11/2026' },
  { value: 5024, label: 'Lượt xem Instagram', source: 'Instagram Insights', period: '90 ngày · 05/08 – 03/11 theo ảnh' },
  { value: 727, label: 'Người xem Instagram', source: 'Instagram Insights', period: '90 ngày · 05/08 – 03/11 theo ảnh' },
]
const evidence = [
  { src: '/images/bee-case/evidence/google-performance-cutout.png', viewBox: '18 93 541 268', title: 'Hiện diện trên Google', platform: 'GOOGLE BUSINESS PROFILE', detail: 'Tổng quan hồ sơ và các cụm từ tìm kiếm · tháng 6 – tháng 11/2026', width: 577, height: 433 },
  { src: '/images/bee-case/evidence/instagram-insights-cutout.png', viewBox: '182 9 211 415', title: 'Nội dung trên Instagram', platform: 'INSTAGRAM INSIGHTS', detail: 'Lượt xem, người xem và loại nội dung · 90 ngày theo ảnh', width: 577, height: 433 },
]
const format = (value: number) => new Intl.NumberFormat('vi-VN').format(value)

export default function BeeResults() {
  const section = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [progress, setProgress] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => {
    let frame = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finish = () => { cancelAnimationFrame(frame); setProgress(1) }
    reduced.addEventListener('change', finish)
    if (reduced.matches) finish()
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      if (reduced.matches) { finish(); return }
      let start: number | undefined
      const tick = (time: number) => {
        start ??= time
        const elapsed = Math.min((time - start) / 1600, 1)
        setProgress(1 - Math.pow(1 - elapsed, 3))
        if (elapsed < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: .2 })
    if (section.current) observer.observe(section.current)
    return () => { observer.disconnect(); cancelAnimationFrame(frame); reduced.removeEventListener('change', finish) }
  }, [])
  useEffect(() => {
    if (selected === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previous }
  }, [selected])
  return <section className="bee-results" id="bee-results" aria-labelledby="bee-results-title">
    <div className="container">
      <div className="bee-results-heading"><div><h2 id="bee-results-title">Những con số.<br/><span>Từ các điểm chạm.</span></h2></div></div>
      <div ref={section} className="bee-metrics" aria-label="Key metrics">
        {metrics.map(metric => <div className="bee-metric" key={metric.label}>
          
          <strong aria-label={`${format(metric.value)} ${metric.label}`}><span aria-hidden="true">{format(Math.round(metric.value * progress))}</span></strong>
          <p className="bee-metric-label">{metric.label}</p><p className="bee-metric-period">{metric.period}</p>
        </div>)}
      </div>
      
      <div className="bee-evidence-heading"><h3>Phía sau những con số</h3></div>
      <div className="bee-evidence-gallery">
        {evidence.map((item, index) => <figure className={`bee-evidence-card bee-evidence-card-${index}`} key={item.src}>
          <button type="button" onClick={() => setSelected(index)} aria-label={`Phóng lớn thống kê ${item.platform}`}><SuppliedArtwork artwork={{...item, preview: item.src}} label={`Ảnh thống kê ${item.platform} do khách hàng cung cấp`}/></button>
          <figcaption><h3>{item.title}</h3></figcaption>
        </figure>)}
      </div>
    </div>
    <dialog ref={dialog} className="bee-lightbox bee-evidence-lightbox" aria-labelledby="bee-evidence-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === dialog.current) dialog.current?.close() }}>
      {selected !== null && <div className="bee-lightbox-content"><header><h3 id="bee-evidence-dialog-title">{evidence[selected].title}</h3><button type="button" autoFocus aria-label="Đóng ảnh thống kê" onClick={() => dialog.current?.close()}>Đóng ×</button></header><p>{evidence[selected].detail}</p><div className={`bee-evidence-expanded bee-evidence-expanded-${selected}`}><SuppliedArtwork artwork={{...evidence[selected], preview: evidence[selected].src}} label={`Ảnh thống kê đầy đủ ${evidence[selected].platform}`}/></div></div>}
    </dialog>
  </section>
}
