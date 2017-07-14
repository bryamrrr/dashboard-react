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
            placeholder="Usuario"
          />
        </article>
        <article>
          <FormInput
            name="email"
            includeIcon="linearicon-envelope"
            placeholder="Correo"
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-earth"
            placeholder="Selecciona un país"
            options={countries}
          />
        </article>
        <article>
          <FormInput
            name="phone"
            includeIcon="linearicon-phone"
            placeholder="Telefono"
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-register"
            placeholder="Selecciona un tipo de documento"
            options={documentTypes}
          />
        </article>
        <article>
          <FormInput
            name="document"
            includeIcon="linearicon-profile"
            placeholder="Número de documento"
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-users"
            placeholder="Selecciona un tipo de persona"
            options={customerTypes}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-library"
            placeholder="Selecciona un Rubro"
            options={businessareas}
          />
        </article>
        <article>
          <Combo
            includeIcon="linearicon-earth"
            placeholder="Selecciona un idioma"
            options={languages}
            selected={languages['1']}
            changeSelected={this.changeLanguage}
          />
        </article>
        <FormButton
          callToAction="Actualizar mis datos"
        />
      </div>
    );
  }
}

UserDataForm.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default connect(null, { setLanguage })(UserDataForm);
