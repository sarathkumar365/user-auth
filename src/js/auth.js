import axios from 'axios';
axios.defaults.withCredentials = true;

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

export const login = async () => {
  console.log('login!!!');

  const email = document.getElementById('logEmail').value;
  const password = document.getElementById('pass').value;

  const data = {
    email,
    password,
  };
  // console.log(data);
  const cookieOptions = { withCredentials: true };

  try {
    const res = await axios.post('http://127.0.0.1:4444/auth/login', data);
    console.log(res);
    const msg = `Login sucessful 🍷 `;
    return msg;
  } catch (err) {
    // console.log(err);
    const msg = `Oops!!! ${err.response.data.message} 🚫 🚫`;
    return msg;
  }
};
