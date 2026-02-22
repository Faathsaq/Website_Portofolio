import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react"
import Swal from "sweetalert2"

// ⬇️ IMPORT BACKGROUND
import AnimatedBackground from "../components/Background.jsx"

/* ===================== TECH ICON MAP ===================== */
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
}

/* ===================== TECH BADGE ===================== */
const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default

  return (
    <div className="group relative px-3 py-2 rounded-xl bg-white/70 backdrop-blur border border-indigo-200 hover:border-indigo-300 transition">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-400" />
        <span className="text-sm text-indigo-600 font-medium">{tech}</span>
      </div>
    </div>
  )
}

/* ===================== FEATURE ITEM ===================== */
const FeatureItem = ({ feature }) => (
  <li className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur border border-slate-200">
    <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
    <span className="text-slate-700">{feature}</span>
  </li>
)

/* ===================== STATS ===================== */
const ProjectStats = ({ project }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-indigo-200">
      <div className="flex items-center gap-3">
        <Code2 className="text-indigo-500" />
        <div>
          <p className="text-xl font-bold text-indigo-700">
            {project.TechStack.length}
          </p>
          <p className="text-xs text-slate-500">Technologies</p>
        </div>
      </div>
    </div>

    <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-purple-200">
      <div className="flex items-center gap-3">
        <Layers className="text-indigo-700" />
        <div>
          <p className="text-xl font-bold text-indigo-700">
            {project.Features.length}
          </p>
          <p className="text-xs text-slate-500">Features</p>
        </div>
      </div>
    </div>
  </div>
)

/* ===================== MAIN ===================== */
const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = JSON.parse(localStorage.getItem("projects")) || []
    const found = stored.find(p => String(p.id) === id)

    if (found) {
      setProject({
        ...found,
        Features: found.Features || [],
        TechStack: found.TechStack || [],
      })
    }
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F8FF]">
        <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F3F8FF] relative overflow-hidden">
      
      {/* ✅ BACKGROUND */}
      <AnimatedBackground />

      {/* ✅ CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16">
        
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 px-4 py-2 rounded-xl bg-white/70 backdrop-blur border border-slate-200 hover:bg-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-14">
          
          {/* LEFT */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] bg-clip-text text-transparent">
              {project.Title}
            </h1>

            <p className="text-slate-600 leading-relaxed">
              {project.Description}
            </p>

            <ProjectStats project={project} />

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.TechStack.map((tech, i) => (
                  <TechBadge key={i} tech={tech} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
<div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
  <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px]">
    {project.video_url ? (
      <video
        src={project.video_url}
        controls
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    ) : (
      <img
        src={project.Img}
        alt={project.Title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
    )}
  </div>
</div>

            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-slate-200">
              <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <Star className="text-yellow-400" /> Key Features
              </h3>

              <ul className="space-y-2">
                {project.Features.map((f, i) => (
                  <FeatureItem key={i} feature={f} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
