import React, { FC } from 'react';
import WhatsAppIcon from '../../assets/icons/whatsapp.png';
import FacebookIcon from '../../assets/icons/facebook.png';
import InstagramIcon from '../../assets/icons/instagram.png';
import LinkedInIcon from '../../assets/icons/linkedin.png';
import EmailIcon from '../../assets/icons/email.png';
import GithubIcon from '../../assets/icons/github.png';
import styles from './Contato.module.css'; // Importação do CSS modular

const Contato: FC = () => {
  return (
    <section id="contato" className={styles.contato}>
      <p className={styles.text}>
        Se você gostaria de entrar em contato comigo, pode me encontrar nas seguintes plataformas:
      </p>
      <div className={styles.socialLinks}>
        <div className={styles.linkItem}>
          <img src={EmailIcon} alt="Email" className={styles.icon} />
          <a
            href="mailto:jonathan.dsg104@hotmail.com"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </div>
        <div className={styles.linkItem}>
          <img src={WhatsAppIcon} alt="WhatsApp" className={styles.icon} />
          <a
            href="https://wa.me/5548996573094"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <div className={styles.linkItem}>
          <img src={FacebookIcon} alt="Facebook" className={styles.icon} />
          <a
            href="https://www.facebook.com/share/1EfUR15yXX/"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
        <div className={styles.linkItem}>
          <img src={InstagramIcon} alt="Instagram" className={styles.icon} />
          <a
            href="https://www.instagram.com/jonathangomes104?igsh=MXYyZmttY2M2NG9ocg=="
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div className={styles.linkItem}>
          <img src={GithubIcon} alt="GitHub" className={styles.icon} />
          <a
            href="https://github.com/jonathandsg104"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className={styles.linkItem}>
          <img src={LinkedInIcon} alt="LinkedIn" className={styles.icon} />
          <a
            href="https://www.linkedin.com/in/jonathangomes104/"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contato;