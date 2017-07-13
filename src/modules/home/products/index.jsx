import React from 'react';

import Card from '../../../components/card';
import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function Products() {
  return (
    <section className={styles.container}>
      <article>
        <Card
          color="#f7a80d"
          includeBorder
        >
          <Hexagon color="orange">
            <i className="linearicon-earth" />
          </Hexagon>
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
          <Hexagon color="red">
            <i className="linearicon-drawer2" />
          </Hexagon>
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
          <Hexagon color="blue">
            <i className="linearicon-envelope" />
          </Hexagon>
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
