import { AccountPage, AdminPage, LoginPage } from './AuthPages'
import { authClient } from './auth-client'

type Project = {
  eyebrow: string
  title: string
  description: string
  status: string
  href?: string
  action: string
}

const projects: Project[] = [
  {
    eyebrow: 'Church Operations',
    title: 'PKO',
    description:
      'Promise Kingdom Operations — practical software for making Sunday children’s ministry calmer, clearer, and easier to run.',
    status: 'In active development',
    href: 'https://pko.unfinishednotebooks.com',
    action: 'Open notebook',
  },
  {
    eyebrow: 'Personal Systems',
    title: 'Run It Back',
    description:
      'A game-like personal operating system for fitness, finances, projects, reading, home life, and the things I want to keep showing up for.',
    status: 'Building v1',
    href: 'https://runitback.unfinishednotebooks.com',
    action: 'Follow the build',
  },
]

function BrandMark() {
  const brandName = 'UNFINISHED NOTEBOOKS'
  const printedName = 'FINISHED NOTEBOOKS'

  return (
    <span className="brand-mark">
      <span className="brand-un" aria-hidden="true">UN</span>
      <span className="brand-rest" aria-label={brandName}>
        {Array.from(printedName).map((character, index) => (
          <span
            className={`brand-letter brand-letter-${index % 5}`}
            aria-hidden="true"
            key={`${character}-${index}`}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        ))}
      </span>
      <svg
        className="brand-underline"
        viewBox="0 0 260 20"
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M1 8c29 3 51-2 79 1 28 3 49-2 70-3 21-1 35 5 53 1 17-4 35 4 54-4" />
      </svg>
    </span>
  )
}

function HeroNotebook() {
  return (
    <svg
      className="hero-notebook"
      viewBox="0 0 620 430"
      role="img"
      aria-label="A hand-sketched open softcover notebook resting on a desk"
    >
      <g aria-hidden="true">
        <path className="desk-line" d="M24 354c154 5 393-6 574 5" />
        <path className="desk-line desk-line-faint" d="M54 382c145-4 340 8 505 0" />

        <g className="desk-laptop" transform="rotate(-2 176 238)">
          <path className="laptop-screen" d="M86 134h180l-13 128H97Z" />
          <path className="laptop-screen-inner" d="M102 150h146l-9 92H109Z" />
          <path className="code-mark" d="m132 178-12 10 12 10m84-20 12 10-12 10" />
          <path className="code-line" d="M151 174h42m-48 16h58m-47 16h31" />
          <path className="laptop-base" d="M78 262c60-5 125-4 188 2l19 16c-79-5-154-6-224-1Z" />
        </g>

        <path
          className="cover cover-back"
          d="M79 312c49-51 114-83 218-78 92-15 172 5 243 65l-9 69c-70-32-154-43-236-25-80-19-154-10-222 19Z"
        />
        <path
          className="page page-left-back"
          d="M92 291c54-48 119-65 205-49l-1 94c-77-20-145-10-218 19Z"
        />
        <path
          className="page page-left"
          d="M98 278c51-42 116-57 199-37l-2 93c-73-22-142-12-211 16 7-21 12-43 14-72Z"
        />
        <path
          className="page page-right-back"
          d="M299 242c86-19 160 3 227 57l5 57c-75-34-152-39-236-20Z"
        />
        <path
          className="page page-right"
          d="M301 240c83-13 153 9 214 57l9 52c-72-29-148-34-227-15 6-31 7-62 4-94Z"
        />

        <path className="page-edge" d="M84 350c70-25 139-37 211-14 84-20 160-13 236 20" />
        <path className="page-edge page-edge-light" d="M85 356c76-24 141-31 210-12 82-16 158-9 232 19" />
        <path className="page-edge page-edge-light" d="M91 362c68-19 135-27 204-10 80-14 153-7 226 17" />
        <path className="spine" d="M297 238c7 27 7 67-2 98-5 12-7 21-5 33" />
        <path className="spine spine-echo" d="M304 244c4 28 2 62-7 90" />

        <path className="margin-mark" d="M345 261c-1 17-3 35-5 53" />
        <path className="note-line" d="M362 282c27-6 57-4 84 4" />
        <path className="note-line" d="M360 298c18-3 38-2 57 3" />
        <path className="note-line note-crossed" d="M359 313c31-4 56-1 79 6" />
        <path className="scribble-line" d="M365 319c18-15 31 13 48-3 11-11 20 8 34-1" />

        <g className="page-brand" transform="rotate(-5 412 272)">
          <text x="365" y="270">UN</text>
          <path d="M399 264c6-9 10 10 17-.2s11 8.5 18-.2 10 6.8 16-.1 8 5 14 0 7 3.4 12 .3" />
        </g>

        <path className="cover-fold" d="M492 319c15 4 27 13 38 28-4-18-6-33-5-48" />
        <path className="pencil" d="M445 190 526 130" />
        <path className="pencil-edge" d="m446 196 84-62" />
        <path className="pencil-tip" d="m445 190-12 15 13-9" />
        <path className="loose-stroke" d="M455 205c-19 4-38 12-50 25" />

        <path className="motion-mark" d="M110 242c12-13 28-23 45-30" />
        <path className="motion-mark" d="M121 252c8-8 18-14 28-18" />
      </g>
    </svg>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const { data: session } = authClient.useSession()

  if (path === '/login') return <LoginPage />
  if (path === '/account') return <AccountPage />
  if (path === '/admin') return <AdminPage />

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Unfinished Notebooks home">
          <BrandMark />
        </a>

        <nav aria-label="Primary">
          <a href="#notebooks">Notebooks</a>
          <a href="#margins">In the Margins</a>
          <a href="mailto:me@unfinishednotebooks.com">Say hello</a>
          <a className="account-link" href={session ? '/account' : '/login'}>
            {session ? 'Your account' : 'Sign in'}
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">A home for things still becoming.</p>
            <h1>
              Ideas <span className="sketch-underline">worth</span>
              <span> coming back to.</span>
            </h1>
            <p className="hero-text">
              Software, <span className="sketch-highlight sketch-highlight-hero">systems</span>, experiments, and{' '}
              whatever else is currently scribbled in the margins. All of which have a goal to be{' '}
              <span className="hero-correction">
                <span className="sr-only">reopened</span>
                <span className="hero-correction-note" aria-hidden="true">reopened</span>
                <span className="hero-correction-caret" aria-hidden="true">^</span>
                <span className="sketch-crossout" aria-hidden="true">finished</span>
              </span>.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#notebooks">
                Open the notebooks
              </a>
              <a className="text-link" href="#margins">
                Read in the margins <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="sticky-note" aria-hidden="true">
              <span className="thumbtack" />
              <strong>ship v1</strong>
              <span className="sticky-check"><i /> almost there</span>
              <span className="sticky-correction">perfect</span>
              <em>useful →</em>
            </div>
            <HeroNotebook />
          </div>
        </section>

        <section className="section" id="notebooks">
          <div className="section-heading">
            <div>
              <p className="kicker">Open notebooks</p>
              <h2>What I’m working on now.</h2>
            </div>
            <p>
              These are the projects with tabs sticking out of them at the
              moment.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">0{index + 1}</div>
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-footer">
                  <span className="status-dot">
                    <i aria-hidden="true" />
                    {project.status}
                  </span>
                  <a href={project.href}>{project.action} →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="margins-section" id="margins">
          <div className="margin-rule" aria-hidden="true" />
          <div className="margins-copy">
            <p className="kicker">In the Margins</p>
            <h2>Notes from between the projects.</h2>
            <p>
              Eventually this will be where the shorter thoughts live:
              prototypes, lessons learned, things I <span className="sketch-highlight sketch-highlight-margins">changed my mind</span> about,
              screenshots, experiments, and the occasional idea that probably
              should have stayed in a notebook.
            </p>
          </div>
          <div className="coming-note">
            <span>first note</span>
            <strong>coming soon</strong>
            <em>still unfinished, obviously.</em>
          </div>
        </section>

        <section className="about-section">
          <p className="kicker">Why “Unfinished Notebooks”?</p>
          <blockquote>
            I have a habit of buying a new notebook for a new idea, getting
            excited about it, filling part of it, and eventually coming back to
            it with a <span className="sketch-underline">better idea.</span>
          </blockquote>
          <p>
            This site is the digital version of that shelf: a place for things
            that are useful, interesting, <span className="sketch-highlight sketch-highlight-about">still changing</span>, or simply worth
            reopening.
          </p>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <BrandMark />
          <div>
            <span>Nothing’s ever really done.</span>
          </div>
        </div>
        <div className="footer-links">
          <a href="mailto:me@unfinishednotebooks.com">me@unfinishednotebooks.com</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
