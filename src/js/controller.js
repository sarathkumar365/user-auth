import 'core-js';
import 'regenerator-runtime/runtime';
import * as formView from './views/formView';
import * as loginView from './views/loginView';

const signUpBtn = document.getElementById('signupBtn');
signUpBtn.addEventListener('click', formView.renderFormView);

const signinBtn = document.getElementById('signinBtn');
signinBtn.addEventListener('click', loginView.renderLoginView);
