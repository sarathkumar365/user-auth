import { async } from 'regenerator-runtime';
import { sendData } from '../auth';

const parentEl = document.querySelector('body');

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

export const renderFormView = () => {
  // CLEAR & RENDER FORM
  clearView();
  const markup = generateMarkup();

  parentEl.insertAdjacentHTML('afterbegin', markup);

  // SEND DATA TO BACKEND ON SUBMIT
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const resMsg = await sendData();

    renderAlert(resMsg);
  });
};

const clearView = () => {
  parentEl.innerHTML = '';
};

const generateMarkup = () => {
  const markup = `
    <div class="main" id="#main">
      <div class="left">
        <div class="tagline">
          <h2>WELCOME TO</h2>
        </div>
        <div class="auth">
          <h1><span>AUTH</span></h1>
        </div>
        <div class="message">
          <p>
            A place where you can authenticate and authorize
            <span>easily</span>
          </p>
        </div>
      </div>
      <div class="right">
        <div class="wrapper">
          <form action="" method="post" id="createForm" class="form">
            <div class="names">
              <div class="first">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  
                />
              </div>
              <div class="last">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  
                />
              </div>
            </div>
            <div class="passwords">
              <div class="password1">
                <label for="password">Password</label>
                <input type="text" name="password" id="password"  />
              </div>
              <div class="password2">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  
                />
              </div>
            </div>
            <div class="ag">
              <div class="age">
                <label for="age">Age</label>
                <input type="text" name="age" id="age"/>
              </div>
              <div class="gender">
                <label for="gender">Gender</label>
                <div class="gender_select">
                  <select name="gender" id="gender">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="mobile">
                <label for="mobile">Mobile</label>
                <input type="text" name="mobile" id="mobile" />
              </div>
              <div class="email">
                <label for="email">email</label>
                <input type="text" name="email" id="email"  />
              </div>
            </div>
            <div class="submit">
              <button
                class="gradient-border"
                form="createForm"
                id="submitBtn"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

  return markup;
};
