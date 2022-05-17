import { async } from 'regenerator-runtime';
import { login } from '../auth';

const parentEl = document.querySelector('body');

const clearView = () => {
  parentEl.innerHTML = '';
};

const renderAlert = (msg) => {
  // console.log(msg);
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

    renderAlert(res);
  });
};

const generateMarkup = function () {
  const markup = `
    <div class="login">
      <div class="loginBox">
        <p>Please login using your AUTH credentials</p>
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
        <button id="loginBtn">LOGIN</button>
      </div>
    </div>`;

  return markup;
};
