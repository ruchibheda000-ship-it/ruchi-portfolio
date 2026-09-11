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
    <div className="min-h-screen bg-[#F5EFEB] text-[#171717] font-sans selection:bg-[#E35342] selection:text-[#F5EFEB] flex flex-col justify-between overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Nav />

      {/* Main Connect Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-8 sm:py-16 flex-grow">
        
        {/* Top Header */}
        <div className="pb-6 mb-12 border-b border-[#171717]/15">
          <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest text-[#171717]/60">
            <span className="w-2 h-2 rounded-full bg-[#E35342] animate-pulse"></span>
            <span>CONNECT // INQUIRIES & COLLABORATIONS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#171717]">
            Let’s start a conversation.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive Checklist & Socials (Jackie Zhang Blueprint) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Interactive Checklist Card */}
            <div className="bg-[#F5EFEB] p-6 sm:p-8 rounded-lg border border-[#171717]/15 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#171717]/10 font-mono text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#171717]">
                  WHAT I LOOK FOR IN WORK
                </span>
                <span className="text-[#171717]/50">CHECKLIST</span>
              </div>

              <div className="space-y-3 font-sans text-sm sm:text-base">
                <button
                  type="button"
                  onClick={() => toggleCheck('opt1')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#171717]/15 bg-white/50 hover:border-[#171717]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#171717]/40 flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#E35342] text-white border-[#E35342]' : 'bg-white'}`}>
                    {checkedItems.opt1 ? '✓' : ''}
                  </span>
                  <span className="text-[#171717] font-medium">Product Strategy & 0-to-1 UX Systems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt2')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#171717]/15 bg-white/50 hover:border-[#171717]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#171717]/40 flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#E35342] text-white border-[#E35342]' : 'bg-white'}`}>
                    {checkedItems.opt2 ? '✓' : ''}
                  </span>
                  <span className="text-[#171717] font-medium">High-impact, meaningful problems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt3')}
                  className="w-full flex items-center gap-3 p-3.5 rounded-md border border-[#171717]/15 bg-white/50 hover:border-[#171717]/40 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded border border-[#171717]/40 flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#E35342] text-white border-[#E35342]' : 'bg-white'}`}>
                    {checkedItems.opt3 ? '✓' : ''}
                  </span>
                  <span className="text-[#171717] font-medium">Empathetic, ambitious teams</span>
                </button>
              </div>

              <div className="mt-5 pt-3 border-t border-[#171717]/10 text-[11px] font-mono text-[#171717]/60">
                ✦ Click items to toggle values
              </div>
            </div>

            {/* Direct Connect & Social Links */}
            <div className="p-6 sm:p-8 rounded-lg border border-[#171717] bg-[#171717] text-[#F5EFEB] shadow-md space-y-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[#F5EFEB]/60">
                ✦ DIRECT CHANNELS
              </div>
              <div className="space-y-2.5 font-sans text-sm">
                <a
                  href="https://www.linkedin.com/in/ruchibheda/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-white/10 transition-colors"
                >
                  <span className="font-medium">LinkedIn</span>
                  <span className="font-mono text-xs text-[#F5EFEB]/60">in/ruchibheda ↗</span>
                </a>
                <a
                  href="https://www.behance.net/ruchibheda2"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-white/10 transition-colors"
                >
                  <span className="font-medium">Behance</span>
                  <span className="font-mono text-xs text-[#F5EFEB]/60">ruchibheda2 ↗</span>
                </a>
                <a
                  href="https://www.instagram.com/withloveruchi/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded hover:bg-white/10 transition-colors"
                >
                  <span className="font-medium">Instagram</span>
                  <span className="font-mono text-xs text-[#F5EFEB]/60">@withloveruchi ↗</span>
                </a>
              </div>
              <div className="pt-4 border-t border-white/15 text-[11px] font-mono text-[#F5EFEB]/60">
                Location: Mumbai, India • Time zone: GMT +5:30
              </div>
            </div>

          </div>

          {/* Right Column: Dispatch Form Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#F5EFEB] text-[#171717] p-8 sm:p-12 rounded-lg border border-[#171717]/15 shadow-sm">
              
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#171717]/10 font-mono text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#171717]">
                  DISPATCH CARD
                </span>
                <span className="text-[#171717]/60">RESPONSE: 24–48 HRS</span>
              </div>

              {submitted ? (
                <div className="py-16 px-6 text-center space-y-4">
                  <div className="text-3xl text-[#E35342]">✦</div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
                    Message Dispatched!
                  </h2>
                  <p className="text-sm sm:text-base text-[#171717]/80 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.name || 'friend'}</strong>. I have received your note and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', projectType: '', message: '' })
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-[#171717]/30 text-xs font-mono hover:border-[#171717] transition-colors"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#171717]/70 mb-2">
                      01. What is your name? *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Carter"
                      className="w-full px-4 py-3 rounded-md border border-[#171717]/20 bg-white/70 text-[#171717] text-sm focus:outline-hidden focus:border-[#E35342] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#171717]/70 mb-2">
                      02. Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., alex@company.com"
                      className="w-full px-4 py-3 rounded-md border border-[#171717]/20 bg-white/70 text-[#171717] text-sm focus:outline-hidden focus:border-[#E35342] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#171717]/70 mb-2">
                      03. Project Scope / Inquiries
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border border-[#171717]/20 bg-white/70 text-[#171717] text-sm focus:outline-hidden focus:border-[#E35342] transition-colors cursor-pointer"
                    >
                      <option value="">Select scope...</option>
                      <option value="full-time">Full-time Product Designer Role</option>
                      <option value="design-system">Design System & Complex UX</option>
                      <option value="mobile-web">0-to-1 Web / Mobile App</option>
                      <option value="wayfinding">Spatial & Environmental Wayfinding</option>
                      <option value="say-hi">Casual Coffee / Say Hello</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#171717]/70 mb-2">
                      04. How can I help? *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a bit about what you're working on, timelines, and how you think we can work together..."
                      className="w-full px-4 py-3 rounded-md border border-[#171717]/20 bg-white/70 text-[#171717] text-sm focus:outline-hidden focus:border-[#E35342] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#171717] text-[#F5EFEB] font-medium text-sm hover:bg-[#E35342] transition-colors cursor-pointer flex items-center justify-center gap-2"
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
      <footer className="w-full border-t border-[#171717]/15 py-8 px-6 sm:px-12 lg:px-20 text-xs font-mono text-[#171717]/60 bg-[#F5EFEB]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#171717]">✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Product Designer</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
