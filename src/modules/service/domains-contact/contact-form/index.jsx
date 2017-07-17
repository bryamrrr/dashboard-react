import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Anchor from '../../../../components/anchor';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import styles from './styles.css';

function ContactForm(props) {
  const contacts = {
    1: {
      id: '1',
      name: 'Team qiqmapunku',
    },
    2: {
      id: '2',
      name: 'Administrador',
    },
  };
  return (
    <div className={styles.container}>
      <article className={styles.itemContact}>
        <h3>{props.strings.contactDomains.registrant}</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder={props.strings.contactDomains.chooseContact}
            options={contacts}
          />
          <Link to="#">
            <Anchor text={props.strings.contactDomains.orNewContact} />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>{props.strings.contactDomains.admin}</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder={props.strings.contactDomains.chooseContact}
            options={contacts}
          />
          <Link to="#">
            <Anchor text={props.strings.contactDomains.orNewContact} />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>{props.strings.contactDomains.tech}</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder={props.strings.contactDomains.chooseContact}
            options={contacts}
          />
          <Link to="#">
            <Anchor text={props.strings.contactDomains.orNewContact} />
          </Link>
        </div>
      </article>
      <article className={styles.itemContact}>
        <h3>{props.strings.contactDomains.billing}</h3>
        <div className={styles.selectWrapper}>
          <Combo
            includeIcon="linearicon-user"
            placeholder={props.strings.contactDomains.chooseContact}
            options={contacts}
          />
          <Link to="#">
            <Anchor text={props.strings.contactDomains.orNewContact} />
          </Link>
        </div>
      </article>
      <FormButton
        callToAction={props.strings.contactDomains.save}
      />
    </div>
  );
}

ContactForm.propTypes = {
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps)(ContactForm);
