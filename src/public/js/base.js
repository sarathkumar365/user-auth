'use strict';

import axios from 'axios';
import styles from '../css/styles.css';
import * as formComponent from '../views/formComponents';

import 'regenerator-runtime/runtime';

const body = document.body;
const signUpBttn = document.getElementById('signupBtn');

signUpBttn.addEventListener('click', function (e) {
  console.log('api is listening');

  // 1. clear the DOM and RENDER THE SIGN UP FORM

  body.innerHTML = '';
  formComponent.signUpForm(body);

  // 2. send data to backend

  const bttn = document
    .querySelector('#button')
    .addEventListener('click', async function (e) {
      e.preventDefault();

      console.log('api');
      const url = 'http://127.0.0.1:4444/auth/';
      const url2 = 'http://localhost:4444/auth/';

      const firstName = document.querySelector('#firstName').value;
      const lastName = document.querySelector('#lastName').value;
      const password = document.querySelector('#password').value;
      const confirmPassword = document.querySelector('#confirmPassword').value;
      const age = document.querySelector('#age').value;
      const gender = document.querySelector('#gender').value;
      const mobile = document.querySelector('#mobile').value;
      const email = document.querySelector('#email').value;

      const data = {
        firstName,
        lastName,
        password,
        confirmPassword,
        age,
        gender,
        mobile,
        email,
      };

      try {
        const res = await axios.post(url, data);
        console.log(res);
        if (res.status === 200) {
          // TODO
        }
      } catch (error) {
        if (error) {
          body.innerHTML = '';
          const msg = error.response.data.message;
          formComponent.renderError(body, msg);
        }
      }
    });
});
