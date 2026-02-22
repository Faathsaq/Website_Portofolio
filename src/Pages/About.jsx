import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import profile from "../assets/profile.jpg";

// palette: #756AB6 -> #AC87C5 -> #E0AED0

// ===================== HEADER =====================
const Header = memo(() => (
  <div className="text-center mb-10 px-[5%]">
    <h2
  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text
             bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0]
             bg-[length:200%_100%] bg-left"
  data-aos="zoom-in"
>
  About Me
</h2>


    <p
      className="mt-3 flex items-center justify-center gap-2 text-slate-400 text-sm sm:text-base"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <Sparkles className="w-4 h-4" />
      Transforming Ideas Into Digital Experiences
      <Sparkles className="w-4 h-4" />
    </p>
  </div>
));

// ===================== PROFILE IMAGE =====================
const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end mb-6 lg:mb-0">
    <div data-aos="fade-left" className="group relative w-72 h-72 sm:w-80 sm:h-80">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
 blur-2xl opacity-40 group-hover:opacity-70 transition" />
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 group-hover:rotate-1 transition duration-500">
        <img src={profile} alt="Profile" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
));

// ===================== STAT CARD =====================
const StatCard = memo(({ icon: Icon, value, label, description, countDuration = 4.5, fadeDuration = 1000 }) => (
  <div data-aos="fade-up" data-aos-duration={fadeDuration} className="relative group">
    <div className="relative z-10 bg-white/80 backdrop-blur rounded-2xl p-6 border border-indigo-200 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-[#756AB6]/10 to-[#E0AED0]/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-[#756AB6]" />
        </div>
        <span className="text-4xl font-bold text-[#1E1B4B]">
          <CountUp start={0} end={value} duration={countDuration} separator="," enableScrollSpy={true} scrollSpyOnce={false} redraw={true} />
        </span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-slate-500 mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#756AB6] transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, yearExperience } = useMemo(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const certificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    const start = new Date("2023-01-01");
    const now = new Date();
    const exp =
      now.getFullYear() -
      start.getFullYear() -
      (now < new Date(now.getFullYear(), start.getMonth(), start.getDate()) ? 1 : 0);

    return {
      totalProjects: projects.length,
      totalCertificates: certificates.length,
      yearExperience: exp,
    };
  }, []);

  const statsData = [
    { icon: Award, value: totalCertificates, label: "Certificates", description: "Completed courses", animation: "fade-up" },
    { icon: Globe, value: totalProjects, label: "Projects", description: "Projects I’ve worked on", animation: "fade-up" },
    { icon: Code, value: yearExperience, label: "Experience", description: "Hands-on experience", animation: "fade-up" },
  ];

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  return (
    <section id="About" className="bg-[#F3F8FF] px-[5%] lg:px-[10%] py-20 overflow-hidden">
      <Header />

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <ProfileImage />

        <div className="flex-1" data-aos="fade-right">
          <div className="flex-1" data-aos="fade-right">
            <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0]
 text-center lg:text-left">
              Hello, I'm
            </h3>

            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E1B4B] text-center lg:text-left whitespace-nowrap">
              Faiz Athaillah Tsaqif
            </h1>
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            I am a vocational high school student majoring in Software Engineering at SMKN 7 Semarang. I have a strong interest in UI/UX Design and enjoy designing intuitive, modern, and user-centered digital interfaces. Through an internship opportunity, I aim to gain hands-on experience, improve my design skills, and learn directly from real-world projects.
          </p>

          {/* Quote */}
          <div className="relative bg-gradient-to-br from-[#756AB6]/5 via-transparent to-[#E0AED0]/5 border border-[#756AB6]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden" data-aos="fade-up" data-aos-duration="1700">
            <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#756AB6]/20 to-[#E0AED0]/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#E0AED0]/20 to-[#756AB6]/20 rounded-full blur-lg" />
            <blockquote className="text-slate-600 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
              "Leveraging AI as a professional tool, not a replacement."
            </blockquote>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
            <a href="https://drive.google.com/uc?export=download&id=1-SGnTGyPwmd-GlIVvUxGFkWGL7I7FqTP"
  download="Faiz_Athaillah_Tsaqif_CV.pdf" className="w-full lg:w-auto">
              <button data-aos="fade-up" data-aos-duration="800" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#756AB6] via-[#AC87C5] to-[#E0AED0]
 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
              </button>
            </a>

            <a href="#Portofolio" className="w-full lg:w-auto">
              <button data-aos="fade-up" data-aos-duration="1000" className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#AC87C5]/40 text-[#AC87C5] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#AC87C5]/10">
                <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <a href="#Portofolio">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </a>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)} }
        @keyframes spin-slower { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default memo(AboutPage);
