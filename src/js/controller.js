import 'core-js';
import 'regenerator-runtime/runtime';

import '../css/styles.css';
import * as formView from './views/formView';
import * as loginView from './views/loginView';

// console.log('controllers');

const signUpBtn = document.getElementById('signupBtn');
signUpBtn.addEventListener('click', formView.renderFormView);

const signinBtn = document.getElementById('signinBtn');
signinBtn.addEventListener('click', loginView.renderLoginView);

if (module.hot) {
  module.hot.accept();
}
