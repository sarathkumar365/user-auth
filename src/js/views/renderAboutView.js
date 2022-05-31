import { logout } from '../auth';

import pencil from '../../resources/pencil.png';

const parentEl = document.querySelector('body');

export const renderAboutView = (user) => {
  const markup = `
    <div class="container">
        <div class="about">
          <div class="welcome">
            <h2><span>AUTH</span> services</h2>
            <p class="welcomeText">Welcome</p>
            <p class="userName">${user.name}</p>
          </div>
          <div class="details">
            <div class="nameBox">
              <p>${user.name}</p>
              <a href="#">
                <img src="${pencil}" alt="edit" />
              </a>
            </div>
            <div class="emailBox">
              <p>${user.email}</p>
              <a href="#">
                <img src="${pencil}" alt="edit" />
              </a>
            </div>
            <div class="mobileBox">
              <p>${user.mobile}</p>
              <a href="#">
                <img src="${pencil}" alt="edit" />
              </a>
            </div>
          </div>
          <div class="actionBtns">
            <button id="logoutBtn">Logout</button>
          </div>
        </div>
      </div>`;

  parentEl.insertAdjacentHTML('afterbegin', markup);

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    // console.log('logout');
    logout();
  });

  const anchor = document.querySelectorAll('a');
  anchor.forEach((i) => {
    i.addEventListener('click', () => {
      alert('Feature comming soon !!! 🔜 ');
    });
  });
};
