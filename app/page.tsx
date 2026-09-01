"use client"

import { useEffect, useState } from "react"

type Project = {
  id: string
  index: string
  category: string
  title: string
  description: string
  details: string[]
  media?: {
    type: "image" | "video"
    src: string
    poster?: string
    alt: string
  }
  fallbackLabel: string
  mediaPosition?: "left" | "right"
}

const projects: Project[] = [
  {
    id: "ai-exhibit-holobox",
    index: "001",
    category: "INTERACTIVE MUSEUM INSTALLATION. UI/UX.",
    title: "AI Exhibit HOLOBOX",
    description:
      "Designed UI/UX for an interactive museum installation, including visitor-facing interfaces and spatial graphics for a high-footfall environment.",
    details: ["YEAR: 2025", "CLIENT: Prime Minister Museum and Library, New Delhi"],
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      alt: "AI Exhibit HOLOBOX project preview",
    },
    fallbackLabel: "EXHIBIT",
  },
  {
    id: "digital-hampi-museum",
    index: "002",
    category: "WEBGL VIRTUAL MUSEUM",
    title: "DIGITAL HAMPI MUSEUM",
    description:
      "Worked on UI and spatial design for a WebGL-based virtual museum experience, improving navigation and engagement in 3D space.",
    details: ["YEAR: 2025", "CLIENT: National Cultural Fund (NCF)", "END CLIENT: Archaeological Survey of India (ASI)"],
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      alt: "Digital Hampi Museum project preview",
    },
    fallbackLabel: "MUSEUM",
    mediaPosition: "right",
  },
  {
    id: "nalanda-ar-app",
    index: "003",
    category: "AUGMENTED REALITY EXPERIENCE. MUSEUM UPGRADATION.",
    title: "NALANDA AR APP",
    description:
      "Independently designed and delivered the AR application, including user flows, UI screens, interaction design, and supporting museum graphics.",
    details: ["YEAR: 2025", "CLIENT: Foundation for Innovation and Technology Transfer (FITT)", "END CLIENT: Archaeological Survey of India (ASI)"],
    media: {
      type: "image",
      src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
      alt: "Nalanda AR app project preview",
    },
    fallbackLabel: "AR APP",
  },
  {
    id: "hirexa",
    index: "004",
    category: "PRODUCT DESIGN / HIRING EXPERIENCE",
    title: "HireXA",
    description: "A concise hiring workflow concept focused on clearer candidate matching and faster recruiter decisions.",
    details: ["TODO: Add project-specific details", "TODO: Add release context"],
    media: undefined,
    fallbackLabel: "TODO",
    mediaPosition: "right",
  },
]

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion/UI Prototyping"],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST APIs", "Auth flows", "Database integration"],
  },
  {
    title: "AI/ML",
    items: ["LLM workflows", "Prompt design", "AI product UX"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Schema design"],
  },
  {
    title: "Tools",
    items: ["Figma", "Git", "Vercel", "Postman"],
  },
  {
    title: "Design",
    items: ["Information architecture", "Visual design", "Design systems"],
  },
]

function ProjectMedia({ project }: { project: Project }) {
  const hasMedia = Boolean(project.media?.src)

  return (
    <div className="project-media">
      <div className="project-media-frame">
        {hasMedia ? (
          project.media?.type === "video" ? (
            <video
              className="project-image"
              src={project.media.src}
              poster={project.media.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={project.media.alt}
            />
          ) : (
            <img src={project.media?.src} alt={project.media?.alt ?? project.title} className="project-image" />
          )
        ) : (
          <div className="project-image project-fallback" aria-label={`${project.title} placeholder`}>
            <span>{project.fallbackLabel}</span>
            <small>TODO: add screenshot or video asset</small>
          </div>
        )}
      </div>
      <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
        {project.fallbackLabel}
      </div>
    </div>
  )
}

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrame = 0
    let targetX = 0
    let targetY = 0

    const animateTrail = () => {
      setTrail((current) => {
        const nextX = current.x + (targetX - current.x) * 0.12
        const nextY = current.y + (targetY - current.y) * 0.12
        return { x: nextX, y: nextY }
      })
      animationFrame = window.requestAnimationFrame(animateTrail)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setCursor({ x: e.clientX, y: e.clientY })
    }

    animationFrame = window.requestAnimationFrame(animateTrail)
    document.addEventListener("mousemove", handleMouseMove, { passive: true })

    const handleScroll = () => {
      const scroll = window.pageYOffset

      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ;(text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".reveal-text").forEach((text) => observer.observe(text))

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = (this as HTMLAnchorElement).getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        className="blob blob-trail"
        id="cursor-blob"
        style={{
          transform: `translate(${trail.x - 200}px, ${trail.y - 200}px)`,
        }}
      />
      <div
        className="blob blob-core"
        id="cursor-core"
        style={{
          transform: `translate(${cursor.x - 120}px, ${cursor.y - 120}px)`,
        }}
      />

      <nav>
        <div className="logo">Muskan Dhawan</div>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#enhance">How Can I Enhance</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        <section id="hero">
          <img src="/images/muskan.jpeg" alt="Editorial" className="hero-img" id="hero-img" />
          <div className="hero-title-container container">
            <span className="huge-type parallax-text" data-speed="-2">
              DIGITAL
            </span>
            <span className="huge-type outline-text parallax-text" data-speed="2" style={{ paddingLeft: "200px" }}>
              DESIGNER
            </span>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                }}
              >
                HELLO! I'M MUSKAN <br />
                A UI/UX Designer based in India.
              </h2>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#888",
                }}
              >
                I craft immersive digital products across VR, AR and web platforms. My expertise lies in user-centeres design for products that captive and enage.
              </p>
            </div>
          </div>
        </section>

        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">DESIGN — CREATE — IDEATE — </span>
            <span className="huge-type outline-text">IMMERSE — ENGAGE — LEARN — </span>
          </div>
        </div>

        <section id="work" className="container">
          <div className="sticky-type projects-title">PROJECTS</div>

          {projects.map((project) => (
            <div
              key={project.id}
              className="project-row"
              style={project.mediaPosition === "right" ? { flexDirection: "row-reverse" } : undefined}
            >
              <div className="project-info">
                <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>
                  {project.index} / {project.category}
                </span>
                <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                  {project.title}
                </h3>
                <p>{project.description}</p>
                <div className="divider"></div>
                {project.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
              <ProjectMedia project={project} />
            </div>
          ))}
        </section>

        <section id="skills" className="container">
          <div className="section-heading">
            <span className="section-kicker">SKILLS</span>
            <h2 className="section-title">Capabilities across product, web, and visual systems.</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="enhance" className="container">
          <div className="section-heading">
            <span className="section-kicker">HOW CAN I ENHANCE</span>
            <h2 className="section-title">A focused place for improvements, experiments, and thoughtful iteration.</h2>
          </div>
          <div className="enhance-panel">
            <p>
              TODO: add the exact “How Can I Enhance” content from your portfolio, or use this section to show
              process notes, critiques, or service highlights.
            </p>
          </div>
        </section>

        <section className="composition-section">
          <div className="container composition">
            <div className="comp-item-1">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600"
                className="comp-image"
                alt="Layer 1"
              />
            </div>
            <div className="comp-item-2">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
                className="comp-image"
                alt="Layer 2"
              />
            </div>
            <div className="comp-item-3">
              <div
                style={{
                  background: "var(--accent)",
                  padding: "40px",
                  color: "white",
                }}
              >
                <h4 style={{ fontFamily: "var(--syne)", fontSize: "2rem" }}>LAYERED DEPTH</h4>
                <p style={{ marginTop: "20px" }}>
                  We believe in depth—both in meaning and in visual manifestation. Overlapping elements create a
                  zine-like chaos that is meticulously organized.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="mailto:hello@viscera.studio">LET&apos;S — WORK</a>
            </div>
            <div className="divider"></div>
            <div className="footer-meta">
              <div className="footer-links">
                <a href="https://www.linkedin.com/in/muskandhawan?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer">
                  LINKEDIN
                </a>
                <a href="https://www.behance.net/muskandhawan1" target="_blank" rel="noreferrer">
                  BEHANCE
                </a>
              </div>
              <div className="footer-contact">
                <span>PHONE: +91 99587 16689</span>
                <span>LOCATED IN GURUGRAM // INDIA</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
