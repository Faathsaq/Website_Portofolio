import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (!section) return null;
          return {
            id: item.href.replace("#", ""),
            offset: section.offsetTop - 200,
            height: section.offsetHeight,
          };
        })
        .filter(Boolean);

      const current = window.scrollY;
      const active = sections.find(
        (s) => current >= s.offset && current < s.offset + s.height
      );

      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* ===== NAVBAR PILL ===== */}
      <div className="fixed top-4 w-full z-40 flex justify-center px-4">
        <nav
          className={`rounded-full transition-all duration-500
          ${
            scrolled
              ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgba(99,102,241,0.18)]"
              : "bg-white/5 backdrop-blur-md"
          }`}
        >
          <div className="px-6 sm:px-8">
            <div className="flex items-center justify-between h-14 gap-6">
              {/* Logo */}
              <a
                href="#Home"
                onClick={(e) => scrollToSection(e, "#Home")}
                className="shrink-0"
              >
                <img
                  src="/sas.png"
                  alt="Logo"
                  className="h-8 sm:h-9 w-auto"
                />
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="group relative px-2 py-1 text-sm font-medium"
                  >
                    <span
                      className={`transition-all duration-300 ${
                        activeSection === item.href.substring(1)
                          ? "text-[#5A5FB0] font-semibold"
                          : "text-[#5A5FB0]/70 group-hover:bg-gradient-to-r group-hover:from-[#756AB6] group-hover:via-[#AC87C5] group-hover:to-[#C6CFFF] group-hover:bg-clip-text group-hover:text-transparent"
                      }`}
                    >
                      {item.label}
                    </span>

                    <span
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6
                      bg-gradient-to-r from-[#756AB6] to-[#C6CFFF]
                      rounded-full transition-transform duration-300
                      ${
                        activeSection === item.href.substring(1)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                ))}
              </div>

              {/* Mobile Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 text-[#5A5FB0]"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE BOTTOM SHEET ===== */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        />

        {/* Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0
          bg-white/20 backdrop-blur-2xl
          rounded-t-[32px]
          border-t border-white/30
          shadow-[0_-10px_40px_rgba(99,102,241,0.25)]
          transition-transform duration-500
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-4">
            <div className="w-10 h-1.5 rounded-full bg-[#5A5FB0]/40 mx-auto" />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-4 text-[#5A5FB0]"
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu */}
          <div className="px-8 pt-10 pb-12 space-y-6">
            {navItems.map((item) => (
             <a
  key={item.label}
  href={item.href}
  onClick={(e) => scrollToSection(e, item.href)}
  className={`block text-xl font-medium transition-all duration-300 ${
    activeSection === item.href.substring(1)
      ? "text-[#5A5FB0] font-semibold"
      : "text-[#5A5FB0]/70 hover:bg-gradient-to-r hover:from-[#756AB6] hover:via-[#AC87C5] hover:to-[#C6CFFF] hover:bg-clip-text hover:text-transparent"
  }`}
>
  {item.label}
</a>

            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
