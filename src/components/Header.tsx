import { useState } from "react";
import { navItems } from "../data/siteContent";
import { Logo } from "./Logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      </nav>
      <div className="header-actions">
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
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
