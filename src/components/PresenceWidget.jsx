import { useEffect, useState } from "react";
import { Music2, Code2, Gamepad2, Headphones } from "lucide-react";

export default function PresenceWidget() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchPresence = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/presence");
        const data = await res.json();

        const normalized = (data.activities || [])
          .slice(0, 2)
          .map((a, idx) => {
            if (a.type === "spotify") {
              return {
                key: `spotify-${idx}`,
                title: a.title,
                subtitle: a.artist,
                image: a.image,
                type: "spotify",
                icon: "spotify",
                iconImage: a.iconImage || null
              };
            }

            if (a.type === "coding") {
              return {
                key: `coding-${idx}`,
                title: a.details || "Coding",
                subtitle: a.state || a.app,
                type: "coding",
                icon: "vscode",
                iconImage: a.iconImage || null
              };
            }

            return {
              key: `activity-${idx}`,
              title: a.name || "Playing a Game",
              subtitle: a.state || a.type,
              type: "gaming",
              icon: "gaming",
              iconImage: a.iconImage || null
            };
          });

        setActivities(normalized);
      } catch (err) {
        console.error("Failed to fetch presence:", err);
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!activities.length) return null;

  /* ================= ICON ================= */
  const getIcon = (iconType, className = "w-6 h-6") => {
    const icons = {
      spotify: <Music2 className={className} />,
      vscode: <Code2 className={className} />,
      gaming: <Gamepad2 className={className} />,
      default: <Headphones className={className} />
    };
    return icons[iconType] || icons.default;
  };

  /* ================= GLOBAL COLORS ================= */
  const getColors = (type) => {
    const base = {
      bg: "from-blue-200/30 via-purple-200/30 to-pink-200/30",
      border: "border-white/30",
      text: "text-purple-700",
      badge: "bg-white/40 border-white/30",
      glow: "shadow-pink-300/30"
    };

    const variants = {
      spotify: {
        ...base,
        text: "text-emerald-600",
        glow: "shadow-emerald-300/40"
      },
      coding: {
        ...base,
        text: "text-indigo-600",
        glow: "shadow-indigo-300/40"
      },
      gaming: {
        ...base,
        text: "text-fuchsia-600",
        glow: "shadow-fuchsia-300/40"
      }
    };

    return variants[type] || base;
  };

  const getActivityLabel = (type) => {
    const labels = {
      spotify: "NOW PLAYING",
      coding: "CODING",
      gaming: "PLAYING",
      default: "ACTIVE"
    };
    return labels[type] || labels.default;
  };

  return (
    <div className="w-full space-y-2">
      {activities.map((act) => {
        const colors = getColors(act.type);

        return (
          <div key={act.key} className="group relative">
            <div
              className={`
                relative rounded-xl border backdrop-blur-md
                bg-gradient-to-br ${colors.bg}
                ${colors.border} ${colors.glow}
                shadow-lg transition-all duration-300
                hover:scale-[1.02] hover:shadow-xl
              `}
            >
              <div className="p-3 flex items-center gap-3">
                {/* Icon / Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/30 ring-1 ring-white/40 group-hover:ring-white/60 transition">
                    {act.image ? (
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-full object-cover"
                      />
                    ) : act.iconImage ? (
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <img
                          src={act.iconImage}
                          alt={act.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${colors.text}`}>
                        {getIcon(act.icon)}
                      </div>
                    )}
                  </div>

                  {/* Spotify equalizer */}
                  {act.type === "spotify" && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded p-0.5">
                      <div className="flex items-end gap-0.5 h-2">
                        <div className="w-0.5 bg-white rounded-full animate-music-1" />
                        <div className="w-0.5 bg-white rounded-full animate-music-2" />
                        <div className="w-0.5 bg-white rounded-full animate-music-3" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`
                      inline-flex items-center gap-1 px-2 py-0.5 mb-1
                      rounded border backdrop-blur-sm
                      ${colors.badge}
                    `}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${colors.text.replace(
                        "text-",
                        "bg-"
                      )} animate-pulse`}
                    />
                    <span className={`text-[9px] font-bold tracking-wider uppercase ${colors.text}`}>
                      {getActivityLabel(act.type)}
                    </span>
                  </div>

                  <h3 className="text-gray-900 text-sm font-semibold truncate">
                    {act.title}
                  </h3>
                  <p className="text-gray-600 text-xs truncate">
                    {act.subtitle}
                  </p>
                </div>

                {/* Spotify logo */}
                {act.type === "spotify" && (
                  <img
                    src="Spotify.png"
                    alt="Spotify"
                    className="h-6 opacity-70 group-hover:opacity-100 transition"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Animations */}
      <style>{`
        @keyframes music-1 { 0%,100%{height:30%} 50%{height:90%} }
        @keyframes music-2 { 0%,100%{height:60%} 50%{height:100%} }
        @keyframes music-3 { 0%,100%{height:40%} 50%{height:85%} }

        .animate-music-1 { animation: music-1 .6s ease-in-out infinite }
        .animate-music-2 { animation: music-2 .6s ease-in-out .15s infinite }
        .animate-music-3 { animation: music-3 .6s ease-in-out .3s infinite }
      `}</style>
    </div>
  );
}