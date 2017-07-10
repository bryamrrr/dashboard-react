import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import styles from './styles.css';

function Order(props) {
  return (
    <div className={styles.container}>
      <div className={styles.paymentTitle}>
        <span>Método de pago:</span>
        <img
          className={styles.logo}
          src={`${props.context}/images/logo.png`}
          alt=""
        />
      </div>
      <div className={styles.detailContainer}>
        <h2>Orden de compra</h2>
        <div>
          <p>Código de orden de compra: <strong>0101043079</strong> </p>
        </div>
        <h2>Datos de facturación</h2>
        <div className={styles.lineWrapper}>
          <p>Razon social: <strong>igracion SAC</strong></p>
          <p>DNI/RUC: <strong>11111111</strong></p>
          <p>Dirección: <strong>migracion SAC</strong></p>
        </div>
        <h2>Detalle de compra</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Paquete</th>
                <th>Descripción</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hosti 200</td>
                <td>
                  <ul className={styles.circleList}>
                    <li>200 GB hosting</li>
                    <li>100 cuentas</li>
                    <li>50 sitios web</li>
                    <li>ilimitados GB transferencia mensual</li>
                    <li>(El pago es anual)</li>
                  </ul>
                </td>
                <td>S/ 161.02</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className={styles.subTotal}>
                <td colSpan="2">IGV:</td>
                <td>
                  <span className={styles.symbol}>S/ </span>
                  <span className={styles.money}>28.98</span>
                </td>
              </tr>
              <tr className={styles.total}>
                <td colSpan="2">TOTAL:</td>
                <td>
                  <span className={styles.symbol}>S/ </span>
                  <span className={styles.money}>190.00</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

Order.propTypes = {
  context: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return { context: state.get('context') };
}

export default connect(mapStateToProps)(Order);
