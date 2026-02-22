import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({
  Img,
  Title,
  Description,
  Link: LiveDemo,
  video_url,
  id,
}) => {

  const handleLiveDemo = (e) => {
    if (!LiveDemo) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div
        className="
        relative overflow-hidden rounded-2xl
        bg-white/55 backdrop-blur-xl
        border border-violet-200/40
        shadow-[0_15px_40px_-15px_rgba(99,102,241,0.35)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_55px_-20px_rgba(139,92,246,0.5)]
      "
      >
        {/* Gradient Glow (tidak ganggu klik) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative p-5 z-10">
          
          {/* Media */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3]">

            {video_url ? (
              <video
                className="
                  relative z-10
                  w-full h-full object-cover rounded-xl
                  transition-transform duration-500
                  group-hover:scale-[1.04]
                "
                controls
                preload="metadata"
              >
                <source src={video_url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={Img || "/thumbnail.png"}
                alt={Title}
                className="
                  relative z-10
                  w-full h-full object-cover rounded-xl
                  transition-all duration-500
                  group-hover:scale-[1.06]
                  group-hover:brightness-110
                "
                loading="lazy"
              />
            )}

            {/* Hover ring (tidak ganggu klik) */}
            <div className="absolute inset-0 ring-1 ring-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Info */}
          <div className="mt-4 space-y-3">
            <h3
              className="
              text-lg font-semibold
              bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0]
              bg-clip-text text-transparent
            "
            >
              {Title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              
              {/* Live Demo */}
              {LiveDemo ? (
                <a
                  href={LiveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="
                    inline-flex items-center gap-2
                    text-[#756AB6]/90
                    transition-all duration-300
                    hover:gap-3
                  "
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </a>
              ) : (
                <span className="text-slate-400 text-sm">
                  Demo Not Available
                </span>
              )}

              {/* Details Button */}
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="
                    group inline-flex items-center gap-2
                    px-4 py-2 rounded-lg
                    bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0]
                    text-white text-sm font-medium
                    transition-all duration-300
                    hover:scale-105 hover:shadow-lg
                    active:scale-95
                  "
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ) : (
                <span className="text-slate-400 text-sm">
                  Details Not Available
                </span>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardProject;