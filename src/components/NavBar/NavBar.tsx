import React, { useState, useEffect, useRef, FC } from 'react';
import {
  MenuIcon,
  CloseIcon,
  HomeIcon,
  SobreIcon,
  ProjectIcon,
  ContactIcon
} from '../../assets/icons';
import styles from './NavBar.module.css';

const NavBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Função para alternar o menu
  const handleMenuToggle = (): void => {
    setMenuOpen(!menuOpen);
  };

  // Função para fechar o menu
  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  // Função para lidar com cliques em links
  const handleLinkClick = (): void => {
    closeMenu();
  };

  // Hook para fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Hook para fechar menu ao pressionar ESC e controlar classe do body
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    // Adiciona/remove classe no body para prevenir scroll
    if (menuOpen) {
      document.body.classList.add('menu-open');
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar} ref={navRef} role="navigation" aria-label="Navegação principal">
      {/* Logo */}
      <div className={styles.navbarLogo}>
        <a href="#home" className={styles.logoLink} onClick={handleLinkClick}>
          Portfólio de <span className={styles.navbarHighlight}>Jonathan da Silva Gomes</span>
        </a>
      </div>

      {/* Botão de menu (aparece apenas em dispositivos menores) */}
      <div className={styles.navbarToggle}>
        <button 
          onClick={handleMenuToggle} 
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          className={styles.menuButton}
        >
          <img
            src={menuOpen ? CloseIcon : MenuIcon}
            alt=""
            className={styles.icon}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Links de navegação */}
      <ul
        id="navbar-menu"
        className={`${styles.navbarLinks} ${menuOpen ? styles.menuOpen : ''}`}
        role="menubar"
        aria-hidden={!menuOpen}
      >
        <li role="none">
          <a 
            href="#home" 
            className={styles.navLink}
            onClick={handleLinkClick}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
          >
            <img src={HomeIcon} alt="" className={styles.icon} aria-hidden="true" />
            Home
          </a>
        </li>
        <li role="none">
          <a 
            href="#sobre" 
            className={styles.navLink}
            onClick={handleLinkClick}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
          >
            <img src={SobreIcon} alt="" className={styles.icon} aria-hidden="true" />
            Sobre
          </a>
        </li>
        <li role="none">
          <a 
            href="#projetos" 
            className={styles.navLink}
            onClick={handleLinkClick}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
          >
            <img src={ProjectIcon} alt="" className={styles.icon} aria-hidden="true" />
            Projetos
          </a>
        </li>
        <li role="none">
          <a 
            href="#contato" 
            className={styles.navLink}
            onClick={handleLinkClick}
            role="menuitem"
            tabIndex={menuOpen ? 0 : -1}
          >
            <img src={ContactIcon} alt="" className={styles.icon} aria-hidden="true" />
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
};

export { NavBar };
export default NavBar;
