import { async } from 'regenerator-runtime';
import { login, getUser } from '../auth';
import { renderAboutView } from './renderAboutView';

const parentEl = document.querySelector('body');

const clearView = () => {
  parentEl.innerHTML = '';
};

const renderAlert = (msg) => {
  console.log(msg);
  const markup = `
      <div  id="alertBox">
        <div class="alertMsg">
          <p class="alert_message" id="messagePreview">${msg}</p>
        </div>
      </div>`;

  clearView();
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

export const renderLoginView = () => {
  clearView();
  const markup = generateMarkup();
  parentEl.insertAdjacentHTML('afterbegin', markup);

  const loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', async function alert(e) {
    e.preventDefault();

    const res = await login();

    if (res.status === true) {
      clearView();
      const user = await getUser();
      renderAboutView(user.user);
    } else {
      clearView();
      renderAlert(res.msg);
    }

    // renderAlert(res);
  });
};

const generateMarkup = function () {
  const markup = `
    <div class="login">
      <div class="loginBox">
        <p>Please login using your <span class="auth">AUTH</span> credentials</p>
        <div class="inp-boxes">
          <input
            type="text"
            class="logEmail"
            id="logEmail"
            onfocus="this.value=''"
            
            value="email"
          />
          <input
            type="text"
            id="pass"
            class="pass"
            onfocus="this.value=''"
            
            value="password"
          />
        </div>
        <button id="loginBtn">SIGN IN</button>
      </div>
    </div>`;

  return markup;
};
