import { USER } from './constants.js';
import { closeErrorMsg, showErrorMsg } from './dom-helpers.js';
import { errorCloseBtn, errorMsg, errorToast, registerForm, signinForm } from './elements.js';
import { postRegister, postSignin } from './requests.js';

document.addEventListener('DOMContentLoaded', function () {
  if (USER) {
    return (window.location.href = './index.html');
  }
});

// Logg inn
signinForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  closeErrorMsg();

  const values = {};
  const formData = new FormData(signinForm);
  formData.forEach((value, key) => (values[key] = value));

  const { email, password } = values;

  // validering
  if (!email.split('@')[1]?.includes('noroff.no'))
    return showErrorMsg('Invalid email, must be noroff.no');

  if (password.length < 5) return showErrorMsg('Password must be at least 5 characters');
  if (password.length > 32) return showErrorMsg('Password cannot be more than 32 characters');

  const res = await postSignin(values);
  if (!res.name) return showErrorMsg('Invalid email or password');

  // suksess
  localStorage.setItem('user', JSON.stringify(res));
  window.location.href = './index.html';
});

// Register
registerForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  closeErrorMsg();

  const values = {};
  const formData = new FormData(registerForm);
  formData.forEach((value, key) => (values[key] = value));

  const { email, password, confirm_password, name, banner, avatar } = values;
  console.log(values);

  if (!email.split('@')[1]?.includes('noroff.no'))
    return showErrorMsg('Invalid email, must be noroff.no');

  if (!name.match(/^[a-z0-9]+$/i))
    return showErrorMsg('Name cannot include spaces or special characters');
  if (password.length < 5) return showErrorMsg('Password must be at least 5 characters');
  if (password.length > 32) return showErrorMsg('Password cannot be more than 32 characters');
  if (password !== confirm_password) return showErrorMsg('Passwords do not match');

  if (!banner) delete values.banner;
  if (!avatar) delete values.avatar;

  const res = await postRegister(values);

  // hvis responshar en melding, skjedde det en feil
  if (res.message) return showErrorMsg(res.message);

  // suksess, logg på med den nylig registrerte kontoen
  const loginResponse = await postSignin({ email, password });
  localStorage.setItem('user', JSON.stringify(loginResponse));
  window.location.href = './index.html';
});

errorCloseBtn.addEventListener('click', closeErrorMsg);
