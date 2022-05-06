export function signUpForm(body) {
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
                value="sarath"
              />
            </div>
            <div class="last">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value="kumar"
              />
            </div>
          </div>
          <div class="passwords">
            <div class="password1">
              <label for="password">Password</label>
              <input type="text" name="password" id="password" value="1234" />
            </div>
            <div class="password2">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value="1234"
              />
            </div>
          </div>
          <div class="ag">
            <div class="age">
              <label for="age">Age</label>
              <input type="text" name="age" id="age" value="22" />
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
              <input type="text" name="mobile" id="mobile" value="9946" />
            </div>
            <div class="email">
              <label for="email">email</label>
              <input type="text" name="email" id="email" value="mailto" />
            </div>
          </div>
          <div class="submit">
            <button
              class="gradient-border"
              form="createForm"
              id="button"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

  body.insertAdjacentHTML('afterbegin', markup);
}

export function renderError(body, msg) {
  console.log(body);
  const markup = `
  <div class="alert" id="alertMsg">
  <h2 class="alert_message" id="messagePreview">${msg}</h2>
  </div>`;

  body.insertAdjacentHTML('afterbegin', markup);
}

export function renderMsg(body, msg) {
  const markup = `
  <div class="alert" id="alertMsg">
  <h2 class="alert_message" id="messagePreview">${msg}</h2>
  </div>`;

  body.insertAdjacentHTML('afterbegin', markup);
}
