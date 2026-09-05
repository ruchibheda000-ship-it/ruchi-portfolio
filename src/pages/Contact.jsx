import { useState } from 'react'
import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#4f778f] text-[#281712] relative overflow-hidden font-display flex flex-col justify-between">
      {/* Background Locker Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-35 bg-locker"></div>

      {/* Navigation */}
      <div className="relative z-20">
        <Nav />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 flex-grow flex items-center justify-center">
        
        {/* CORKBOARD FRAME CONTAINER */}
        <div className="w-full rounded-sm p-4 sm:p-6 bg-[#c28e57] shadow-2xl border-4 sm:border-8 border-[#996531] ring-1 ring-black/20">
          <div className="rounded-sm bg-cork p-4 sm:p-8 overflow-hidden shadow-inner border border-[#804e22]">
            
            {/* Stationery / Postcard Sheet */}
            <div className="relative bg-[#f4ede1] text-[#281712] p-6 sm:p-10 rounded-xs shadow-xl rotate-[0.5deg] border-[1.5px] border-[#4b73b5] paper-crease">
              
              {/* Pushpins */}
              <div className="absolute -top-3 left-8 push-pin"></div>
              <div className="absolute -top-3 right-8 push-pin"></div>

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#281712]/15 pb-4 mb-6">
                <div className="border border-[#281712] rounded-full px-3 py-0.5 text-xs font-bold bg-[#281712] text-[#f4ede1]">
                  DISPATCH // CONTACT
                </div>
                <div className="flex items-center gap-2 font-pixel text-xs text-[#4b73b5]">
                  <PixelSparkle size={16} />
                  <span>COMMISSIONS & INQUIRIES</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#281712] mb-2">
                Send a Message
              </h1>
              <p className="text-xs sm:text-sm text-[#281712]/80 mb-6">
                Have a project in mind, an inquiry about packaging or identity, or just want to connect? Leave a note below.
              </p>

              {submitted ? (
                <div className="bg-[#e4ddcb] border-2 border-dashed border-[#281712] p-8 rounded-sm text-center">
                  <div className="flex justify-center mb-3">
                    <PixelSparkle size={32} className="text-[#281712]" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl mb-1">
                    Message Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#281712]/80 mb-4">
                    Thank you, {formData.name || 'friend'}. I'll respond as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-display font-bold text-xs bg-[#281712] text-[#f4ede1] px-4 py-2 rounded-full hover:bg-black transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/75 border border-[#281712] rounded-sm px-3.5 py-2 text-sm text-[#281712] placeholder-[#281712]/40 focus:outline-none focus:ring-2 focus:ring-[#281712]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/75 border border-[#281712] rounded-sm px-3.5 py-2 text-sm text-[#281712] placeholder-[#281712]/40 focus:outline-none focus:ring-2 focus:ring-[#281712]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                      Project Notes / Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your project, timeline, or idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/75 border border-[#281712] rounded-sm px-3.5 py-2 text-sm text-[#281712] placeholder-[#281712]/40 focus:outline-none focus:ring-2 focus:ring-[#281712]"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="font-pixel text-[11px] text-[#281712]/70">
                      ✦ Direct: ruchi.bheda@gmail.com
                    </span>
                    <button
                      type="submit"
                      className="font-display font-extrabold text-sm bg-[#281712] text-[#f4ede1] px-6 py-2.5 rounded-full hover:bg-black shadow-sm transition-all hover:scale-102 active:scale-98"
                    >
                      Dispatch Note →
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full py-4 text-center">
        <Link
          to="/"
          className="font-pixel text-xs text-[#f4ede1] hover:underline"
        >
          ← Return to Main Poster
        </Link>
      </footer>
    </div>
  )
}
