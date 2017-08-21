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
      dataPrivacyUrl: '',
      contractNameUrl: '',
    };

    this.sendPayment = this.sendPayment.bind(this);
  }

  componentWillMount() {
    const urlPuade = `${constants.urls.API_QUILCA}/documents/7a00049b-2187-4072-af91-b3a2d9f75563/contents/current`;
    const promisePuade = httpRequest('GET', urlPuade);

    const urlDataPrivacy = `${constants.urls.API_QUILCA}/documents/f872ae55-3465-4d48-b41f-517220c138d7/contents/current`;
    const promiseDataPrivacy = httpRequest('GET', urlDataPrivacy);

    const urlContactName = `${constants.urls.API_QUILCA}/documents/ac97749a-21b8-4b68-b73e-2f82046c1347/contents/current`;
    const promiseContractName = httpRequest('GET', urlContactName);

    const allPromise = Promise.all([promisePuade, promiseDataPrivacy, promiseContractName]);

    allPromise.then(async (response) => {
      const dataPuade = response[0].data;
      const dataDataPrivacy = response[1].data;
      const dataContractName = response[2].data;

      const puadeUrl = `${constants.urls.API_QUILCA}/documents/versions/${dataPuade.id}/${dataPuade.filename}`;
      const dataPrivacyUrl = `${constants.urls.API_QUILCA}/documents/versions/${dataDataPrivacy.id}/${dataDataPrivacy.filename}`;
      const contractNameUrl = `${constants.urls.API_QUILCA}/documents/versions/${dataContractName.id}/${dataContractName.filename}`;

      return this.setState({
        puadeUrl,
        dataPrivacyUrl,
        contractNameUrl,
      });
    });
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
                  rel="noopener noreferrer" href={this.state.contractNameUrl}
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
                  rel="noopener noreferrer" href={this.state.dataPrivacyUrl}
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
          <PaymentCartDetail cartInfo={this.props.cartInfo} />
        </div>
      </div>
    );
  }
}

PaymentDetails.propTypes = {
  setRoute: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
  cartInfo: PropTypes.shape({
    currencySymbol: PropTypes.string,
    isOpen: PropTypes.bool,
    items: PropTypes.object,
    total: PropTypes.number,
  }).isRequired,
};

PaymentDetails.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.get('context'),
    strings: state.get('translate').strings,
    cartInfo: state.get('cart'),
  };
}

export default connect(mapStateToProps, { setRoute })(PaymentDetails);
