import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../components/card';
import FormButton from '../../../components/form-button';

import styles from './styles.css';

function CatalogCard(props) {
  return (
    <Card includeBorder>
      <div className={styles.container}>
        <header className={styles.header}>
          HOSTI 100
        </header>
        <div className={styles.price}>
          <span className={styles.currency}>S/</span>
          <span className={styles.integer}>178</span>
          <div className={styles.right}>
            <span className={styles.decimal}>.00</span>
            <span className={styles.period}>Anual</span>
          </div>
        </div>
        <div className={styles.body}>
          <ul>
            <li>100 GB hosting</li>
            <li>50 cuentas</li>
            <li>1 sitio web</li>
            <li>100 GB de transferencia mensual</li>
            <li>* Pago anual</li>
          </ul>
          <FormButton
            callToAction="Agregar al carrito"
            includeIcon="linearicon-cart"
            onClick={() => props.addToCart({ productId: '1', name: 'HOSTI 100' })}
          />
        </div>
      </div>
    </Card>
  );
}

CatalogCard.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default CatalogCard;
