import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../components/card';
import FormButton from '../../../components/form-button';

import styles from './styles.css';

function CatalogCard(props) {
  const item = Object.assign({}, props.info, {
    selected: props.info.prices.ALTA[0],
  });

  const price = (props.info.finalAmount).toFixed(2);
  const integerPrice = (price).split('.')[0];
  const decimalPrice = (price).split('.')[1];

  return (
    <Card includeBorder>
      <div className={styles.container}>
        <header className={styles.header}>
          {props.info.name}
        </header>
        <div className={styles.price}>
          <span className={styles.currency}>{props.info.currencySymbol}</span>
          <span className={styles.integer}>{integerPrice}</span>
          <div className={styles.right}>
            <span className={styles.decimal}>.{decimalPrice}</span>
            <span className={styles.period}>{props.info.periodicityName}</span>
          </div>
        </div>
        <div className={styles.body}>
          {/* <ul>
            {props.info.description.map(data => <li key={data}>{data}</li>)}
          </ul> */}
          <FormButton
            callToAction="Agregar al carrito"
            includeIcon="linearicon-cart"
            onClick={() => props.addToCart(item)}
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
