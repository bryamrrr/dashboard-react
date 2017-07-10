import React from 'react';
import PropTypes from 'prop-types';

import { Map as map } from 'immutable';

import Card from '../../../components/card';
import FormButton from '../../../components/form-button';

import styles from './styles.css';

function CatalogCard(props) {
  return (
    <Card includeBorder>
      <div className={styles.container}>
        <header className={styles.header}>
          {props.info.name}
        </header>
        <div className={styles.price}>
          <span className={styles.currency}>{props.info.currencySymbol}</span>
          <span className={styles.integer}>{props.info.integerPrice}</span>
          <div className={styles.right}>
            <span className={styles.decimal}>.00</span>
            <span className={styles.period}>Anual</span>
          </div>
        </div>
        <div className={styles.body}>
          <ul>
            {props.info.description.map(data => <li key={data}>{data}</li>)}
          </ul>
          <FormButton
            callToAction="Agregar al carrito"
            includeIcon="linearicon-cart"
            onClick={() => props.addToCart(map(props.info)
    .set('selected', props.info.prices.buy[0]))}
          />
        </div>
      </div>
    </Card>
  );
}

CatalogCard.propTypes = {
  addToCart: PropTypes.func.isRequired,
  info: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
};

export default CatalogCard;
