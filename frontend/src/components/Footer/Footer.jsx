import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`footer-custom d-flex flex-wrap justify-content-between align-items-center py-3 border-top ${style.footer}`}>
      <div className="col-md-4 d-flex align-items-center">
        <span className={style.footerText}>© 2025 Level Up Gamer</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a href="#" aria-label="Instagram">
            <i className={`bi bi-instagram fs-4 ${style.socialIcons}`}></i>
          </a>
        </li>
        <li className="ms-3">
          <a href="#" aria-label="Facebook">
            <i className={`bi bi-facebook fs-4 ${style.socialIcons}`}></i>
          </a>
        </li>
        <li className="ms-3">
          <a href="#" aria-label="X">
            <i className={`bi bi-twitter-x fs-4 ${style.socialIcons}`}></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
