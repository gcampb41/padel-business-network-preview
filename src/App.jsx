import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import './styles.css'
import './logo.css'
import './founders.css'
import './founders-interactions.css'
import './membership-paths.css'
import './spacing.css'
import './lower-sections.css'

const heroImage = `${import.meta.env.BASE_URL}images/pbn-hero.png`
const courtImage = `${import.meta.env.BASE_URL}images/pbn-first-serve.png`
const waitlistEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT

const membership = [
  ['PLAY', 'Organised games with other PBN members.'],
  ['IMPROVE', 'Member coaching, clinics and exceptional padel expertise.'],
  ['CONNECT', 'A considered network of founders, leaders and professionals.'],
  ['COMPETE', 'Leagues, tournaments and healthy rivalry.'],
  ['EXPERIENCE', 'Guest players, social events and courtside moments.'],
  ['GROW', 'A North West chapter with a wider PBN future.'],
]

const faqs = [
  ['Who is PBN for?', 'Business owners, founders, senior professionals, investors and ambitious operators who value genuine relationships.'],
  ['What is the difference between Individual and Corporate membership?', 'Individual membership is for one person joining the wider network. Corporate membership enables an organisation to apply for multiple seats and discuss tailored team or client events.'],
  ['Do I need to be good at padel?', 'No. The community is built around a shared experience, not a handicap.'],
  ['Is this traditional networking?', 'No forced referrals, breakfast meetings or pressure to pitch the room.'],
  ['When does the network open?', 'PBN is opening soon. Join the waiting list and we will share launch details and next steps as they are confirmed.'],
]

function Mark() {
  return <span className="mark" aria-label="PBN"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" opacity=".5"/><text x="32" y="38" textAnchor="middle" fill="currentColor" fontFamily="DM Mono, monospace" fontSize="22" fontWeight="700" letterSpacing="-2">PBN</text><path d="M14 46h36" stroke="currentColor" strokeWidth="1.5"/></svg></span>
}

function Logo() {
  return <a className="logo" href="#top"><Mark/><span>PADEL<br/>BUSINESS<br/>NETWORK</span></a>
}

function Waitlist({ open, close, path, setPath }) {
  const [status, setStatus] = useState('')
  const cardRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    document.body.classList.add('locked')
    const previousFocus = document.activeElement
    const timer = window.setTimeout(() => cardRef.current?.querySelector('input, select, button')?.focus(), 50)
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('locked')
      previousFocus?.focus?.()
    }
  }, [open, close])

  async function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!waitlistEndpoint) {
      setStatus('Thanks — the waiting-list connection will be enabled before launch.')
      return
    }

    setStatus('Joining…')
    try {
      const response = await fetch(waitlistEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      setStatus(response.ok ? 'You’re on the list. We’ll be in touch.' : 'Something went wrong. Please try again shortly.')
      if (response.ok) form.reset()
    } catch {
      setStatus('Something went wrong. Please try again shortly.')
    }
  }

  if (!open) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-title">
      <button className="modal__shade" onClick={close} aria-label="Close waiting-list form"/>
      <div className="modal__card" ref={cardRef}>
        <button className="modal__close" onClick={close} aria-label="Close"><X/></button>
        <div className="modal__intro">
          <Mark/>
          <p className="kicker">OPENING SOON</p>
          <h2 id="waitlist-title">Join the waiting list.</h2>
          <p>Choose the membership route that fits and be among the first to hear about launch events, places and next steps.</p>
        </div>
        <form className="form" onSubmit={submit}>
          <label>
            Membership interest
            <select name="membership_path" value={path} onChange={(event) => setPath(event.target.value)}>
              <option value="individual">Individual membership</option>
              <option value="corporate">Corporate membership</option>
            </select>
          </label>
          <div className="form__pair">
            <label>Name<input name="name" autoComplete="name" required/></label>
            <label>Work email<input name="email" type="email" autoComplete="email" required/></label>
          </div>
          <label>{path === 'corporate' ? 'Organisation' : 'Company & role'}<input name="organisation" required/></label>
          {path === 'corporate' && (
            <div className="form__pair">
              <label>Seats of interest<input name="seats" type="number" min="2" placeholder="e.g. 8"/></label>
              <label>Event interest
                <select name="event_interest" defaultValue="">
                  <option value="">Select one</option>
                  <option>Team days</option>
                  <option>Client events</option>
                  <option>Both</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
          )}
          <label>What would you like to get from PBN?<textarea name="message" rows="3" required/></label>
          <button className="button">Join the waiting list <ArrowRight size={17}/></button>
          {status && <p className="form__message" role="status">{status}</p>}
        </form>
      </div>
    </div>
  )
}

function MembershipPaths({ openWaitlist }) {
  return (
    <section className="paths" id="paths">
      <div className="wrap">
        <div className="paths__heading">
          <p className="kicker">TWO WAYS INTO THE NETWORK</p>
          <h2>Built for people.<br/>Designed for business.</h2>
          <p>Join as an individual or bring a group from your organisation. Both routes share the same principle: better business relationships, built naturally through padel.</p>
        </div>
        <div className="paths__grid">
          <article className="path-card path-card--individual">
            <span className="path-card__number">01 / INDIVIDUAL</span>
            <h3>Your place<br/>in the network.</h3>
            <p>For founders, business owners, senior professionals and ambitious individuals looking to grow a genuine professional network through regular shared experiences.</p>
            <ul>
              <li><Check size={17}/> One individual membership</li>
              <li><Check size={17}/> Organised games, coaching and events</li>
              <li><Check size={17}/> Introductions across the PBN community</li>
              <li><Check size={17}/> Business networking without the hard sell</li>
            </ul>
            <button className="path-card__action" onClick={() => openWaitlist('individual')}>Join the individual waiting list <ArrowRight size={18}/></button>
          </article>
          <article className="path-card path-card--corporate">
            <span className="path-card__number">02 / CORPORATE</span>
            <h3>Your organisation.<br/>More connected.</h3>
            <p>For larger organisations seeking multiple places in the network, stronger internal connections and memorable padel-led experiences for teams or clients.</p>
            <ul>
              <li><Check size={17}/> Apply for multiple member seats</li>
              <li><Check size={17}/> Build connections across departments</li>
              <li><Check size={17}/> Bespoke team and company days</li>
              <li><Check size={17}/> Host tailored events for your clients</li>
            </ul>
            <button className="path-card__action" onClick={() => openWaitlist('corporate')}>Discuss corporate membership <ArrowRight size={18}/></button>
          </article>
        </div>
      </div>
    </section>
  )
}

function Founders() {
  return (
    <section className="founders" id="founders"><div className="wrap">
      <p className="kicker">OUR FOUNDERS</p>
      <div className="founders__intro"><h2>Built around<br/>the court.</h2><p>Padel Business Network brings together entrepreneurship, elite padel, coaching and technology — connected by a shared belief in the relationships created through the game.</p></div>
      <div className="heritage"><div className="heritage__image"><img src={heroImage} alt="Padel players on court"/><span>PADEL<br/>HERITAGE</span></div><div className="heritage__copy"><p className="kicker">LEO PADOVANI · PADEL</p><h3>From the professional game to the business community.</h3><p>Leo brings genuine roots in the sport to PBN: a former World Top 10 player, international champion and elite coach whose career spans playing, coaching and building padel communities.</p><div className="heritage__facts"><span><strong>WORLD TOP 10</strong><small>Former player</small></span><span><strong>30+ YEARS</strong><small>In padel</small></span><span><strong>PLAYER → COACH</strong><small>Across the game</small></span></div></div></div>
      <div className="founders__grid"><article><b>PAUL LACKEY</b><span>BUSINESS</span><p>Entrepreneur, business owner and padel player — bringing the relationships that turn conversations on court into meaningful connections.</p></article><article><b>LEO PADOVANI</b><span>PADEL</span><p>Professional padel heritage and elite coaching experience, with an international network across players, coaches and clubs.</p></article><article><b>MATEO PADOVANI</b><span>NEXT GENERATION</span><p>Player and coach, representing the competitive generation helping shape padel&apos;s fast-growing global community.</p></article><article><b>GAVIN CAMPBELL</b><span>PLATFORM</span><p>Technology and infrastructure connecting members, events, cities and opportunity as the network grows.</p></article></div>
      <div className="founders__statement">FOUR BACKGROUNDS. <em>ONE CONNECTION.</em><strong>PADEL.</strong></div>
    </div></section>
  )
}

function App() {
  const [menu, setMenu] = useState(false)
  const [waitlist, setWaitlist] = useState(false)
  const [membershipPath, setMembershipPath] = useState('individual')
  const closeWaitlist = useCallback(() => setWaitlist(false), [])

  useEffect(() => {
    const timer = window.setTimeout(() => setWaitlist(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const openWaitlist = (path = 'individual') => {
    setMenu(false)
    setMembershipPath(path)
    setWaitlist(true)
  }

  return <>
    <header><div className="wrap nav"><Logo/><nav className={menu ? 'is-open' : ''}><a href="#why">Why PBN</a><a href="#paths">Membership</a><a href="#founders">Founders</a><a href="#vision">Vision</a><button className="nav__apply" onClick={() => openWaitlist()}>Join waitlist <ArrowDownRight size={16}/></button></nav><button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button></div></header>
    <main id="top">
      <section className="hero"><div className="wrap hero__grid"><div className="hero__copy"><p className="kicker">THE NORTH WEST&apos;S FOUNDING CHAPTER · OPENING SOON</p><h1>Business<br/>relationships.<br/>Built on <em>court.</em></h1><p className="hero__lead">A private community connecting individuals and organisations through padel, coaching and exceptional business events.</p><div className="hero__actions"><button className="button" onClick={() => openWaitlist()}>Join the waiting list <ArrowRight size={17}/></button><a href="#paths" className="arrow-link">Explore membership <ArrowDownRight size={20}/></a></div></div><div className="hero__art"><div className="hero__ring"/><img src={heroImage} alt="Padel players meeting at an indoor court"/><div className="hero__stamp">PLAY<br/>CONNECT<br/><strong>GROW</strong></div></div></div><div className="hero__footer wrap"><span>OPENING SOON</span><span>INDIVIDUAL MEMBERSHIP</span><span>CORPORATE MEMBERSHIP</span></div></section>

      <section className="launch"><div className="wrap launch__grid"><div><p className="kicker">BE THERE FROM THE START</p><h2>The network is<br/><em>opening soon.</em></h2></div><div className="launch__copy"><p>We are building the founding North West community now — bringing together people and organisations who see the value in better conversations, shared experiences and relationships that go beyond the meeting room.</p><button className="button button--yellow" onClick={() => openWaitlist()}>Join the waiting list <ArrowRight size={17}/></button></div><div className="launch__steps"><span><b>01</b> Choose your membership path</span><span><b>02</b> Tell us what you are looking for</span><span><b>03</b> Get launch news and first access</span></div></div></section>

      <section id="why" className="manifesto wrap"><p className="side-label">01 / THE IDEA</p><div><p className="kicker">RELATIONSHIPS FIRST. BUSINESS FOLLOWS.</p><h2>Not another networking club.</h2></div><div className="manifesto__body"><p className="large">No breakfast meetings. No forced referrals. No standing around a conference room swapping business cards.</p><p>PBN brings ambitious people together on court. Play, compete, learn and build genuine relationships — then let the business happen naturally.</p><div className="no-list"><span><Check size={17}/> No hard sell</span><span><Check size={17}/> No weekly pressure</span><span><Check size={17}/> No empty rooms</span></div></div></section>

      <MembershipPaths openWaitlist={openWaitlist}/>

      <section className="coaching"><div className="coaching__photo"><img src={courtImage} alt="Players enjoying an indoor padel match"/></div><div className="coaching__content"><p className="kicker">MORE THAN A MATCH</p><h2>World-class padel. Serious business connections.</h2><p>Organised games, coaching, clinics, tournaments and custom events. The game is the shared language; the value is in the people around it.</p><div className="coaching__words"><span>PLAY</span><span>LEARN</span><span>CONNECT</span></div></div></section>
      <Founders/>

      <section id="membership" className="membership wrap"><div className="membership__heading"><p className="kicker">THE SHARED NETWORK EXPERIENCE</p><h2>More reasons to show up.</h2><p>What PBN membership can unlock, on court and beyond it.</p></div><div className="membership__grid">{membership.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section id="vision" className="vision wrap"><p className="side-label">02 / THE FUTURE</p><div><p className="kicker">ONE NETWORK. MANY CITIES.</p><h2>Starting in the North West. Built to travel.</h2></div><p>PBN begins with one founding community and an ambition that reaches further: connected chapters, each rooted in its own padel city and part of one international business network.</p><div className="vision__line"><span>THE NORTH WEST <b>FOUNDING CHAPTER</b></span><span>THE NEXT COURT <b>IN TIME</b></span><span>THE WIDER WORLD <b>THE AMBITION</b></span></div></section>

      <section className="faq wrap"><div><p className="kicker">QUESTIONS, ANSWERED</p><h2>A few things to know.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20}/></summary><p>{answer}</p></details>)}</div></section>
      <section className="final"><Mark/><p className="kicker">OPENING SOON</p><h2>Find your place<br/><em>in the network.</em></h2><button className="button button--yellow" onClick={() => openWaitlist()}>Join the waiting list <ArrowRight size={17}/></button></section>
    </main>
    <footer className="wrap"><Logo/><span>© {new Date().getFullYear()} PADEL BUSINESS NETWORK</span><span>THE NORTH WEST · AND BEYOND</span></footer>
    <Waitlist open={waitlist} close={closeWaitlist} path={membershipPath} setPath={setMembershipPath}/>
  </>
}

export default App
