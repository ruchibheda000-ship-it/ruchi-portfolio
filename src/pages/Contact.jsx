import React, { useState } from 'react'
import Nav from '../components/Nav'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' })
  const [checkedItems, setCheckedItems] = useState({
    opt1: true,
    opt2: true,
    opt3: true
  })

  const toggleCheck = (key) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#061840] text-[#F1E3CC] font-sans selection:bg-[#E4BA83] selection:text-[#061840] flex flex-col justify-between overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Nav />

      {/* Main Connect Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-8 sm:py-16 flex-grow">
        
        {/* Top Header */}
        <div className="pb-6 mb-12 border-b border-[#0B3272]">
          <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-[#8DA1B4]">
            <span className="w-2 h-2 rounded-full bg-[#E4BA83] animate-pulse"></span>
            <span>CONNECT // INQUIRIES & COLLABORATIONS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F1E3CC]">
            Let’s start a conversation.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive Checklist & Socials (Jackie Zhang Blueprint) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Interactive Checklist Card */}
            <div className="bg-[#0B3272]/25 p-6 sm:p-8 rounded-lg border border-[#0B3272] shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#0B3272] font-mono text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#E4BA83]">
                  WHAT I LOOK FOR IN WORK
                </span>
                <span className="text-[#8DA1B4]">CHECKLIST</span>
              </div>

              <div className="space-y-3 font-sans text-sm sm:text-base">
                <button
                  type="button"
                  onClick={() => toggleCheck('opt1')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#0B3272] bg-[#061840] hover:border-[#E4BA83]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                    {checkedItems.opt1 ? '✓' : ''}
                  </span>
                  <span className="text-[#F1E3CC] font-medium">Product Strategy & 0-to-1 UX Systems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt2')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#0B3272] bg-[#061840] hover:border-[#E4BA83]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                    {checkedItems.opt2 ? '✓' : ''}
                  </span>
                  <span className="text-[#F1E3CC] font-medium">High-impact, meaningful problems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt3')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#0B3272] bg-[#061840] hover:border-[#E4BA83]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#0B3272] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#E4BA83] text-[#061840] border-[#E4BA83]' : 'bg-transparent'}`}>
                    {checkedItems.opt3 ? '✓' : ''}
                  </span>
                  <span className="text-[#F1E3CC] font-medium">Empathetic, ambitious teams</span>
                </button>
              </div>

              <div className="mt-5 pt-3 border-t border-[#0B3272] text-[11px] font-mono text-[#8DA1B4]">
                ✦ Click items to toggle values
              </div>
            </div>

            {/* Direct Connect & Social Links */}
            <div className="p-6 sm:p-8 rounded-lg border border-[#0B3272] bg-[#0B3272] text-[#F1E3CC] shadow-md space-y-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[#E4BA83]">
                ✦ DIRECT CHANNELS
              </div>
              <div className="space-y-2.5 font-sans text-sm">
                <a
                  href="https://www.linkedin.com/in/ruchibheda/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-[#061840]/60 transition-colors"
                >
                  <span className="font-medium text-[#F1E3CC]">LinkedIn</span>
                  <span className="font-mono text-xs text-[#8DA1B4]">in/ruchibheda ↗</span>
                </a>
                <a
                  href="https://www.behance.net/ruchibheda2"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-[#061840]/60 transition-colors"
                >
                  <span className="font-medium text-[#F1E3CC]">Behance</span>
                  <span className="font-mono text-xs text-[#8DA1B4]">ruchibheda2 ↗</span>
                </a>
                <a
                  href="https://www.instagram.com/withloveruchi/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-[#061840]/60 transition-colors"
                >
                  <span className="font-medium text-[#F1E3CC]">Instagram</span>
                  <span className="font-mono text-xs text-[#8DA1B4]">@withloveruchi ↗</span>
                </a>
              </div>
              <div className="pt-4 border-t border-[#061840] text-[11px] font-mono text-[#8DA1B4]">
                Location: Mumbai, India • Time zone: GMT +5:30
              </div>
            </div>

          </div>

          {/* Right Column: Dispatch Form Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#0B3272]/25 text-[#F1E3CC] p-8 sm:p-12 rounded-lg border border-[#0B3272] shadow-sm">
              
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#0B3272] font-mono text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#E4BA83]">
                  DISPATCH CARD
                </span>
                <span className="text-[#8DA1B4]">RESPONSE: 24–48 HRS</span>
              </div>

              {submitted ? (
                <div className="py-16 px-6 text-center space-y-4">
                  <div className="text-3xl text-[#E4BA83]">✦</div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F1E3CC]">
                    Message Dispatched!
                  </h2>
                  <p className="text-sm sm:text-base text-[#8DA1B4] max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.name || 'friend'}</strong>. I have received your note and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', projectType: '', message: '' })
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-[#0B3272] text-xs font-mono text-[#8DA1B4] hover:border-[#E4BA83] hover:text-[#F1E3CC] transition-colors"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#8DA1B4] mb-2">
                      01. What is your name? *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Carter"
                      className="w-full px-4 py-3 rounded-md border border-[#0B3272] bg-[#061840] text-[#F1E3CC] placeholder-[#8DA1B4]/50 text-sm focus:outline-hidden focus:border-[#E4BA83] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#8DA1B4] mb-2">
                      02. Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-4 py-3 rounded-md border border-[#0B3272] bg-[#061840] text-[#F1E3CC] placeholder-[#8DA1B4]/50 text-sm focus:outline-hidden focus:border-[#E4BA83] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#8DA1B4] mb-2">
                      03. Project Scope / Inquiries
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-[#0B3272] bg-[#061840] text-[#F1E3CC] text-sm focus:outline-hidden focus:border-[#E4BA83] transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-[#061840] text-[#8DA1B4]">Select scope...</option>
                      <option value="full-time" className="bg-[#061840] text-[#F1E3CC]">Full-time Product Designer Role</option>
                      <option value="design-system" className="bg-[#061840] text-[#F1E3CC]">Design System & Complex UX</option>
                      <option value="mobile-web" className="bg-[#061840] text-[#F1E3CC]">0-to-1 Web / Mobile App</option>
                      <option value="wayfinding" className="bg-[#061840] text-[#F1E3CC]">Spatial & Environmental Wayfinding</option>
                      <option value="say-hi" className="bg-[#061840] text-[#F1E3CC]">Casual Coffee / Say Hello</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#8DA1B4] mb-2">
                      04. How can I help? *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a bit about what you're working on, timelines, and how you think we can work together..."
                      className="w-full px-4 py-3 rounded-md border border-[#0B3272] bg-[#061840] text-[#F1E3CC] placeholder-[#8DA1B4]/50 text-sm focus:outline-hidden focus:border-[#E4BA83] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#0B3272] text-[#F1E3CC] font-medium text-sm border border-[#0B3272] hover:bg-[#E4BA83] hover:text-[#061840] hover:border-[#E4BA83] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Dispatch Note</span>
                    <span>→</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      {/* Editorial Footer */}
      <footer className="w-full border-t border-[#0B3272] py-8 px-6 sm:px-12 lg:px-20 text-xs font-mono text-[#8DA1B4] bg-[#061840]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#F1E3CC]">✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Product Designer</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
