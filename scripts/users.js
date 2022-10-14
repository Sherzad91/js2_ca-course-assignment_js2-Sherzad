import { USER } from './constants.js';
import {
  closeEdtModal,
  closeErrorMsg,
  renderPosts,
  renderUsers,
  setHeaderUsername,
  showErrorMsg,
} from './dom-helpers.js';
import { errorCloseBtn, fullPageLoader, signout } from './elements.js';
import {
  getAllUsers,
  followUser as followUserReq,
  unfollowUser as unfollowUserReq,
} from './requests.js';

document.addEventListener('DOMContentLoaded', async function () {
  if (!USER) return (window.location.href = './signin.html');

  await reloadUI();
  setHeaderUsername(USER.name);

  // når alt er ferdig, fjern fullsidelasteren
  fullPageLoader.remove();
});

async function reloadUI() {
  setHeaderUsername(USER.name);
  const users = await getAllUsers();
  const filteredUsers = users.map((user) => {
    return {
      ...user,
      isFollowing: user.followers.find((f) => f.name === USER.name) ? true : false,
    };
  });

  renderUsers(filteredUsers);
}

async function followUser(name) {
  // kalle api
  const res = await followUserReq(name);
  if (res.message) return showErrorMsg(res.message);
  await reloadUI();
}

async function unfollowUser(name) {
  // kalle api
  const res = await unfollowUserReq(name);
  if (res.message) return showErrorMsg(res.message);
  await reloadUI();
}

window.followUser = followUser;
window.unfollowUser = unfollowUser;
