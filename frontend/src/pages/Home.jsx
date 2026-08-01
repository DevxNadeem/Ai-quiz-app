import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="bg-parchment text-ink antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-parchment/90 backdrop-blur border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#0D1A16" strokeWidth="1.5" />
              <path
                d="M6 14 L11 14 L13 8 L16 20 L18 14 L22 14"
                stroke="#D9A441"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-xl font-medium tracking-tight">Recall</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-ink/70">
            <a href="#how" className="hover:text-ink transition">How it works</a>
            <a href="#features" className="hover:text-ink transition">Features</a>
            <a href="#pricing" className="hover:text-ink transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-medium text-ink/70 hover:text-ink transition">
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-ink text-parchment text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-inkdeep transition"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-widest uppercase text-sagedim border border-sage/40 rounded-full px-3 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            Adaptive assessment engine
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] font-medium tracking-tight text-ink">
            Every question <em className="italic text-amber font-normal">recalibrates</em> to what you don't know yet.
          </h1>
          <p className="mt-6 text-lg text-ink/65 max-w-md leading-relaxed">
            Recall's model reads every answer you give and rewrites the next question's difficulty in real time — no
            fixed question banks, no wasted repetition.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="bg-ink text-parchment font-semibold px-7 py-3.5 rounded-full hover:bg-inkdeep transition text-sm"
            >
              Create free account
            </Link>
            <a href="#how" className="flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-ink transition">
              See how it adapts
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="mt-12 flex items-center gap-8 text-ink/50 text-sm">
            <div><span className="font-mono font-semibold text-ink">40K+</span> questions generated daily</div>
            <div><span className="font-mono font-semibold text-ink">1.2M</span> answers analyzed</div>
          </div>
        </div>

        {/* SIGNATURE ELEMENT: live difficulty pulse */}
        <div className="relative">
          <div className="bg-ink rounded-3xl p-8 shadow-2xl shadow-ink/20">
            <div className="flex items-center justify-between mb-6">
              <span className="text-parchment/50 text-xs font-mono uppercase tracking-widest">Difficulty pulse</span>
              <span className="flex items-center gap-1.5 text-sage text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                live
              </span>
            </div>
            <svg viewBox="0 0 400 140" className="w-full h-36">
              <line x1="0" y1="35" x2="400" y2="35" stroke="#F5F3EC" strokeOpacity="0.06" />
              <line x1="0" y1="70" x2="400" y2="70" stroke="#F5F3EC" strokeOpacity="0.06" />
              <line x1="0" y1="105" x2="400" y2="105" stroke="#F5F3EC" strokeOpacity="0.06" />
              <path
                className="pulse-line"
                d="M0,90 C 30,90 40,40 70,40 C 100,40 110,100 140,100 C 170,100 180,20 210,20 C 240,20 250,80 280,80 C 310,80 320,55 350,55 C 370,55 380,70 400,70"
                fill="none"
                stroke="#D9A441"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-parchment/10">
              <div>
                <div className="text-parchment/40 text-[11px] font-mono uppercase tracking-wide">Question</div>
                <div className="text-parchment font-mono text-sm mt-1">14 / open</div>
              </div>
              <div>
                <div className="text-parchment/40 text-[11px] font-mono uppercase tracking-wide">Difficulty</div>
                <div className="text-amber font-mono text-sm mt-1">↑ escalating</div>
              </div>
              <div>
                <div className="text-parchment/40 text-[11px] font-mono uppercase tracking-wide">Topic</div>
                <div className="text-parchment font-mono text-sm mt-1">graph theory</div>
              </div>
            </div>
          </div>
          <div className="drift absolute -bottom-5 -left-5 bg-parchment border border-ink/10 rounded-2xl px-5 py-3 shadow-lg hidden md:block">
            <div className="text-[11px] font-mono text-ink/40 uppercase tracking-wide">Mastery score</div>
            <div className="font-display text-2xl font-medium text-ink">
              87<span className="text-sm text-ink/40">/100</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="border-y border-ink/10 bg-parchdim/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-ink/40 text-sm font-mono uppercase tracking-wide">
          <span>Used for interview prep</span>
          <span>·</span>
          <span>Certification study</span>
          <span>·</span>
          <span>Classroom assessment</span>
          <span>·</span>
          <span>Language learning</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="max-w-xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-sagedim">The loop</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 tracking-tight">
            Three steps, repeated every question.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-t-2 border-ink pt-6">
            <span className="font-mono text-xs text-amber">01</span>
            <h3 className="font-display text-xl font-medium mt-3 mb-2">You answer</h3>
            <p className="text-ink/60 text-sm leading-relaxed">
              A question is generated from your weakest topic cluster, not picked from a static bank.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-6">
            <span className="font-mono text-xs text-amber">02</span>
            <h3 className="font-display text-xl font-medium mt-3 mb-2">The model scores intent</h3>
            <p className="text-ink/60 text-sm leading-relaxed">
              Recall reads not just correctness but confidence, timing, and the specific misconception behind a wrong
              answer.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-6">
            <span className="font-mono text-xs text-amber">03</span>
            <h3 className="font-display text-xl font-medium mt-3 mb-2">Difficulty recalibrates</h3>
            <p className="text-ink/60 text-sm leading-relaxed">
              The next question shifts up, down, or sideways into an adjacent topic — the pulse graph above, live.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-ink text-parchment py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-xl mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-sage">Built for retention</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 tracking-tight">
              Not another question dump.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover bg-inkdeep border border-parchment/10 rounded-2xl p-7">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-amber mb-5">
                <path
                  d="M11 2v4M11 16v4M2 11h4M16 11h4M4.5 4.5l2.8 2.8M14.7 14.7l2.8 2.8M17.5 4.5l-2.8 2.8M7.3 14.7l-2.8 2.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="font-display text-lg font-medium mb-2">Misconception tagging</h3>
              <p className="text-parchment/55 text-sm leading-relaxed">
                Wrong answers are classified by the underlying gap, not just marked incorrect, so review sessions
                target the actual cause.
              </p>
            </div>
            <div className="card-hover bg-inkdeep border border-parchment/10 rounded-2xl p-7">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-amber mb-5">
                <path d="M3 18V8M11 18V4M19 18v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h3 className="font-display text-lg font-medium mb-2">Topic mastery map</h3>
              <p className="text-parchment/55 text-sm leading-relaxed">
                A living map of every subtopic you've touched, weighted by recency and how it holds up under harder
                questions.
              </p>
            </div>
            <div className="card-hover bg-inkdeep border border-parchment/10 rounded-2xl p-7">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-amber mb-5">
                <path d="M4 11a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h3 className="font-display text-lg font-medium mb-2">Spaced re-surfacing</h3>
              <p className="text-parchment/55 text-sm leading-relaxed">
                Topics you got right resurface later at higher difficulty, confirming the knowledge held rather than
                just testing recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="max-w-xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-sagedim">Pricing</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 tracking-tight">
            Start free. Upgrade if it earns it.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          <div className="border border-ink/15 rounded-2xl p-8">
            <h3 className="font-display text-xl font-medium mb-1">Free</h3>
            <p className="text-ink/50 text-sm mb-6">For trying the adaptive loop</p>
            <div className="font-mono text-3xl font-semibold mb-6">$0</div>
            <ul className="space-y-3 text-sm text-ink/70 mb-8">
              <li className="flex gap-2"><span className="text-sage">—</span> 20 adaptive questions / day</li>
              <li className="flex gap-2"><span className="text-sage">—</span> Basic mastery map</li>
              <li className="flex gap-2"><span className="text-sage">—</span> 3 topic decks</li>
            </ul>
            <Link
              to="/register"
              className="block text-center border border-ink rounded-full py-3 text-sm font-semibold hover:bg-ink hover:text-parchment transition"
            >
              Get started
            </Link>
          </div>
          <div className="border-2 border-ink rounded-2xl p-8 bg-ink text-parchment relative">
            <span className="absolute -top-3 right-8 bg-amber text-ink text-[11px] font-mono uppercase tracking-wide px-3 py-1 rounded-full">
              Most used
            </span>
            <h3 className="font-display text-xl font-medium mb-1">Pro</h3>
            <p className="text-parchment/50 text-sm mb-6">For serious, ongoing prep</p>
            <div className="font-mono text-3xl font-semibold mb-6">
              $9<span className="text-base font-normal text-parchment/50">/mo</span>
            </div>
            <ul className="space-y-3 text-sm text-parchment/80 mb-8">
              <li className="flex gap-2"><span className="text-amber">—</span> Unlimited adaptive questions</li>
              <li className="flex gap-2"><span className="text-amber">—</span> Full mastery map + misconception log</li>
              <li className="flex gap-2"><span className="text-amber">—</span> Unlimited custom decks</li>
            </ul>
            <Link
              to="/register"
              className="block text-center bg-amber text-ink rounded-full py-3 text-sm font-semibold hover:bg-ambersoft transition"
            >
              Start Pro trial
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="bg-parchdim rounded-3xl px-8 md:px-16 py-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Stop reviewing what you already know.
          </h2>
          <p className="text-ink/60 max-w-md mx-auto mb-8">Recall finds the edge of your knowledge and stays there.</p>
          <Link
            to="/register"
            className="inline-block bg-ink text-parchment font-semibold px-8 py-3.5 rounded-full hover:bg-inkdeep transition text-sm"
          >
            Create free account
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-ink/40">
          <span className="font-display text-ink/70">Recall</span>
          <span>© 2026 Recall. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}