export default {
  validate: {
    password: /^(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*$/,
    email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z]{2,3}){0,2}(\.[a-z]{2,11})?$/,
  },
  message: {
    password: 'Debe incluir mayúsculas, minúsculas, números o caracter especial (@#$%^&+=!*)',
    email: 'Formato inválido',
  },
};
