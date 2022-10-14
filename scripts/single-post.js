import { USER } from './constants.js';
import {
  closeErrorMsg,
  renderPostComments,
  renderSinglePost,
  setHeaderUsername,
  showErrorMsg,
} from './dom-helpers.js';
import { errorCloseBtn, fullPageLoader, signout, writeCommentForm } from './elements.js';
import { getSinglePost, postComment } from './requests.js';

document.addEventListener('DOMContentLoaded', async function () {
  if (!USER) return (window.location.href = './signin.html');

  setHeaderUsername(USER.name);
  const id = getQueryVariable('id');

  if (!id) return (window.location.href = './index.html');

  const post = await getSinglePost(id);
  renderSinglePost(post);
  renderPostComments(post.comments);

  // når alt er ferdig, fjern fullsidelasteren
  fullPageLoader.remove();
});

signout.addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = './signin.html';
});

writeCommentForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  closeErrorMsg();

  const values = {};
  const formData = new FormData(writeCommentForm);
  formData.forEach((value, key) => (values[key] = value));

  const { body } = values;
  if (!body) return showErrorMsg('Body is required');

  const id = getQueryVariable('id');

  // opprette nytt innlegg hvis ingen klientfeil (Error).
  const res = await postComment(id, values);
  if (res.message) return showErrorMsg(res.message);

  // update ui
  const post = await getSinglePost(id);
  renderSinglePost(post);
  renderPostComments(post.comments);
  // Tilbakestill skjemaet etter at alt var vellykket
  writeCommentForm.reset();
});

errorCloseBtn.addEventListener('click', closeErrorMsg);

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
