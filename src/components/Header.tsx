import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { Logo } from "./Logo";
import { LanguageToggle } from "../i18n/LanguageToggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "#top" },
    { label: t.nav.solutions, href: "#solucoes" },
    { label: t.nav.process, href: "#processo" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="Mionga homepage">
        <Logo />
      </a>
      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <LanguageToggle />
      </nav>
      <div className="header-actions">
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? t.menuToggle.close : t.menuToggle.open}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
