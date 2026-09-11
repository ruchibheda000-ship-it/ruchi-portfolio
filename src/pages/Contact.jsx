import React, { useState } from 'react'
import Nav from '../components/Nav'
import PixelSparkle from '../components/PixelSparkle'
import { Link } from 'react-router-dom'

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
    <div className="min-h-screen bg-[#FFFED8] bg-notebook-grid text-[#173C64] font-body selection:bg-[#173C64] selection:text-[#FFFED8] flex flex-col justify-between overflow-x-hidden">
      
      {/* Editorial Navigation */}
      <Nav />

      {/* Main Connect Content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex-grow">
        
        {/* Top Header */}
        <div className="pb-6 mb-10 border-b-2 border-[#173C64]">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#173C64]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173C64] animate-pulse"></span>
            <span>CONNECT // INQUIRIES & COLLABORATIONS</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#173C64]">
            Let’s start a conversation.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Checklist & Socials (Jackie Zhang Blueprint) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Interactive Checklist Card */}
            <div className="bg-[#FFFED8] bg-notebook-grid p-6 sm:p-8 rounded-xs border-2 border-[#173C64] shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#173C64]/20 font-mono text-xs">
                <span className="font-bold uppercase tracking-wider">
                  WHAT I LOOK FOR IN WORK
                </span>
                <span className="text-[#173C64]/60">CHECKLIST</span>
              </div>

              <div className="space-y-3 font-display font-bold text-sm sm:text-base">
                <button
                  type="button"
                  onClick={() => toggleCheck('opt1')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt1 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt1 ? '✓' : ''}
                  </span>
                  <span>Product Strategy & 0-to-1 UX Systems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt2')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt2 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt2 ? '✓' : ''}
                  </span>
                  <span>High-impact, meaningful problems</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCheck('opt3')}
                  className="w-full flex items-center gap-3 p-3 rounded-xs border border-[#173C64]/30 hover:bg-[#173C64]/5 transition-colors cursor-pointer text-left"
                >
                  <span className={`w-5 h-5 rounded-xs border-2 border-[#173C64] flex items-center justify-center font-mono text-xs ${checkedItems.opt3 ? 'bg-[#173C64] text-[#FFFED8]' : 'bg-transparent'}`}>
                    {checkedItems.opt3 ? '✓' : ''}
                  </span>
                  <span>Empathetic, ambitious teams</span>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#173C64]/15 text-[11px] font-mono text-[#173C64]/70">
                ✦ Click items to toggle values
              </div>
            </div>

            {/* Direct Connect & Social Links */}
            <div className="p-6 rounded-xs border-2 border-[#173C64] bg-[#173C64] text-[#FFFED8] shadow-lg space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FFFED8]/70">
                ✦ DIRECT CHANNELS
              </div>
              <div className="space-y-2 font-display text-sm font-semibold">
                <a
                  href="https://www.linkedin.com/in/ruchibheda/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded hover:bg-[#FFFED8]/10 transition-colors"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono text-xs text-[#FFFED8]/70">in/ruchibheda ↗</span>
                </a>
                <a
                  href="https://www.behance.net/ruchibheda2"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded hover:bg-[#FFFED8]/10 transition-colors"
                >
                  <span>Behance</span>
                  <span className="font-mono text-xs text-[#FFFED8]/70">ruchibheda2 ↗</span>
                </a>
                <a
                  href="https://www.instagram.com/withloveruchi/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded hover:bg-[#FFFED8]/10 transition-colors"
                >
                  <span>Instagram</span>
                  <span className="font-mono text-xs text-[#FFFED8]/70">@withloveruchi ↗</span>
                </a>
              </div>
              <div className="pt-3 border-t border-[#FFFED8]/20 text-[11px] font-mono text-[#FFFED8]/60">
                Location: Mumbai, India • Time zone: GMT +5:30
              </div>
            </div>

          </div>

          {/* Right Column: Dispatch Form Card */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#FFFED8] bg-notebook-grid text-[#173C64] p-6 sm:p-10 rounded-xs border-2 sm:border-4 border-[#173C64] shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#173C64]/20 font-mono text-xs">
                <span className="font-bold uppercase tracking-wider">
                  DISPATCH CARD
                </span>
                <span className="text-[#173C64]/70">RESPONSE: 24–48 HRS</span>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <PixelSparkle size={36} className="text-[#173C64]" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#173C64]">
                    Message Dispatched!
                  </h2>
                  <p className="text-sm sm:text-base text-[#173C64]/85 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.name || 'friend'}</strong>. I have received your note and will get back to you shortly.
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-[#173C64] font-display font-bold text-xs hover:bg-[#173C64] hover:text-[#FFFED8] transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider font-bold mb-1.5 text-[#173C64]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFFED8] border-2 border-[#173C64] rounded-xs px-4 py-2.5 text-sm sm:text-base font-display text-[#173C64] focus:outline-hidden focus:ring-2 focus:ring-[#173C64]/30"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider font-bold mb-1.5 text-[#173C64]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFFED8] border-2 border-[#173C64] rounded-xs px-4 py-2.5 text-sm sm:text-base font-display text-[#173C64] focus:outline-hidden focus:ring-2 focus:ring-[#173C64]/30"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider font-bold mb-1.5 text-[#173C64]">
                      Project Type or Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HealthTech UX, Design System, Advisory"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#FFFED8] border-2 border-[#173C64] rounded-xs px-4 py-2.5 text-sm sm:text-base font-display text-[#173C64] focus:outline-hidden focus:ring-2 focus:ring-[#173C64]/30"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider font-bold mb-1.5 text-[#173C64]">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me a bit about what you're building, the challenges you're facing, and how you envision us collaborating..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FFFED8] border-2 border-[#173C64] rounded-xs px-4 py-2.5 text-sm sm:text-base font-display text-[#173C64] focus:outline-hidden focus:ring-2 focus:ring-[#173C64]/30 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#173C64]/60">
                      ✦ Direct reply guaranteed
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#173C64] text-[#FFFED8] font-display font-bold text-sm tracking-wide shadow-md hover:bg-[#0e2640] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <span>Send Dispatch</span>
                      <span className="font-mono">→</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      {/* Page Footer */}
      <footer className="w-full border-t border-[#173C64]/20 py-6 px-4 sm:px-8 text-center text-xs font-mono text-[#173C64]/70 bg-[#FFFED8]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>✦ Ruchi Bheda © 2026</span>
          <span>UI/UX Designer & Product Designer</span>
          <span>Mumbai, India • GMT +5:30</span>
        </div>
      </footer>

    </div>
  )
}
