import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata('aiCoach')

const features = [
  {
    title: 'It will listen differently.',
    body: "Most tools give generic responses. The AI Coach reads your specific Identity Gap score, your current phase in the 30-day journey, and your daily evidence — then responds to you, not to a profile type.",
  },
  {
    title: 'It will ask before it answers.',
    body: 'Before offering any insight, it asks one question that most people have never been asked before. That question is usually enough.',
  },
  {
    title: 'It will remember your journey.',
    body: "Each conversation builds on the last. It tracks what you said three weeks ago about your decision patterns. It notices the shift before you do.",
  },
  {
    title: 'It will not push you.',
    body: "There is no urgency. No daily streaks. No guilt if you disappear for a week. When you return, it picks up where you left off — with the same quiet consistency the methodology is built on.",
  },
]

export default function AICoachPage() {
  return (
    <main className="min-h-screen bg-[#0F1C2E] text-white">
      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="inline-block text-xs font-medium tracking-widest text-[#3DD4B0] uppercase mb-6">
          Coming Q3 2026
        </span>
        <h1 className="text-4xl font-light leading-snug mb-6">
          The AI Coach is coming.
          <br />
          <span className="text-[#3DD4B0]">
            And it knows the difference between advice and insight.
          </span>
        </h1>
        <p className="text-[#8899AA] text-lg leading-relaxed mb-4">
          Most coaching tools give you frameworks.
          <br />
          This one asks better questions.
        </p>
        <p className="text-[#8899AA] leading-relaxed">
          The Tamkinly AI Identity Coach is built on the same evidence-based
          methodology as the Identity Recode Planner — neuroplasticity,
          self-authorship, locus of control, the Maintain IT Model.
        </p>
        <p className="text-white mt-6 font-light">
          It doesn&apos;t motivate. It reflects.
          <br />
          It doesn&apos;t tell you what to do. It shows you what you already know
          but haven&apos;t said clearly yet.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <h2 className="text-xs font-medium tracking-widest text-[#3DD4B0] uppercase mb-8 text-center">
          What it will do
        </h2>
        <div className="space-y-8">
          {features.map((f) => (
            <div key={f.title} className="border-l-2 border-[#1F6F78] pl-6">
              <h3 className="text-white font-medium mb-2">{f.title}</h3>
              <p className="text-[#8899AA] leading-relaxed text-sm">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section className="max-w-lg mx-auto px-6 pb-24 text-center">
        <h2 className="text-xl font-light mb-3">Be among the first to use it.</h2>
        <p className="text-[#8899AA] text-sm mb-8">
          Leave your email and we&apos;ll notify you the moment the AI Coach is
          ready. No other emails. No newsletters unless you ask. Just a single
          message when it&apos;s live.
        </p>
        <form action="/api/waitlist" method="POST" className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3
                       text-white placeholder:text-white/40 text-sm
                       focus:outline-none focus:border-[#3DD4B0]"
          />
          <input type="hidden" name="product" value="ai-coach" />
          <button
            type="submit"
            className="bg-[#3DD4B0] text-[#0F1C2E] font-medium px-5 py-3 rounded-lg
                       text-sm hover:bg-[#2FC4A0] transition-colors"
          >
            Notify me
          </button>
        </form>
        <p className="text-[#8899AA] text-xs mt-4">
          Stay curious. There is no rush here.
        </p>
      </section>
    </main>
  )
}
