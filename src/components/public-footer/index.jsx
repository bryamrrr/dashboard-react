import React from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.css';

function PublicFooter() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <article>
            <div className={styles.miniContainer}>
              <h3>Yachay</h3>
              <ul>
                <li>
                  <a href="https://yachay.pe/contacto">¿Quiénes somos?</a>
                </li>
                <li>
                  <a href="https://yachay.pe/contacto">Contáctenos</a>
                </li>
              </ul>
            </div>
          </article>
          <article>
            <div className={styles.miniContainer}>
              <h3>Servicios</h3>
              <ul>
                <li>
                  <a href="https://yachay.pe/dominios">Dominio</a>
                </li>
                <li>
                  <a href="https://yachay.pe/#correo">Correo</a>
                </li>
                <li>
                  <a href="https://yachay.pe/hosting">Hosting</a>
                </li>
              </ul>
            </div>
          </article>
          <article>
            <div className={styles.miniContainer}>
              <h3>Usuarios</h3>
              <ul>
                <li>
                  <Link to="/login">Ingresar</Link>
                </li>
                <li>
                  <Link to="/registro">Regístrate</Link>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </footer>
      <div className={styles.sales}>
        <div className={styles.salesContainer}>
          <p>Compras 100% seguras con:</p>
        </div>
      </div>
    </div>
  );
}

export default PublicFooter;
