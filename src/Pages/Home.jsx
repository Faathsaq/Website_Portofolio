import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AOS from "aos"
import "aos/dist/aos.css"

/* palette: #756AB6 -> #AC87C5 -> #E0AED0 */

/* ===================== BADGE ===================== */
const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-700"></div>
      <div className="relative px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-[#E0AED0]">
        <span className="bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] text-transparent bg-clip-text text-sm font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-[#AC87C5]" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
))

/* ===================== TITLE ===================== */
const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#1E1B4B]">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r  from-blue-200 via-purple-200 to-pink-200 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r  from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Aspiring
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r  from-blue-200 via-purple-200 to-pink-200 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r  from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
          UI/UX Designer
        </span>
      </span>
    </h1>
  </div>
))

/* ===================== TECH ===================== */
const TechStack = memo(({ tech }) => (
  <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#E0AED0] text-xs sm:text-sm text-[#1E1B4B] hover:bg-[#E0AED0]/30 transition">
    {tech}
  </div>
))

/* ===================== CTA ===================== */
const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] rounded-xl opacity-30 blur-sm group-hover:opacity-80 transition-all duration-700"></div>
      <div className="relative h-11 bg-white/80 backdrop-blur rounded-lg border border-[#E0AED0] overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#756AB6]/10 via-[#AC87C5]/10 to-[#E0AED0]/10"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm transition-all duration-300">
          <span className="bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className="w-4 h-4 text-[#756AB6] z-10 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </button>
  </a>
))

/* ===================== SOCIAL ===================== */
const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] rounded-xl blur opacity-30 group-hover:opacity-50 transition"></div>
      <div className="relative rounded-xl bg-white/80 backdrop-blur p-2 border border-[#E0AED0]">
        <Icon className="w-5 h-5 text-[#756AB6] group-hover:text-[#AC87C5] transition-colors" />
      </div>
    </button>
  </a>
))

const WORDS = ["Creative UI/UX Designer", "Visual Problem Solver"]
const TECH_STACK = ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping"]
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Faathsaq" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/atha-6704b6287/" },
  { icon: Instagram, link: "https://www.instagram.com/lorem_ipsuumm/" }
]

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    AOS.init({ once: true, offset: 10 })
  }, [])

  const handleTyping = useCallback(() => {
    const currentWord = WORDS[wordIndex]
    if (isTyping) {
      if (charIndex < currentWord.length) {
        setText(prev => prev + currentWord[charIndex])
        setCharIndex(prev => prev + 1)
      } else {
        setTimeout(() => setIsTyping(false), 1500)
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length)
        setIsTyping(true)
      }
    }
  }, [charIndex, isTyping, wordIndex])

  useEffect(() => {
    const t = setTimeout(handleTyping, isTyping ? 100 : 50)
    return () => clearTimeout(t)
  }, [handleTyping])

  return (
    <div
      id="Home"
      className="min-h-screen bg-[#F3F8FF] pt-24 px-[5%] lg:px-[10%] overflow-hidden"
    >
      <div className="container mx-auto min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* LEFT */}
        <div className="lg:w-1/2 space-y-8" data-aos="fade-right">
          <StatusBadge />
          <MainTitle />

          <div className="h-8 flex items-center">
            <span className="text-xl md:text-2xl bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] bg-clip-text text-transparent">
              {text}
            </span>
            <span className="w-[3px] h-6 bg-[#756AB6] ml-1 animate-blink"></span>
          </div>

          {/* Lottie Mobile */}
          <div className="w-full flex justify-center lg:hidden mb-4">
            <DotLottieReact
              src="https://lottie.host/5b9bc56d-ba03-480a-a693-20a94f8f7a36/9OMzm7tlAC.lottie"
              loop
              autoplay
              className="w-full max-w-[300px] h-[300px]"
            />
          </div>

          <p className="text-[#4B5563] max-w-xl">
            Transforming ideas into intuitive and meaningful digital experiences.
          </p>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((t, i) => <TechStack key={i} tech={t} />)}
          </div>

          <div className="flex gap-3">
            <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
            <CTAButton href="#Contact" text="Contact" icon={Mail} />
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s, i) => <SocialLink key={i} {...s} />)}
          </div>
        </div>

        {/* RIGHT / Lottie Desktop */}
        <div className="hidden lg:flex w-1/2 items-center justify-center mt-12 lg:mt-0 h-[500px]" data-aos="fade-left">
          <DotLottieReact
            src="https://lottie.host/5b9bc56d-ba03-480a-a693-20a94f8f7a36/9OMzm7tlAC.lottie"
            loop
            autoplay
            className="w-full h-full max-w-none scale-150"
          />
        </div>
      </div>
    </div>
  )
}

export default memo(Home)
