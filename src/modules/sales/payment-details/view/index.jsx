import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setRoute } from '../../../../reducers/routes/actions';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import PaymentContactForm from '../payment-contact-form';
import PaymentCartDetail from '../payment-cart-detail';

import CheckBox from '../../../../components/checkbox';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

class PaymentDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      puadeUrl: '',
    };

    this.sendPayment = this.sendPayment.bind(this);
  }

  async componentWillMount() {
    const url = `${constants.urls.API_QUILCA}/documents/7a00049b-2187-4072-af91-b3a2d9f75563/contents/current`;
    const { data } = await httpRequest('GET', url);
    const puadeUrl = `${constants.urls.API_QUILCA}/documents/versions/${data.id}/${data.filename}`;
    console.log(puadeUrl);
    this.setState({ puadeUrl });
  }

  componentDidMount() {
    this.props.setRoute({ title: 'sale' });
  }

  sendPayment() {
    const url = '/orden';
    this.context.router.history.push(url);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.detail}>
          <h2>{this.props.strings.sales.billingData}</h2>
          <PaymentContactForm />
          <section>
            <h2>{this.props.strings.sales.choosePayment}</h2>
            <article className={styles.item}>
              <span className={styles.itemTitle}>{this.props.strings.sales.onlinePay}</span>
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
                <p>{this.props.strings.sales.onlinePayDescription}</p>
              </div>
            </article>
            <article className={styles.item}>
              <span className={styles.itemTitle}>{this.props.strings.sales.officePay}</span>
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
                <p>{this.props.strings.sales.officePayDescription}</p>
              </div>
            </article>
          </section>
          <section className={styles.agreement}>
            <h2>{this.props.strings.sales.contract}</h2>
            <CheckBox>
              <p>
                {this.props.strings.sales.check} <a
                  target="_blank"
                  rel="noopener noreferrer" href="https://dashboard.yachay.pe/assets/pdfs/Contrato_de_prestacion_de_servicios_2015.pdf"
                  className={styles.link}
                >
                  {this.props.strings.sales.contractName}
                </a>, <a
                  target="_blank"
                  rel="noopener noreferrer" href={this.state.puadeUrl}
                  className={styles.link}
                >
                  PUADE
                </a> y <a
                  target="_blank"
                  rel="noopener noreferrer" href="https://dashboard.yachay.pe/assets/pdfs/Contrato_de_prestacion_de_servicios_2015.pdf"
                  className={styles.link}
                >
                  {this.props.strings.sales.dataPrivacy}
                </a>
              </p>
            </CheckBox>
          </section>
          <FormButton
            callToAction={this.props.strings.sales.finish}
            onClick={this.sendPayment}
          />
        </div>
        <div className={styles.cartContainer}>
          <h2>{this.props.strings.cart.title}</h2>
          <PaymentCartDetail />
        </div>
      </div>
    );
  }
}

PaymentDetails.propTypes = {
  setRoute: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

PaymentDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.get('context'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps, { setRoute })(PaymentDetails);
