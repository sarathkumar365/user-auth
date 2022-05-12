import 'core-js';
import 'regenerator-runtime/runtime';
import * as formView from './views/formView';

const signUpBtn = document.getElementById('signupBtn');
signUpBtn.addEventListener('click', formView.renderFormView);

// const init = function () {
//   formView.adddHandlerSubmit(sendData);
// };

// init();
