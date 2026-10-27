import React, { useState, useEffect, useRef } from 'react'

export default function CaseStudyModal({ project, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('physician') // 'physician' | 'patient'
  const [triageStatus, setTriageStatus] = useState('Review')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const contentRef = useRef(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Track scroll progress inside modal
  const handleScroll = (e) => {
    const el = e.target
    const total = el.scrollHeight - el.clientHeight
    if (total > 0) {
      setScrollProgress((el.scrollTop / total) * 100)
    }

    // Determine current section in view
    const sections = ['overview', 'problem', 'research', 'solution', 'design-system', 'impact']
    for (const sec of sections) {
      const target = document.getElementById(`cs-${sec}`)
      if (target) {
        const rect = target.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom >= 100) {
          setActiveSection(sec)
          break
        }
      }
    }
  }

  const scrollTo = (id) => {
    const target = document.getElementById(`cs-${id}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!isOpen || !project) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030d24]/90 backdrop-blur-xl p-2 sm:p-4 md:p-6 lg:p-8 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Case Study`}
    >
      {/* Top Floating Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#0B3272] z-[120] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#E4BA83] to-[#FFFED8] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Case Study Document Shell */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[94vh] overflow-y-auto bg-[#061840] text-[#F1E3CC] rounded-2xl border border-[#0B3272] shadow-[0_30px_90px_rgba(0,0,0,0.9)] scroll-smooth custom-scrollbar"
      >
        {/* Sticky Header Nav Bar */}
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 sm:px-10 py-4 bg-[#061840]/90 backdrop-blur-md border-b border-[#0B3272]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0B3272] text-[#E4BA83]">
              01 // CASE STUDY
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-[#F1E3CC] tracking-tight">
              Ease Healthcare
            </span>
            <span className="hidden md:inline font-mono text-xs text-[#8DA1B4]">
              • 16-Week Deep Dive
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Navigation Pills for Large Screens */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-xs text-[#8DA1B4] bg-[#030d24] p-1 rounded-full border border-[#0B3272]">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'problem', label: 'Problem' },
                { id: 'research', label: 'Research' },
                { id: 'solution', label: 'Interactive UI' },
                { id: 'design-system', label: 'System' },
                { id: 'impact', label: 'Impact' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    activeSection === sec.id
                      ? 'bg-[#E4BA83] text-[#030d24] font-bold'
                      : 'hover:text-[#F1E3CC]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Tactile Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3272] hover:bg-[#E4BA83] text-[#F1E3CC] hover:text-[#030d24] border border-[#E4BA83]/40 font-mono text-xs font-bold transition-all duration-200 cursor-pointer shadow-md"
              title="Close (Esc)"
              aria-label="Close Case Study"
            >
              <span>✕</span>
              <span className="hidden sm:inline">CLOSE [ESC]</span>
            </button>
          </div>
        </header>

        {/* Case Study Body Content */}
        <div className="p-6 sm:p-10 lg:p-14 space-y-16">
          
          {/* ================================================================= */}
          {/* SECTION 1: HERO & EXECUTIVE METRICS                               */}
          {/* ================================================================= */}
          <section id="cs-overview" className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-[#8DA1B4] uppercase tracking-wider">
                <span className="text-[#E4BA83]">✦</span>
                <span>PRODUCT DESIGN LEAD</span>
                <span>•</span>
                <span>CLINICAL WORKFLOWS</span>
                <span>•</span>
                <span>2025</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F1E3CC] tracking-tight leading-[1.1]">
                Ease: Re-imagining clinical triage & patient transparency from the ground up.
              </h1>
              <p className="font-sans text-base sm:text-xl text-[#8DA1B4] max-w-3xl leading-relaxed">
                A modern healthcare suite bridging high-density hospital emergency triaging with a compassionate, milestone-driven patient appointment journey.
              </p>
            </div>

            {/* Executive Metrics Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { metric: '-40%', label: 'Intake Friction', detail: 'Eliminated duplicated intake questions across 6 departments' },
                { metric: '88%', label: 'Patient CSAT', detail: 'Up from 54% legacy hospital baseline' },
                { metric: '0', label: 'Transcription Errors', detail: 'Across 4,200 simulated clinical medication passes' },
                { metric: '3.2m', label: 'Saved Per Consult', detail: 'Direct physician consultation time recovered per patient' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#030d24] p-4 sm:p-5 rounded-xl border border-[#0B3272] relative overflow-hidden"
                >
                  <div className="font-serif text-3xl sm:text-4xl text-[#E4BA83] font-normal mb-1">
                    {card.metric}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#F1E3CC] uppercase tracking-wider mb-1.5">
                    {card.label}
                  </div>
                  <div className="text-[11px] font-sans text-[#8DA1B4] leading-snug">
                    {card.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Project Blueprint Meta Sheet */}
            <div className="bg-[#0B3272]/20 border border-[#0B3272] rounded-xl p-5 sm:p-7 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <span className="text-[#8DA1B4] block mb-1 uppercase tracking-widest text-[10px]">ROLE</span>
                <span className="text-[#F1E3CC] font-bold">Lead Product Designer</span>
              </div>
              <div>
                <span className="text-[#8DA1B4] block mb-1 uppercase tracking-widest text-[10px]">TIMELINE</span>
                <span className="text-[#F1E3CC] font-bold">16 Weeks (Discovery to Pilot)</span>
              </div>
              <div>
                <span className="text-[#8DA1B4] block mb-1 uppercase tracking-widest text-[10px]">TEAM COMPOSITION</span>
                <span className="text-[#F1E3CC] font-bold">1 Designer, 2 MD Advisors, 4 Devs</span>
              </div>
              <div>
                <span className="text-[#8DA1B4] block mb-1 uppercase tracking-widest text-[10px]">TOOLS</span>
                <span className="text-[#F1E3CC] font-bold">Figma, ProtoPie, EHR Integrations</span>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* SECTION 2: THE BROKEN REALITY (THE PROBLEM)                       */}
          {/* ================================================================= */}
          <section id="cs-problem" className="space-y-6 pt-6 border-t border-[#0B3272]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] uppercase tracking-widest">
              <span>02 // THE PROBLEM SPACE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1E3CC] font-normal">
              The Clipboard Paradox: High-Tech Medicine, Low-Tech Intake
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8DA1B4] leading-relaxed max-w-3xl">
              Hospitals invest millions into advanced MRI machines and robotic surgery, yet when a sick patient enters the clinic, they are handed a flimsy wooden clipboard with a 6-page paper questionnaire. Meanwhile, emergency physicians scramble through 12-tab legacy EHR software under intense time pressure.
            </p>

            {/* Pain Points Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Legacy Crisis Card */}
              <div className="bg-[#121316]/80 p-6 rounded-xl border border-red-900/40 relative">
                <div className="flex items-center gap-2 font-mono text-xs text-red-400 font-bold mb-3 uppercase tracking-wider">
                  <span>✕ Legacy Clinical Journey</span>
                </div>
                <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#8DA1B4]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Duplicated Questions:</strong> Patients fill out allergy lists 3 separate times (front desk, intake nurse, physician).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Waiting Room Opacity:</strong> No visibility into when or why a delay is occurring, generating acute patient anxiety.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong>Physician Burnout:</strong> 8-minute average triage consultations consumed by manual data entry instead of patient eye contact.</span>
                  </li>
                </ul>
              </div>

              {/* The Ease Hypothesis Card */}
              <div className="bg-[#030d24] p-6 rounded-xl border border-[#E4BA83]/40 relative">
                <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] font-bold mb-3 uppercase tracking-wider">
                  <span>✦ The Ease Architecture</span>
                </div>
                <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#F1E3CC]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4BA83] font-bold">•</span>
                    <span><strong>Single Living Digital Chart:</strong> Conversational pre-arrival triage that flows seamlessly into the triage console.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4BA83] font-bold">•</span>
                    <span><strong>Live Milestone Transparency:</strong> Clear, human stages (e.g., <em>"Lab Results Processing"</em>) keeping patients informed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E4BA83] font-bold">•</span>
                    <span><strong>Bento-Grid Clinical View:</strong> High-density, single-screen triage console giving doctors critical insights in 4 seconds.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tactile Researcher Note Card */}
            <div className="p-5 rounded-lg bg-[#FFFED8] text-[#061840] shadow-md border-l-4 border-[#E4BA83] font-hand text-lg sm:text-xl">
              "During our 40 hours of emergency room observation, we watched Dr. Vasquez toggle between 9 browser tabs just to verify if a patient's penicillin allergy was noted by triage. That was the exact moment we knew Ease had to eliminate tabs forever."
              <span className="block font-mono text-xs text-[#061840]/70 pt-2 tracking-wide font-bold">
                — Ruchi Bheda, Field Observation Log Week 3
              </span>
            </div>
          </section>

          {/* ================================================================= */}
          {/* SECTION 3: RESEARCH & PERSONAS                                    */}
          {/* ================================================================= */}
          <section id="cs-research" className="space-y-6 pt-6 border-t border-[#0B3272]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] uppercase tracking-widest">
              <span>03 // FIELD RESEARCH & PERSONAS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1E3CC] font-normal">
              Two Sides of the Examination Table
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8DA1B4] leading-relaxed max-w-3xl">
              A healthcare product fails if it only serves one stakeholder. We shadowed 14 nurses, 8 physicians, and conducted in-depth interviews with 26 patients with chronic conditions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Persona 1: Clinician */}
              <div className="p-6 rounded-xl bg-[#030d24] border border-[#0B3272] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-[#E4BA83] uppercase font-bold">
                    CLINICAL USER // DR. MEERA SHAH
                  </div>
                  <span className="text-xs font-mono text-[#8DA1B4] bg-[#0B3272] px-2 py-0.5 rounded">
                    ER Triage MD
                  </span>
                </div>
                <div className="text-sm font-sans text-[#F1E3CC] font-semibold">
                  "I need to know vital red flags before I touch the door handle. I don't have 5 minutes to read paragraph notes."
                </div>
                <div className="space-y-2 text-xs font-mono text-[#8DA1B4]">
                  <div><strong className="text-[#F1E3CC]">Mental Model:</strong> Speed, accuracy, cognitive overload defense.</div>
                  <div><strong className="text-[#F1E3CC]">Key Frustration:</strong> Information scattered across disconnected legacy software tabs.</div>
                  <div><strong className="text-[#F1E3CC]">Design Goal:</strong> One-glance risk hierarchy with automated drug-interaction alerts.</div>
                </div>
              </div>

              {/* Persona 2: Patient */}
              <div className="p-6 rounded-xl bg-[#030d24] border border-[#0B3272] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-[#E4BA83] uppercase font-bold">
                    PATIENT USER // AARAV PATEL
                  </div>
                  <span className="text-xs font-mono text-[#8DA1B4] bg-[#0B3272] px-2 py-0.5 rounded">
                    First-Time Patient
                  </span>
                </div>
                <div className="text-sm font-sans text-[#F1E3CC] font-semibold">
                  "Sitting in a waiting room with zero updates makes every 10 minutes feel like two hours. Am I next? Did they lose my chart?"
                </div>
                <div className="space-y-2 text-xs font-mono text-[#8DA1B4]">
                  <div><strong className="text-[#F1E3CC]">Mental Model:</strong> Vulnerability, physical discomfort, desire for clarity.</div>
                  <div><strong className="text-[#F1E3CC]">Key Frustration:</strong> Anxious waiting rooms and repeating medical history to 4 strangers.</div>
                  <div><strong className="text-[#F1E3CC]">Design Goal:</strong> Transparent live status steps & calm pre-arrival symptom capture.</div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* SECTION 4: INTERACTIVE UI PROTOTYPE EXPLORER                      */}
          {/* ================================================================= */}
          <section id="cs-solution" className="space-y-6 pt-6 border-t border-[#0B3272]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] uppercase tracking-widest mb-1">
                  <span>04 // INTERACTIVE PROTOTYPE</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#F1E3CC] font-normal">
                  The Dual-Experience Prototype
                </h2>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center p-1 bg-[#030d24] rounded-full border border-[#0B3272] font-mono text-xs">
                <button
                  onClick={() => setActiveTab('physician')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeTab === 'physician'
                      ? 'bg-[#E4BA83] text-[#030d24] font-bold shadow'
                      : 'text-[#8DA1B4] hover:text-[#F1E3CC]'
                  }`}
                >
                  Doctor's Triage Console
                </button>
                <button
                  onClick={() => setActiveTab('patient')}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeTab === 'patient'
                      ? 'bg-[#E4BA83] text-[#030d24] font-bold shadow'
                      : 'text-[#8DA1B4] hover:text-[#F1E3CC]'
                  }`}
                >
                  Patient Mobile Companion
                </button>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#8DA1B4] leading-relaxed max-w-3xl">
              Experience the live synchronized interfaces. Toggle between the high-density hospital workstation view and the serene mobile patient companion below.
            </p>

            {/* TAB 1: DOCTOR'S CONSOLE */}
            {activeTab === 'physician' && (
              <div className="p-5 sm:p-8 rounded-2xl bg-[#030d24] border-2 border-[#0B3272] shadow-2xl space-y-6">
                
                {/* Top Patient Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#0B3272]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0B3272] flex items-center justify-center font-mono font-bold text-lg text-[#E4BA83]">
                      AP
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl font-bold text-[#F1E3CC]">Aarav Patel</span>
                        <span className="text-xs font-mono text-[#8DA1B4] bg-[#0B3272]/50 px-2 py-0.5 rounded">
                          32y • M • MRN #84920
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#8DA1B4]">
                        Chief Complaint: Acute localized abdominal pain (Onset: 6h ago)
                      </span>
                    </div>
                  </div>

                  {/* Interactive Triage Selector */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[#8DA1B4]">Triage Status:</span>
                    {['Stable', 'Review', 'Priority'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setTriageStatus(st)}
                        className={`px-3 py-1 rounded cursor-pointer transition-colors font-bold ${
                          triageStatus === st
                            ? st === 'Priority'
                              ? 'bg-red-500 text-white'
                              : st === 'Review'
                              ? 'bg-[#E4BA83] text-[#030d24]'
                              : 'bg-emerald-600 text-white'
                            : 'bg-[#0B3272]/40 text-[#8DA1B4] hover:text-[#F1E3CC]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Console Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Vitals Column */}
                  <div className="bg-[#061840] p-4 rounded-xl border border-[#0B3272] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8DA1B4]">
                      <span className="font-bold text-[#E4BA83]">LIVE VITALS</span>
                      <span>Synced 2m ago</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-[#030d24] p-2.5 rounded border border-[#0B3272]">
                        <span className="text-[10px] font-mono text-[#8DA1B4] block">HR</span>
                        <span className="font-mono text-xl text-[#F1E3CC] font-bold">78</span>
                        <span className="text-[10px] font-mono text-emerald-400 block">bpm • Normal</span>
                      </div>
                      <div className="bg-[#030d24] p-2.5 rounded border border-[#0B3272]">
                        <span className="text-[10px] font-mono text-[#8DA1B4] block">BP</span>
                        <span className="font-mono text-xl text-[#F1E3CC] font-bold">128/84</span>
                        <span className="text-[10px] font-mono text-yellow-400 block">mmHg • Mild</span>
                      </div>
                      <div className="bg-[#030d24] p-2.5 rounded border border-[#0B3272]">
                        <span className="text-[10px] font-mono text-[#8DA1B4] block">SpO2</span>
                        <span className="font-mono text-xl text-[#F1E3CC] font-bold">99%</span>
                        <span className="text-[10px] font-mono text-emerald-400 block">Room air</span>
                      </div>
                      <div className="bg-[#030d24] p-2.5 rounded border border-[#0B3272]">
                        <span className="text-[10px] font-mono text-[#8DA1B4] block">TEMP</span>
                        <span className="font-mono text-xl text-[#F1E3CC] font-bold">99.1°</span>
                        <span className="text-[10px] font-mono text-yellow-400 block">Low fever</span>
                      </div>
                    </div>
                  </div>

                  {/* Red Flag Allergies & Meds */}
                  <div className="bg-[#061840] p-4 rounded-xl border border-[#0B3272] space-y-3">
                    <div className="text-xs font-mono text-[#E4BA83] font-bold">
                      CRITICAL FLAGS & ALLERGIES
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 flex items-center justify-between">
                        <span className="text-red-300 font-bold">⚠️ Penicillin (Severe)</span>
                        <span className="text-[10px] font-mono text-red-400">Anaphylaxis</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#030d24] border border-[#0B3272] flex items-center justify-between">
                        <span className="text-[#F1E3CC]">Ibuprofen / NSAIDs</span>
                        <span className="text-[10px] font-mono text-[#8DA1B4]">Mild rash</span>
                      </div>
                      <div className="p-2.5 rounded bg-[#030d24] border border-[#0B3272] text-[11px] text-[#8DA1B4]">
                        Current Meds: Metformin 500mg daily
                      </div>
                    </div>
                  </div>

                  {/* AI Diagnostic Trajectory */}
                  <div className="bg-[#061840] p-4 rounded-xl border border-[#0B3272] space-y-3">
                    <div className="text-xs font-mono text-[#E4BA83] font-bold flex items-center justify-between">
                      <span>CLINICAL TRAJECTORY</span>
                      <span className="text-[10px] text-[#8DA1B4]">AI SUGGESTED</span>
                    </div>
                    <div className="space-y-2 text-xs font-sans">
                      <div className="p-2 rounded bg-[#030d24] border border-[#0B3272]">
                        <span className="font-bold text-[#F1E3CC] block">1. Ultrasound Abdomen</span>
                        <span className="text-[#8DA1B4] text-[11px]">Ruled out appendiceal swelling</span>
                      </div>
                      <div className="p-2 rounded bg-[#030d24] border border-[#0B3272]">
                        <span className="font-bold text-[#F1E3CC] block">2. Complete Blood Count (CBC)</span>
                        <span className="text-[#8DA1B4] text-[11px]">Lab tech processing • ETA 14m</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#061840] rounded border border-[#0B3272] flex items-center justify-between text-xs font-mono text-[#8DA1B4]">
                  <span>✦ Interactive Demo: Try clicking the Triage Status buttons above to simulate live team re-routing</span>
                  <span className="text-[#E4BA83] font-bold">STATION ID: ER-BAY-04</span>
                </div>

              </div>
            )}

            {/* TAB 2: PATIENT COMPANION */}
            {activeTab === 'patient' && (
              <div className="flex justify-center p-4 sm:p-8 bg-[#030d24] rounded-2xl border-2 border-[#0B3272]">
                <div className="w-full max-w-sm rounded-[32px] bg-[#061840] border-4 border-[#0B3272] p-5 shadow-2xl space-y-5 text-[#F1E3CC]">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#8DA1B4] pb-2 border-b border-[#0B3272]">
                    <span>9:41 AM</span>
                    <span className="text-[#E4BA83]">EASE PATIENT PASS</span>
                    <span>100% 🔋</span>
                  </div>

                  {/* Greeting & Hospital Status */}
                  <div>
                    <span className="font-mono text-[11px] text-[#E4BA83] uppercase tracking-wider block">
                      ST. JUDE MEMORIAL HOSPITAL
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#F1E3CC]">
                      Good morning, Aarav
                    </h3>
                  </div>

                  {/* Live Progress Milestones */}
                  <div className="p-4 rounded-xl bg-[#030d24] border border-[#0B3272] space-y-3">
                    <div className="text-xs font-mono text-[#8DA1B4] flex items-center justify-between">
                      <span className="font-bold text-[#E4BA83]">VISIT MILESTONES</span>
                      <span>Step 3 of 4</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                        <span className="line-through text-[#8DA1B4]">Contactless Check-In (8:45 AM)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                        <span className="line-through text-[#8DA1B4]">Triage & Vitals Taken by Nurse Maria</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#0B3272]/40 p-2 rounded border border-[#E4BA83]/40">
                        <span className="w-5 h-5 rounded-full bg-[#E4BA83] text-[#030d24] flex items-center justify-center font-bold text-[10px] animate-pulse">3</span>
                        <div>
                          <strong className="text-[#F1E3CC] block">Lab Work Processing</strong>
                          <span className="text-[10px] text-[#8DA1B4]">Dr. Shah reviewing blood panel results</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[#8DA1B4]/60 opacity-60">
                        <span className="w-5 h-5 rounded-full border border-[#0B3272] flex items-center justify-center text-[10px]">4</span>
                        <span>Physician Consultation & Care Plan</span>
                      </div>
                    </div>
                  </div>

                  {/* Quiet Waiting Room Assistance */}
                  <div className="p-3.5 bg-[#030d24] rounded-xl border border-[#0B3272] space-y-1.5 text-xs">
                    <span className="font-mono text-[#E4BA83] font-bold block">Need immediate comfort?</span>
                    <p className="text-[11px] text-[#8DA1B4]">
                      Water stations are located directly across Bay 4. Tap below if your pain intensifies.
                    </p>
                    <button className="w-full mt-2 py-2 rounded-lg bg-[#0B3272] text-[#F1E3CC] font-mono text-xs font-bold hover:bg-[#E4BA83] hover:text-[#030d24] transition-colors">
                      Notify Nurse Maria
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ================================================================= */}
          {/* SECTION 5: DESIGN SYSTEM "VITALIS"                                */}
          {/* ================================================================= */}
          <section id="cs-design-system" className="space-y-6 pt-6 border-t border-[#0B3272]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] uppercase tracking-widest">
              <span>05 // DESIGN SYSTEM</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1E3CC] font-normal">
              Vitalis: High-Stress Accessibility Tokens
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8DA1B4] leading-relaxed max-w-3xl">
              Healthcare typography and color palettes cannot be decorative—they must be readable under flickering fluorescent lights, on dirty touchscreens, and by tired eyes after 12-hour shifts.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#030d24] p-5 rounded-xl border border-[#0B3272] space-y-2">
                <div className="w-full h-8 rounded bg-[#E4BA83]"></div>
                <div className="font-mono text-xs font-bold text-[#F1E3CC]">Clinical Ochre #E4BA83</div>
                <div className="text-xs text-[#8DA1B4]">Warm attention cue with 7.8:1 contrast on deep midnight slate.</div>
              </div>
              <div className="bg-[#030d24] p-5 rounded-xl border border-[#0B3272] space-y-2">
                <div className="w-full h-8 rounded bg-[#061840] border border-[#0B3272]"></div>
                <div className="font-mono text-xs font-bold text-[#F1E3CC]">Midnight Slate #061840</div>
                <div className="text-xs text-[#8DA1B4]">Reduces pupil strain during nighttime emergency shifts.</div>
              </div>
              <div className="bg-[#030d24] p-5 rounded-xl border border-[#0B3272] space-y-2">
                <div className="w-full h-8 rounded bg-red-500"></div>
                <div className="font-mono text-xs font-bold text-[#F1E3CC]">Allergy Alert Red #EF4444</div>
                <div className="text-xs text-[#8DA1B4]">Reserved strictly for anaphylaxis & life-threatening contraindications.</div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* SECTION 6: QUANTITATIVE IMPACT & RETROSPECTIVE                    */}
          {/* ================================================================= */}
          <section id="cs-impact" className="space-y-6 pt-6 border-t border-[#0B3272]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E4BA83] uppercase tracking-widest">
              <span>06 // IMPACT & REFLECTIONS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F1E3CC] font-normal">
              Validated Clinical Outcomes
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#8DA1B4] leading-relaxed max-w-3xl">
              Following an 8-week pilot deployment across 3 outpatient clinics and an urgent care center, Ease generated tangible improvements for both care teams and visiting patients.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#030d24] border border-[#0B3272] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-xl text-[#F1E3CC]">40% Reduction in Average Intake Duration</div>
                  <div className="text-xs font-mono text-[#8DA1B4] mt-1">Average intake dropped from 14.2 minutes to 8.5 minutes.</div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/30">
                  VERIFIED CLINICAL PILOT
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#030d24] border border-[#0B3272] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-serif text-xl text-[#F1E3CC]">Zero Medication Transcription Errors</div>
                  <div className="text-xs font-mono text-[#8DA1B4] mt-1">Across 4,200 medication passes due to automated cross-referencing.</div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded border border-emerald-500/30">
                  ZERO DEFECTS
                </span>
              </div>
            </div>

            {/* Reflection Note */}
            <div className="p-6 rounded-xl bg-[#0B3272]/20 border border-[#0B3272] space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#E4BA83] font-bold block">
                WHAT I LEARNED AS A DESIGNER
              </span>
              <p className="font-sans text-sm text-[#8DA1B4] leading-relaxed">
                "Designing for healthcare taught me that <em>empathy without efficiency is useless</em>. A patient doesn't just need a friendly UI—they need the doctor to not be distracted by cumbersome software so they can make the right diagnosis. The most compassionate design is the one that gets out of the way of human healing."
              </p>
            </div>
          </section>

          {/* Footer Navigation within Modal */}
          <div className="pt-10 border-t border-[#0B3272] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-[#8DA1B4]">
              CASE STUDY COMPLETED // EASE HEALTHCARE
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#E4BA83] text-[#030d24] font-serif font-bold hover:bg-[#FFFED8] transition-colors cursor-pointer shadow-lg"
            >
              Back to Workbench Archive ↗
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
