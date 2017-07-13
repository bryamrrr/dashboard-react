import React from 'react';
import PropType from 'prop-types';

import { connect } from 'react-redux';

import Card from '../../../components/card';
import Hexagon from '../../../components/hexagon';

import styles from './styles.css';

function Products(props) {
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
          <h3>{props.strings.domains.title}</h3>
          <p>
            {props.strings.domains.description}
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
          <h3>{props.strings.hosting.title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: props.strings.hosting.description,
            }}
          />
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
          <h3>{props.strings.mails.title}</h3>
          <p>
            {props.strings.mails.description}
          </p>
        </Card>
      </article>
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
