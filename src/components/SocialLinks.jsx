import { useEffect } from "react"
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  ExternalLink,
} from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/atha-6704b6287/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@lorem_ipsuumm",
    icon: Instagram,
    url: "https://www.instagram.com/lorem_ipsuumm/",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "YouTube",
    displayName: "Youtube",
    subText: "@fathal_null",
    icon: Youtube,
    url: "https://www.youtube.com/@fathal_null",
    color: "#FF0000",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@Faathsaq",
    icon: Github,
    url: "https://github.com/Faathsaq",
      color: "#000000", // HITAM
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "TikTok",
    displayName: "Tiktok",
    subText: "@ithaaff",
    icon: ({ className }) => (
      <svg viewBox="0 0 45 45" className={className}>
        <path
          d="M29.52 9.44c-2.88-.8-4.6-2.5-5.33-4.32V24.7c0 4.08-2.2 6.25-4.94 6.25-2.73 0-4.93-2.2-4.93-4.93 0-2.73 2.2-4.94 4.93-4.94.52 0 1.02.1 1.5.27v-5.99c-.5-.1-1-.16-1.5-.16-5.99 0-10.81 4.82-10.81 10.81 0 5.99 4.82 10.81 10.81 10.81 5.98 0 10.81-4.82 10.81-10.81V12.8c1.9 1.32 4.2 2.1 6.69 2.15V9.44z"
          fill="currentColor"
        />
      </svg>
    ),
    url: "https://www.tiktok.com/@ithaaff",
  color: "#000000", // HITAM
    gradient: "from-[#000000] via-[#25F4EE] to-[#FE2C55]",
  },
]

const SocialLinks = () => {
  const linkedIn = socialLinks.find((l) => l.isPrimary)
  const others = socialLinks.filter((l) => !l.isPrimary)

  useEffect(() => {
    AOS.init({ offset: 10 })
  }, [])

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
      <h3
        className="text-xl font-semibold mb-6 flex items-center gap-2"
        data-aos="fade-down"
      >
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full" />
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* ===== LinkedIn (Primary) ===== */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
          className="group relative flex items-center justify-between p-4 rounded-lg
                     bg-white/5 border border-white/10 overflow-hidden
                     hover:border-white/20 transition-all duration-500"
        >
          {/* overlay */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                        bg-gradient-to-r ${linkedIn.gradient}`}
          />

          <div className="relative z-10 flex items-center gap-4">
            {/* icon */}
            <div className="relative">
              <div
                className="absolute inset-0 opacity-20 rounded-md group-hover:scale-110 transition-all"
                style={{ backgroundColor: linkedIn.color }}
              />
              <div className="relative p-2">
                <linkedIn.icon
                  className="w-6 h-6"
                  style={{ color: linkedIn.color }}
                />
              </div>
            </div>

            {/* text */}
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-600 group-hover:text-slate-600 transition-colors">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          <ExternalLink className="relative z-10 w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-all" />
        </a>

        {/* ===== Others ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {others.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
              className="group relative flex items-center gap-3 p-4 rounded-xl
                         bg-white/5 border border-white/10 overflow-hidden
                         hover:border-white/20 transition-all duration-500"
            >
              {/* overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                            bg-gradient-to-r ${link.gradient}`}
              />

              {/* icon */}
              <div className="relative z-10">
                <div
                  className="absolute inset-0 opacity-20 rounded-lg group-hover:scale-125 transition-all"
                  style={{ backgroundColor: link.color }}
                />
                <div className="relative p-2">
                  <link.icon
                    className="w-5 h-5"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              {/* text (FIX UTAMA) */}
              <div className="relative z-10 flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-600 group-hover:text-slate-600 transition-colors">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-400 truncate group-hover:text-slate-600 transition-colors">
                  {link.subText}
                </span>
              </div>

              <ExternalLink className="relative z-10 ml-auto w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialLinks
