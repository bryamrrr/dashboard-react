import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import FormInput from '../../../../components/form-input';
import Combo from '../../../../components/combo';
import FormButton from '../../../../components/form-button';

import { setLanguage } from '../../../../reducers/translate/actions';

import styles from './styles.css';

class UserDataForm extends Component {
  constructor(props) {
    super(props);

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(data) {
    const language = (data.id === 1) ? 'es' : 'en';
    this.props.setLanguage(language);
  }

  render() {
    const countries = {
      1: {
        id: 1,
        name: 'Perú',
      },
      2: {
        id: 2,
        name: 'Estados Unidos',
      },
      3: {
        id: 3,
        name: 'Argentina',
      },
    };

    const documentTypes = {
      1: {
        id: 1,
        name: 'DNI',
      },
      2: {
        id: 2,
        name: 'RUC',
      },
      3: {
        id: 3,
        name: 'OTROS',
      },
    };

    const customerTypes = {
      1: {
        id: 1,
        name: 'Persona',
      },
      2: {
        id: 2,
        name: 'Empresa',
      },
    };

    const businessareas = {
      1: {
        id: 1,
        name: 'Agricultura, ganadería, silvicultura y pesca',
      },
      2: {
        id: 2,
        name: 'Explotación de minas y canteras',
      },
      3: {
        id: 3,
        name: 'Industrias manufactureras',
      },
    };

    const languages = {
      1: {
        id: 1,
        name: 'Español',
      },
      2: {
        id: 2,
        name: 'Inglés',
      },
    };

    return (
      <div className={styles.container}>
        <article>
          <FormInput
            name="user"
            includeIcon="linearicon-user"
            placeholder={this.props.strings.forms.user}
          />
        </article>
        <article>
          <FormInput
            name="email"
            includeIcon="linearicon-envelope"
            placeholder={this.props.strings.forms.email}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-earth"
            placeholder={this.props.strings.forms.country}
            options={countries}
          />
        </article>
        <article>
          <FormInput
            name="phone"
            includeIcon="linearicon-phone"
            placeholder={this.props.strings.forms.phone}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-register"
            placeholder={this.props.strings.forms.documentType}
            options={documentTypes}
          />
        </article>
        <article>
          <FormInput
            name="document"
            includeIcon="linearicon-profile"
            placeholder={this.props.strings.forms.document}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-users"
            placeholder={this.props.strings.forms.personType}
            options={customerTypes}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-library"
            placeholder={this.props.strings.forms.field}
            options={businessareas}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-earth"
            placeholder={this.props.strings.forms.language}
            options={languages}
            selected={languages['1']}
            changeSelected={this.changeLanguage}
          />
        </article>
        <FormButton
          callToAction={this.props.strings.userData.title}
        />
      </div>
    );
  }
}

UserDataForm.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  strings: PropTypes.objectOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return { strings: state.get('translate').strings };
}

export default connect(mapStateToProps, { setLanguage })(UserDataForm);
