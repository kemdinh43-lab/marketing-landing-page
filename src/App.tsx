import { lazy, Suspense, useEffect, useState, type FormEvent } from "react"
import ResponsiveImage from './ResponsiveImage'
import LogoMarquee from './LogoMarquee'
const BeeHoneyCase = lazy(() => import('./pages/BeeHoneyCase'))

const isBeeCase = window.location.pathname.replace(/\/$/, "") === "/du-an/bee-honey-spa"

const projects = [
  {
    index: "01",
    name: "Bee Honey Spa",
    type: "Spa & wellness",
    scope: "Website · Google Maps · Instagram · Klook",
    href: "/du-an/bee-honey-spa/",
    className: "project-card--yellow",
  },
  {
    index: "02",
    name: "Angel One Travel",
    type: "Tours & travel",
    scope: "Hệ sinh thái digital · Phạm vi cần xác nhận",
    href: "https://angelonetravel.vn/",
    className: "project-card--blue",
  },
  {
    index: "03",
    name: "Fiona Spa",
    type: "Spa & wellness",
    scope: "Hỗ trợ thiết lập Maps · Facebook · Instagram",
    href: "#contact",
    className: "project-card--coral",
  },
]

const faqs = [
  {
    question: "Chúng tôi có phải triển khai tất cả các kênh không?",
    answer:
      "Không. Kênh được chọn theo hành vi khách hàng, khả năng vận hành và ngân sách của doanh nghiệp. Mục tiêu là ưu tiên đúng, không phải xuất hiện ở mọi nơi.",
  },
  {
    question: "Có thể thuê một hạng mục riêng?",
    answer:
      "Có. Bạn có thể bắt đầu với website, Google Maps, SEO, quảng cáo hoặc OTA theo dự án; hình thức hợp tác định kỳ sẽ được trao đổi theo phạm vi thực tế.",
  },
  {
    question: "Ai sở hữu website, tài khoản và dữ liệu?",
    answer:
      "Quyền truy cập, vai trò quản trị và việc bàn giao sẽ được ghi rõ theo từng phạm vi trước khi triển khai, để doanh nghiệp luôn biết tài sản số của mình đang được quản lý thế nào.",
  },
  {
    question: "Làm remote thì phối hợp ra sao?",
    answer:
      "Bạn làm việc trực tiếp với người phụ trách chuyên môn. Phạm vi, đầu việc, kênh trao đổi và nhịp cập nhật được thống nhất ngay từ đầu.",
  },
  {
    question: "Buổi đánh giá ban đầu gồm những gì?",
    answer:
      "Chúng tôi xem nhanh hiện trạng website hoặc Google Maps bạn gửi, làm rõ vấn đề kinh doanh và trao đổi những ưu tiên có thể cải thiện ban đầu. Đây không phải cam kết một bản audit toàn diện miễn phí.",
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a
          className="brand"
          href={isBeeCase ? "/" : "#top"}
          aria-label="Hospitality Growth — về đầu trang"
        >
          <span className="brand-mark">h</span>
          <span>hospitality growth</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Mở menu</span>
        </button>
        <nav
          id="primary-navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          <a href={isBeeCase ? "/#solutions" : "#solutions"} onClick={() => setOpen(false)}>
            Giải pháp
          </a>
          <a href={isBeeCase ? "/#work" : "#work"} onClick={() => setOpen(false)}>
            Dự án
          </a>
          <a href={isBeeCase ? "/#process" : "#process"} onClick={() => setOpen(false)}>
            Cách làm việc
          </a>
          <a href={isBeeCase ? "/#team" : "#team"} onClick={() => setOpen(false)}>
            Về chúng tôi
          </a>
        </nav>
        <a className="button button-primary nav-cta" href={isBeeCase ? "/#contact" : "#contact"}>
          Nhận đánh giá
          <Arrow />
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Digital growth · Đà Nẵng — Hội An</p>
          <h1>
            Để khách hàng
            <br />
            tìm thấy. Và <span>chọn bạn.</span>
          </h1>
          <p className="hero-lead">
            Chúng tôi giúp doanh nghiệp spa, du lịch và dịch vụ tiếp cận khách
            quốc tế qua Google, website, OTA và quảng cáo — với các kênh được
            kết nối thay vì hoạt động rời rạc.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={isBeeCase ? "/#contact" : "#contact"}>
              Nhận đánh giá kênh marketing
              <Arrow />
            </a>
            <a className="text-link" href={isBeeCase ? "/#work" : "#work"}>
              Xem dự án thực tế
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div
          className="hero-collage"
          aria-label="Những khoảnh khắc hospitality tại Việt Nam"
        >
          <div className="shape shape-blue">
            <span>local</span>
            <span>growth</span>
          </div>
          <ResponsiveImage
            className="hero-image hero-image-main"
            src="/images/hospitality-food.webp" sizes="(max-width: 560px) 66vw, 400px" fetchPriority="high"
            alt="Những người phụ nữ cùng chuẩn bị món ăn Việt Nam"
          />
          <ResponsiveImage
            className="hero-image hero-image-round"
            src="/images/hospitality-guests.webp" sizes="(max-width: 560px) 45vw, 280px" loading="lazy"
            alt="Nhóm du khách khám phá một con phố địa phương"
          />
          <ResponsiveImage
            className="hero-image hero-image-small"
            src="/images/hospitality-cafe.webp" sizes="(max-width: 560px) 37vw, 240px" loading="lazy"
            alt="Khách hàng trò chuyện trong một quán cà phê ấm cúng"
          />
          <div className="shape shape-lime" aria-hidden="true">
            <span>+</span>
          </div>
          <div className="spark" aria-hidden="true">
            ✦
          </div>
        </div>
      </div>
    </section>
  )
}

function Trust() { return <LogoMarquee/> }

function Facts() {
  return (
    <section className="section facts" id="solutions">
      <div className="container">
        <div className="heading-grid">
          <p className="section-number">/ 01</p>
          <h2>Có mặt online chưa chắc đã được lựa chọn.</h2>
          <p>
            Khách thấy bạn trên Google, kiểm tra ảnh và đánh giá, rồi tìm cách
            liên hệ hoặc đặt dịch vụ. Một điểm chạm thiếu rõ ràng có thể làm
            hành trình đứt đoạn.
          </p>
        </div>
        <div className="fact-grid">
          {[
            [
              "Được tìm thấy",
              "Search, Maps và OTA đưa doanh nghiệp vào đúng ngữ cảnh tìm kiếm.",
            ],
            [
              "Được tin tưởng",
              "Website, hình ảnh, thông tin và đánh giá cùng trả lời một câu chuyện.",
            ],
            [
              "Dễ hành động",
              "Liên hệ, đặt dịch vụ và chỉ đường rõ ràng trên mọi thiết bị.",
            ],
            [
              "Biết điều gì hiệu quả",
              "Kênh và mục tiêu được thống nhất để việc đo lường bớt mơ hồ.",
            ],
          ].map(([title, body], index) => (
            <article className="fact-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    [
      "Hiểu khách hàng",
      "Làm rõ ai đang tìm bạn, họ cân nhắc điều gì và hành động ở đâu.",
    ],
    [
      "Chọn ưu tiên",
      "Xác định điểm nghẽn nên xử lý trước, thay vì chia ngân sách cho mọi kênh.",
    ],
    [
      "Triển khai",
      "Kết nối nội dung, nền tảng, quảng cáo và lộ trình đặt dịch vụ.",
    ],
    [
      "Đo lường",
      "Theo dõi tín hiệu phù hợp với mục tiêu và điều chỉnh theo dữ liệu có thật.",
    ],
  ]

  return (
    <section className="section process" id="process">
      <div className="container process-grid">
        <div className="process-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="process-core">
            <span>Khách hàng</span>
            <strong>ở trung tâm</strong>
          </div>
          <span className="orbit-label label-search">Search</span>
          <span className="orbit-label label-maps">Maps</span>
          <span className="orbit-label label-ota">OTA</span>
          <span className="orbit-label label-social">Social</span>
        </div>
        <div className="process-content">
          <p className="section-number">/ 02 · Cách chúng tôi làm việc</p>
          <h2>Bắt đầu từ bài toán kinh doanh của bạn.</h2>
          <div className="step-list">
            {steps.map(([title, body], index) => (
              <div className="step" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section work" id="work">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="section-number">/ 03 · Dự án chọn lọc</p>
            <h2>Những gì chúng tôi đã triển khai.</h2>
          </div>
          <p>
            Không dùng số liệu thiếu nguồn. Mỗi dự án được trình bày bằng đúng
            vai trò và phạm vi có thể xác nhận.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <a
              className={`project-card ${project.className}`}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              key={project.name}
            >
              <div className="project-topline">
                <span>{project.index}</span>
                <Arrow />
              </div>
              <div className="project-graphic" aria-hidden="true">
                <span>{project.name.slice(0, 1)}</span>
              </div>
              <div>
                <p>{project.type}</p>
                <h3>{project.name}</h3>
                <span className="project-scope">{project.scope}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlueCta() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="blue-cta">
          <div>
            <p>Ít kênh hơn. Kết nối tốt hơn.</p>
            <h2>Marketing không cần thêm sự rời rạc.</h2>
          </div>
          <div>
            <p>
              Cùng xem kênh nào đang hỗ trợ khách hàng tìm và đặt dịch vụ — và
              điểm nào nên ưu tiên cải thiện.
            </p>
            <a className="button button-light" href={isBeeCase ? "/#contact" : "#contact"}>
              Nhận đánh giá kênh marketing
              <Arrow />
            </a>
          </div>
          <div className="cta-rings" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section team" id="team">
      <div className="container team-grid">
        <div className="team-copy">
          <p className="section-number">/ 04 · Đội ngũ</p>
          <h2>Một đội ngũ gọn. Chuyên môn kết nối.</h2>
          <p>
            Bạn làm việc trực tiếp với hai người phụ trách — không qua nhiều
            tầng trung gian. Phạm vi, tiến độ và trách nhiệm được làm rõ từ đầu.
          </p>
          <a className="text-link" href={isBeeCase ? "/#contact" : "#contact"}>
            Bắt đầu một cuộc trao đổi <Arrow />
          </a>
        </div>
        <div className="team-cards">
          <article className="person-card person-card--blue">
            <div className="person-monogram">S</div>
            <span>Founder · Strategy & Organic</span>
            <h3>Website, SEO, Maps</h3>
            <p>
              Phụ trách nền tảng nội dung, khả năng được tìm thấy và trải nghiệm
              chuyển đổi.
            </p>
          </article>
          <article className="person-card person-card--lime">
            <div className="person-monogram">A</div>
            <span>Founder · Growth & Distribution</span>
            <h3>Ads, OTA, Social</h3>
            <p>
              Phụ trách phân phối, quảng cáo và kết nối hành trình khách hàng
              giữa các kênh.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="section principles">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="section-number">/ 05 · Nguyên tắc hợp tác</p>
            <h2>Rõ từ cách làm, không chờ đến báo cáo.</h2>
          </div>
          <p>
            Chưa có trích dẫn khách hàng được cấp quyền, vì vậy chúng tôi chọn
            công khai cách làm việc thay vì tạo lời chứng thực thay thế.
          </p>
        </div>
        <div className="principle-grid">
          {[
            [
              "01",
              "Đúng phạm vi",
              "Nói rõ ai làm gì, đầu ra nào thuộc dự án và điều gì chưa được xác nhận.",
            ],
            [
              "02",
              "Trực tiếp",
              "Trao đổi với người thực hiện, giảm mất mát thông tin qua nhiều lớp quản lý.",
            ],
            [
              "03",
              "Có thể bàn giao",
              "Tài khoản, dữ liệu và quy trình quản trị được thảo luận ngay từ đầu.",
            ],
          ].map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DarkCta() {
  return (
    <section className="dark-cta">
      <div className="container dark-cta-grid">
        <div>
          <p className="eyebrow">Bắt đầu từ hiện trạng thật</p>
          <h2>Tìm hướng tăng trưởng phù hợp cho doanh nghiệp của bạn.</h2>
          <p>
            Một cuộc trao đổi về hiện trạng, khách hàng mục tiêu và điều nên ưu
            tiên trước.
          </p>
          <a className="button button-lime" href={isBeeCase ? "/#contact" : "#contact"}>
            Nhận đánh giá kênh marketing
            <Arrow />
          </a>
        </div>
        <div className="lime-orb" aria-hidden="true">
          <span>let&apos;s</span>
          <strong>talk</strong>
          <i>↗</i>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div>
          <p className="section-number">/ 06 · FAQ</p>
          <h2>Bạn cần biết gì trước khi hợp tác?</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="contact-card">
          <p className="section-kicker">Gửi thông tin ban đầu</p>
          <h3>Cùng xem điều gì nên ưu tiên.</h3>
          <p>
            Gửi website hoặc liên kết Google Maps và vấn đề bạn đang gặp phải.
            Chúng tôi sẽ trao đổi về những ưu tiên có thể cải thiện ban đầu.
          </p>
          {submitted ? (
            <div className="success-message" role="status">
              <span>Đã ghi nhận thông tin.</span>
              <strong>Cảm ơn bạn đã bắt đầu cuộc trao đổi.</strong>
              <p>
                Đây là bản demo giao diện nên thông tin chưa được gửi đến máy
                chủ. Hãy kết nối biểu mẫu với kênh liên hệ chính thức trước khi
                xuất bản.
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Gửi nội dung khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Tên của bạn
                <input
                  name="name"
                  required
                  placeholder="Nguyễn Minh Anh"
                  autoComplete="name"
                />
              </label>
              <label>
                Tên doanh nghiệp
                <input
                  name="business"
                  required
                  placeholder="Tên spa, tour, nhà hàng..."
                />
              </label>
              <label>
                Email hoặc số điện thoại
                <input
                  name="contact"
                  required
                  placeholder="email@doanhnghiep.vn"
                  autoComplete="email"
                />
              </label>
              <label>
                Vấn đề bạn muốn trao đổi
                <textarea
                  name="challenge"
                  rows={4}
                  placeholder="Ví dụ: khách thấy Maps nhưng ít liên hệ..."
                />
              </label>
              <button className="button button-dark" type="submit">
                Gửi yêu cầu đánh giá
                <Arrow />
              </button>
              <small>
                Bằng việc gửi biểu mẫu, bạn đồng ý để đội ngũ liên hệ về nội
                dung đã cung cấp.
              </small>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href={isBeeCase ? "/" : "#top"}>
            <span className="brand-mark">h</span>
            <span>hospitality growth</span>
          </a>
          <p>Digital growth cho hospitality & local services.</p>
          <span>Đà Nẵng — Hội An · Remote-first</span>
        </div>
        <div>
          <strong>Khám phá</strong>
          <a href={isBeeCase ? "/#solutions" : "#solutions"}>Giải pháp</a>
          <a href={isBeeCase ? "/#work" : "#work"}>Dự án</a>
          <a href={isBeeCase ? "/#process" : "#process"}>Cách làm việc</a>
        </div>
        <div>
          <strong>Liên hệ</strong>
          <a href={isBeeCase ? "/#contact" : "#contact"}>Nhận đánh giá</a>
          <span>Thông tin liên hệ đang cập nhật</span>
        </div>
        <div className="footer-end">
          <span>Tên agency · đang cập nhật</span>
          <a href={isBeeCase ? "/" : "#top"}>Lên đầu trang ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    document.title = isBeeCase ? 'Bee Honey Spa — Dự án | Hospitality Growth' : 'Hospitality Growth — Digital growth cho doanh nghiệp dịch vụ'
    if (!isBeeCase && window.location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView())
  }, [])
  return (
    <>
      <Header />
      {isBeeCase ? <Suspense fallback={<main id="main-content" className="page-loading" aria-label="Đang tải dự án" aria-busy="true"/>}><BeeHoneyCase /></Suspense> : <main id="main-content">
        <Hero />
        <Trust />
        <Facts />
        <Process />
        <Work />
        <BlueCta />
        <Team />
        <Principles />
        <DarkCta />
        <Contact />
      </main>}
      <Footer />
    </>
  )
}
