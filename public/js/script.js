('use strict');
import axios from 'axios';
import 'regenerator-runtime/runtime';

const url = 'http://127.0.0.1:4444/auth/';
const url2 = 'http://localhost:4444/auth/';

const bttn = document
  .querySelector('#button')
  .addEventListener('click', async function (e) {
    e.preventDefault();

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
        const main = document.getElementById('#main');
        const alert = document.querySelector('.alert');
        main.classList.add('hidden');
        alert.classList.remove('hidden');
      }
    } catch (error) {
      console.log('error');
      // console.log(error);
      if (error) {
        const main = document.getElementById('#main');
        const alert = document.querySelector('.alert');
        const alertMsg = document.querySelector('.alert_message');
        console.log(error);

        main.classList.add('hidden');
        alert.classList.remove('hidden');
        alertMsg.innerHTML = 'something went wrong 😬';
      }
    }
  });
// async function getData() {
//   try {
//     const data = await axios.get(url);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
