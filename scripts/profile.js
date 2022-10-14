import { USER } from './constants.js';
import {
  closeEdtModal,
  closeErrorMsg,
  renderMyPosts,
  renderUsers,
  setHeaderUsername,
  showErrorMsg,
} from './dom-helpers.js';
import {
  avatar as avatarEl,
  banner as bannerEl,
  bodyInput,
  editModalOverlay,
  editPostForm,
  errorCloseBtn,
  fullPageLoader,
  idInput,
  mediaInput,
  signout,
  titleInput,
  updateProfileForm,
} from './elements.js';
import {
  deletePostReq,
  followUser as followUserReq,
  unfollowUser as unfollowUserReq,
  getMe,
  putPost,
  putUpdateProfile,
} from './requests.js';

document.addEventListener('DOMContentLoaded', async function () {
  if (!USER) return (window.location.href = './signin.html');

  const res = await getMe(USER.name);
  if (res.message) return showErrorMsg(res.message);

  renderMyPosts(res.posts, USER);

  const filteredFollowing = res.following.map((u) => ({ ...u, isFollowing: true }));

  renderUsers(filteredFollowing);

  bannerEl.src = res.banner;
  avatarEl.src = res.avatar;

  setHeaderUsername(USER.name);

  // når alt er ferdig, fjern fullsidelasteren
  fullPageLoader.remove();
});

errorCloseBtn.addEventListener('click', closeErrorMsg);

// utsett slettepostfunksjonen for referanse fra brukergrensesnittet (postkort)
window.deletePost = async (id) => {
  const res = await deletePostReq(id);
  const me = await getMe(USER.name);

  renderMyPosts(me.posts, USER);
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

  // oppdater innlegget hvis det ikke er noen klientfeil (Error)
  const res = await putPost(id, values);
  if (res.message) return showErrorMsg(res.message);

  // update ui
  const me = await getMe(USER.name);
  renderMyPosts(me.posts, USER);

  // tilbakestill skjemaet etter at alt var vellykket og lukk modal
  closeEdtModal();
});

editModalOverlay.addEventListener('click', function (event) {
  closeEdtModal();
});

// Oppdater profil (avatar og banner) og endre brukergrensesnitt
updateProfileForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  closeErrorMsg();
  const formData = new FormData(updateProfileForm);

  const values = {};
  formData.forEach((value, key) => (values[key] = value));

  const { banner, avatar } = values;
  //  Hvis (!banner || !avatar) return showErrorMsg ('Banner og avatar er påkrevd');

  if (!banner) delete values.banner;
  if (!avatar) delete values.avatar;

  // opprette nytt innlegg hvis ingen klientfeil (Error)
  const res = await putUpdateProfile(USER.name, values);
  if (res.message) return showErrorMsg(res.message);

  // update ui
  const me = await getMe(USER.name);
  renderMyPosts(me.posts, USER);
  avatarEl.src = me.avatar;
  bannerEl.src = me.banner;

  // tilbakestill skjemaet etter at alt var vellykket
  updateProfileForm.reset();
});

signout.addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = '/signin.html';
});

async function followUser(name) {
  // Kalle api
  const res = await followUserReq(name);
  if (res.message) return showErrorMsg(res.message);
  await reloadUI();
}

async function unfollowUser(name) {
  // Kalle api
  const res = await unfollowUserReq(name);
  if (res.message) return showErrorMsg(res.message);
  await reloadUI();
}

async function reloadUI() {
  const res = await getMe(USER.name);
  if (res.message) return showErrorMsg(res.message);

  renderMyPosts(res.posts, USER);

  const filteredFollowing = res.following.map((u) => ({ ...u, isFollowing: true }));

  renderUsers(filteredFollowing);

  bannerEl.src = res.banner;
  avatarEl.src = res.avatar;
}

window.followUser = followUser;
window.unfollowUser = unfollowUser;
