import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setRoute } from '../../../../reducers/routes/actions';

import PaymentContactForm from '../payment-contact-form';
import PaymentCartDetail from '../payment-cart-detail';

import CheckBox from '../../../../components/checkbox';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

class PaymentDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.sendPayment = this.sendPayment.bind(this);
  }

  componentDidMount() {
    this.props.setRoute({ title: 'Compra' });
  }

  sendPayment() {
    const url = '/orden';
    this.context.router.history.push(url);
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h2>Datos de facturación</h2>
          <PaymentContactForm />
          <section>
            <h2>Elige tu método de pago</h2>
            <article className={styles.item}>
              <span className={styles.itemTitle}>Pago en línea</span>
              <div className={styles.itemContainer}>
                <div>
                  <input id="paymentOnline" type="radio" name="gender" value="paymentType" className={styles.radioButton} />
                  <label htmlFor="paymentOnline" className={styles.paymentCard}>
                    <i className={`linearicon-checkmark ${styles.icon}`} />
                    <img
                      className={styles.logo}
                      src={`${this.props.context}/images/creditcard.png`}
                      alt=""
                    />
                  </label>
                </div>
                <p>{'Paga de forma segura con tu tarjeta de crédito o débito. Aceptamos Visa, MasteCard, American Express y Diners Club.'}</p>
              </div>
            </article>
            <article className={styles.item}>
              <span className={styles.itemTitle}>Pago en oficina Yachay CompuPalace</span>
              <div className={styles.itemContainer}>
                <div>
                  <input id="paymentOffice" type="radio" name="gender" value="paymentType" className={styles.radioButton} />
                  <label htmlFor="paymentOffice" className={styles.paymentCard}>
                    <i className={`linearicon-checkmark ${styles.icon}`} />
                    <img
                      className={styles.logo}
                      src={`${this.props.context}/images/logo.png`}
                      alt=""
                    />
                  </label>
                </div>
                <p>{'Elige pago en la Oficina Yachay y paga en efectivo o tarjeta en nuestra oficina ubicada en el centro comercial CompuPalace Av. Petit Thouars Nro. 5356, Tienda Nro. 3078, tercer piso - Miraflores, Lima - Perú'}</p>
              </div>
            </article>
          </section>
          <section className={styles.agreement}>
            <h2>Contrato</h2>
            <CheckBox>
              <p>
                He revisado el <a
                  target="_blank"
                  rel="noopener noreferrer" href="https://dashboard.yachay.pe/assets/pdfs/Contrato_de_prestacion_de_servicios_2015.pdf"
                  className={styles.link}
                >
                  Contrato de prestación de servicios
                </a>
              </p>
            </CheckBox>
          </section>
          <FormButton
            callToAction="Finalizar compra"
            onClick={this.sendPayment}
          />
        </div>
        <div className={styles.cartContainer}>
          <h2>Carrito de compras</h2>
          <PaymentCartDetail />
        </div>
      </div>
    );
  }
}

PaymentDetails.propTypes = {
  setRoute: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
};

PaymentDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { context: state.get('context') };
}

export default connect(mapStateToProps, { setRoute })(PaymentDetails);
