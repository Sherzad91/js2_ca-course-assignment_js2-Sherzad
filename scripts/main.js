import { USER } from './constants.js';
import {
  closeEdtModal,
  closeErrorMsg,
  renderPosts,
  setHeaderUsername,
  showErrorMsg,
} from './dom-helpers.js';
import {
  addPostForm,
  bodyInput,
  editModalOverlay,
  editPostForm,
  errorCloseBtn,
  fullPageLoader,
  idInput,
  mediaInput,
  signout,
  titleInput,
} from './elements.js';
import { deletePostReq, getAllPosts, postCreatePost, putPost, putReactPost } from './requests.js';

document.addEventListener('DOMContentLoaded', async function () {
  if (!USER) return (window.location.href = './signin.html');

  await updateUI();

  setHeaderUsername(USER.name);

  // når alt er ferdig, fjern fullsidelasteren
  fullPageLoader.remove();
});

signout.addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = './signin.html';
});

addPostForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  closeErrorMsg();

  const values = {};
  const formData = new FormData(addPostForm);
  formData.forEach((value, key) => (values[key] = value));

  const { title, media, body } = values;
  if (!title || !body) return showErrorMsg('Title and body are required');

  if (!media) delete values.media;

  // opprette nytt innlegg hvis ingen klientfeil
  const res = await postCreatePost(values);
  if (res.message) return showErrorMsg(res.message);

  await updateUI();

  // tilbakestill skjemaet etter at alt var vellykket
  addPostForm.reset();
});

errorCloseBtn.addEventListener('click', closeErrorMsg);

// utsett slettepostfunksjonen for referanse fra brukergrensesnittet ui (post card)
window.deletePost = async (id) => {
  const res = await deletePostReq(id);
  await updateUI();
};

window.openEditModal = async (_post) => {
  const post = JSON.parse(_post);

  editModalOverlay.style.display = 'flex';
  titleInput.value = post.title;
  bodyInput.value = post.body;
  mediaInput.value = post.media;
  idInput.value = post.id;
};

editPostForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(editPostForm);

  const id = formData.get('id');
  const values = {
    title: formData.get('title'),
    media: formData.get('media'),
    body: formData.get('body'),
  };

  const { title, media, body } = values;
  if (!title || !body) return showErrorMsg('Title and body are required');

  if (!media) delete values.media;

  // oppdater innlegg hvis ingen klientfeil (errors)
  const res = await putPost(id, values);
  if (res.message) return showErrorMsg(res.message);

  // update ui
  await updateUI();

  // tilbakestill skjemaet etter at alt var vellykket og lukk modal
  closeEdtModal();
});

editModalOverlay.addEventListener('click', function (event) {
  closeEdtModal();
});

window.reactPost = async (id) => {
  const res = await putReactPost(id);
  if (res.message) return showErrorMsg(res.message);
  // updater ui
  await updateUI();
};

async function updateUI() {
  const posts = await getAllPosts();
  const search = getQueryVariable('search');
  if (search) {
    console.log(true);
    return renderPosts(posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase())));
  }
  renderPosts(posts);
}

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
