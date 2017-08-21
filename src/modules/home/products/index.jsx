import React from 'react';
import PropType from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../../../components/card';
import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function Products(props) {
  return (
    <section className={styles.container}>
      <Link to="/catalogo/dominios" >
        <Card
          color="#f7a80d"
          includeBorder
        >
          <Hexagon color="orange">
            <i className="linearicon-earth" />
          </Hexagon>
          <h3>{props.strings.home.domains.title}</h3>
          <p>
            {props.strings.home.domains.description}
          </p>
        </Card>
      </Link>
      <Link to="/catalogo/hosting">
        <Card
          color="#f44336"
          includeBorder
        >
          <Hexagon color="red">
            <i className="linearicon-drawer2" />
          </Hexagon>
          <h3>{props.strings.home.hosting.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: props.strings.home.hosting.description,
            }}
          />
        </Card>
      </Link>
      <Link to="/catalogo/correos">
        <Card
          color="#1e88e5"
          includeBorder
        >
          <Hexagon color="blue">
            <i className="linearicon-envelope" />
          </Hexagon>
          <h3>{props.strings.home.mails.title}</h3>
          <p>
            {props.strings.home.mails.description}
          </p>
        </Card>
      </Link>
    </section>
  );
}

Products.propTypes = {
  strings: PropType.objectOf(PropType.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(Products);
