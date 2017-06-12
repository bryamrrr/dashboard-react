import React from 'react';

import Card from '../../../components/card';

import styles from './styles.css';

function Products() {
  return (
    <section className={styles.container}>
      <article>
        <Card
          color="#f7a80d"
          includeBorder
        >
          <div className={`${styles.hexagon} ${styles.orange}`}>
            <i className="linearicon-earth" />
          </div>
          <h3>Dominios</h3>
          <p>
            Comienza tu negocio de internet con un dominio
          </p>
        </Card>
      </article>
      <article>
        <Card
          color="#f44336"
          includeBorder
        >
          <div className={`${styles.hexagon} ${styles.red}`}>
            <i className="linearicon-drawer2" />
          </div>
          <h3>Hosting</h3>
          <p>
            Seguridad, rapidez y <br />flexibilidad
          </p>
        </Card>
      </article>
      <article>
        <Card
          color="#1e88e5"
          includeBorder
        >
          <div className={`${styles.hexagon} ${styles.blue}`}>
            <i className="linearicon-envelope" />
          </div>
          <h3>Correos</h3>
          <p>
            Personaliza la comunicación de tu empresa
          </p>
        </Card>
      </article>
    </section>
  );
}

export default Products;
