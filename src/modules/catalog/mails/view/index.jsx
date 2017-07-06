import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import CatalogCard from '../../catalog-card';
import LoadingSpin from '../../../../components/loading-spin';

import { setRoute } from '../../../../reducers/routes/actions';
import { addProduct } from '../../../../reducers/cart/actions';
import { fetchMails } from '../../../../reducers/mails/actions';

import styles from './styles.css';

class MailsCatalog extends Component {
  constructor(props) {
    super(props);

    this.addToCart = this.addToCart.bind(this);

    this.state = { fetchingMails: true };
  }

  async componentWillMount() {
    this.props.setRoute({ title: 'Catálogo' }, { title: 'Correos' });

    if (this.props.mails.products.size > 0) return this.setState({ fetchingMails: false });

    await this.props.fetchMails();
    return this.setState({ fetchingMails: false });
  }

  addToCart(item) {
    this.props.addProduct(item, 'hosting');
  }

  render() {
    return (
      <div className={styles.container}>
        {(
          (this.state.fetchingMails && <LoadingSpin />)
          ||
          (!this.state.fetchingMails && this.props.mails.get('products').valueSeq().map(product =>
            <CatalogCard
              key={product.id}
              addToCart={this.addToCart}
              info={product}
            />,
          ))
        )}
      </div>
    );
  }
}

MailsCatalog.propTypes = {
  mails: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
  addProduct: PropTypes.func.isRequired,
  fetchMails: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { mails: state.get('mails') };
}

export default connect(mapStateToProps, {
  setRoute,
  addProduct,
  fetchMails,
})(MailsCatalog);
