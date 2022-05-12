import axios from 'axios';

const url = 'http://127.0.0.1:4444/auth/';
const url2 = 'http://localhost:4444/auth/';

export async function sendData() {
  console.log('data SENT!!!');

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
    // console.log(res);
    if (res.status === 200) {
      // render success message
      const msg = `Welcome  to AUTH, ${res.data.data.name} 😎 `;
      return msg;
    }
  } catch (error) {
    console.log(error);
    const msg = `Oops!!! ${error.response.data.message} 🚫 🚫`;
    return msg;
  }
}
