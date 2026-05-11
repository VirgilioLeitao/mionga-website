import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const heroHeight = document.querySelector("#top")?.clientHeight ?? window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.45);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <a
      className={isVisible ? "back-to-top is-visible" : "back-to-top"}
      href="#top"
      aria-label="Voltar ao início da página"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 19V5m0 0-6 6m6-6 6 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
      </svg>
    </a>
  );
}
