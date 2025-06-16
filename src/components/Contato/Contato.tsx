import React, { FC } from 'react';
import { 
  ContactIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  EmailIcon,
  GithubIcon
} from '../../assets/icons';
import styles from './Contato.module.css';

interface ContactLink {
  icon: string;
  alt: string;
  href: string;
  label: string;
  ariaLabel: string;
}

const Contato: FC = () => {
  const contactLinks: ContactLink[] = [
    {
      icon: EmailIcon,
      alt: 'Email',
      href: 'mailto:jonathan.dsg104@gmail.com',
      label: 'Email',
      ariaLabel: 'Enviar email para Jonathan'
    },
    {
      icon: WhatsAppIcon,
      alt: 'WhatsApp',
      href: 'https://wa.me/5548996573094',
      label: 'WhatsApp',
      ariaLabel: 'Conversar no WhatsApp'
    },
    {
      icon: LinkedInIcon,
      alt: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jonathangomes104/',
      label: 'LinkedIn',
      ariaLabel: 'Visitar perfil no LinkedIn'
    },
    {
      icon: GithubIcon,
      alt: 'GitHub',
      href: 'https://github.com/jonathandsg104',
      label: 'GitHub',
      ariaLabel: 'Visitar perfil no GitHub'
    },
    {
      icon: FacebookIcon,
      alt: 'Facebook',
      href: 'https://www.facebook.com/share/1EfUR15yXX/',
      label: 'Facebook',
      ariaLabel: 'Visitar perfil no Facebook'
    },
    {
      icon: InstagramIcon,
      alt: 'Instagram',
      href: 'https://www.instagram.com/jonathangomes104?igsh=MXYyZmttY2M2NG9ocg==',
      label: 'Instagram',
      ariaLabel: 'Visitar perfil no Instagram'
    }
  ];

  return (
    <section id="contato" className={styles.contato}>
      <h1 className={styles.title}>
        <img src={ContactIcon} alt="Ícone Contato" className={styles.titleIcon} />
        Entre em Contato
      </h1>
      
      <p className={styles.text}>
        Vamos conversar! Entre em contato comigo através das seguintes plataformas:
      </p>
      
      <div className={styles.socialLinks} role="list" aria-label="Links de contato">
        {contactLinks.map((contact, index) => (
          <div key={index} className={styles.linkItem} role="listitem">
            <img 
              src={contact.icon} 
              alt="" 
              className={styles.icon}
              aria-hidden="true"
            />
            <a
              href={contact.href}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contact.ariaLabel}
            >
              {contact.label}
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Desenvolvido por <strong>Jonathan Gomes</strong></p>
        <p>Endereço: Avenida Egidio Tomasi, 1645 - sala 03, Bela Vista, Jacinto Machado, SC, Brasil</p>
        <p>Telefone: +55 48 99657-3094</p>
      </footer>
    </section>
  );
};

export { Contato };
export default Contato;
