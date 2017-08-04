import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import constants from '../../../../extra/constants';
import httpRequest from '../../../../extra/http-request';

import LoadingIcon from '../../../../components/loading-icon';

import styles from './styles.css';

class PurchaseDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      fetchingData: true,
      data: {},
      customerType: '',
    };
  }

  componentWillMount() {
    const id = this.context.router.route.match.params.id;

    const urlData = `${constants.urls.API_SONQO}/orders/${id}?includes=customer.customerType,currency,orderDetails`;
    const promiseData = httpRequest('GET', urlData);

    const urlDataPrivacy = `${constants.urls.API_QUILCA}/documents/f872ae55-3465-4d48-b41f-517220c138d7/contents/current`;
    const promiseDataPrivacy = httpRequest('GET', urlDataPrivacy);

    const urlContactName = `${constants.urls.API_QUILCA}/documents/ac97749a-21b8-4b68-b73e-2f82046c1347/contents/current`;
    const promiseContractName = httpRequest('GET', urlContactName);

    const allPromise = Promise.all([promiseData, promiseDataPrivacy, promiseContractName]);

    allPromise.then(async (response) => {
      const data = response[0].data;
      const dataDataPrivacy = response[1].data;
      const dataContractName = response[2].data;

      const dataPrivacyUrl = `${constants.urls.API_QUILCA}/documents/versions/${dataDataPrivacy.id}/${dataDataPrivacy.filename}`;
      const contractNameUrl = `${constants.urls.API_QUILCA}/documents/versions/${dataContractName.id}/${dataContractName.filename}`;

      return this.setState({
        fetchingData: false,
        customerType: data.customer.customerType.slug,
        data,
        dataPrivacyUrl,
        contractNameUrl,
      });
    });
  }

  render() {
    const name = (this.state.customerType === 'persona')
    ? 'Nombre y Apellidos'
    : 'Razón social';

    return (
      <div>
        {(this.state.fetchingData && <LoadingIcon />)}
        {(!this.state.fetchingData &&
        <div className={styles.container}>
          <div className={styles.paymentTitle}>
            <img
              className={styles.logo}
              src={`${this.props.context}/images/logo.png`}
              alt=""
            />
          </div>
          <div className={styles.detailContainer}>
            <h2>Orden de compra</h2>
            <div>
              <p>Código de orden de compra: <strong>{this.state.data.code}</strong> </p>
            </div>
            <h2>Datos de facturación</h2>
            <div className={styles.lineWrapper}>
              <p>{name}: <strong>{`${this.state.data.customer.name} ${this.state.data.customer.lastname}`}</strong></p>
              <p>{this.state.data.documentType}:
                <strong>{this.state.data.customer.documentId}</strong>
              </p>
              <p>Dirección: <strong>{this.state.data.address}</strong></p>
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
                  {this.state.data.orderDetails.map(item =>
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>
                        <ul className={styles.circleList}>
                          <li>200 GB hosting</li>
                          <li>100 cuentas</li>
                          <li>50 sitios web</li>
                          <li>ilimitados GB transferencia mensual</li>
                          <li>(El pago es anual)</li>
                        </ul>
                      </td>
                      <td>{this.state.data.currency.symbol} {item.amount}</td>
                    </tr>,
                  )}
                </tbody>
                <tfoot>
                  <tr className={styles.subTotal}>
                    <td colSpan="2">{this.state.data.factorLabel}:</td>
                    <td>
                      <span className={styles.symbol}>{this.state.data.currency.symbol} </span>
                      <span className={styles.money}>{this.state.data.taxAmount}</span>
                    </td>
                  </tr>
                  <tr className={styles.total}>
                    <td colSpan="2">TOTAL:</td>
                    <td>
                      <span className={styles.symbol}>{this.state.data.currency.symbol} </span>
                      <span className={styles.money}>{this.state.data.finalAmount}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <h2>Documentos de pago</h2>
            <p>
              {'Revisa el '}
              <a
                target="_blank"
                rel="noopener noreferrer" href={this.state.contractNameUrl}
                className={styles.link}
              >
                {this.props.strings.sales.contractName}
              </a> y <a
                target="_blank"
                rel="noopener noreferrer" href={this.state.dataPrivacyUrl}
                className={styles.link}
              >
                {this.props.strings.sales.dataPrivacy}
              </a>
            </p>
          </div>
        </div>
        )}
      </div>
    );
  }
}

PurchaseDetail.propTypes = {
  context: PropTypes.string.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

PurchaseDetail.contextTypes = {
  router: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    context: state.get('context'),
    strings: state.get('translate').strings,
  };
}

export default connect(mapStateToProps)(PurchaseDetail);
