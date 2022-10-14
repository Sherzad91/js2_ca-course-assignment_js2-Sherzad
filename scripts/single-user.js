import { USER } from './constants.js';
import {
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
  errorCloseBtn,
  fullPageLoader,
  idInput,
  mediaInput,
  signout,
  titleInput,
} from './elements.js';
import {
  deletePostReq,
  followUser as followUserReq,
  unfollowUser as unfollowUserReq,
  getMe,
} from './requests.js';

document.addEventListener('DOMContentLoaded', async function () {
  if (!USER) return (window.location.href = './signin.html');

  const res = await getMe(getQueryVariable('name'));
  if (res.message) return showErrorMsg(res.message);

  renderMyPosts(res.posts, res);

  const filteredFollowing = res.following.map((u) => ({
    ...u,
    isFollowing: res.following.find((f) => f.name === USER.name) ? true : false,
  }));

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

signout.addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = './signin.html';
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

window.followUser = followUser;
window.unfollowUser = unfollowUser;

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
