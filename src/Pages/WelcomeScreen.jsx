import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, PenToolIcon, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ================= Typewriter ================= */
const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 220);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
};

/* ================= Background Effect ================= */
const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[140px]" />
    <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[140px]" />
    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[140px]" />
  </div>
);

/* ================= Icon Button ================= */
const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur opacity-30 group-hover:opacity-60 transition" />
    <div className="relative p-3 bg-white/60 backdrop-blur-md rounded-full border border-slate-200">
      <Icon className="w-6 h-6 text-slate-700" />
    </div>
  </div>
);

/* ================= Welcome Screen ================= */
const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 800);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#F3F8FF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.8 }}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              {/* Icons */}
              <div className="flex justify-center gap-6 mb-10">
                {[PenToolIcon, User, Github].map((Icon, i) => (
                  <div key={i} data-aos="fade-down" data-aos-delay={i * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </div>

              {/* Text */}
              <h1 className="text-4xl md:text-6xl font-bold mb-10">
                <div className="text-slate-700 mb-3">
                  <span data-aos="fade-right">Welcome</span>{" "}
                  <span data-aos="fade-right" data-aos-delay="200">To</span>{" "}
                  <span data-aos="fade-right" data-aos-delay="400">My</span>
                </div>
                <div>
                  <span
                    data-aos="fade-up"
                    className="bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] bg-clip-text text-transparent"
                  >
                    Portofolio Website
                  </span>
                </div>
              </h1>

              {/* Link */}
              <div data-aos="fade-up" data-aos-delay="600">
                <a
                  href="https://github.com/Faathsaq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-md border border-slate-200 hover:scale-105 transition"
                >
                  <Globe className="w-5 h-5 text-blue-500" />
                  <span className="bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0] bg-clip-text text-transparent text-lg font-medium">
                    <TypewriterEffect text="www.atha.id" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;