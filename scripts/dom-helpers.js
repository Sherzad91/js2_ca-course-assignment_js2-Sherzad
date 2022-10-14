import {
  allPosts,
  allUsers,
  bodyInput,
  editModalOverlay,
  errorMsg,
  errorToast,
  headerUsername,
  mediaInput,
  postComments,
  singlePost as singlePostDiv,
  titleInput,
} from './elements.js';
import { myPost, singleComment, singlePost, singleUser } from './templates.js';

/**
 * får en liste over innlegg og gjengir dem til HTML
 * @param {Array} posts alle innlegg fra api
 */
export function renderPosts(posts) {
  allPosts.innerHTML = '';

  posts.forEach((post) => {
    allPosts.innerHTML += singlePost(post);
  });
}

export function renderMyPosts(posts, me) {
  allPosts.innerHTML = '';

  posts.forEach((post) => {
    allPosts.innerHTML += myPost(post, me);
  });
}

export function renderSinglePost(post) {
  singlePostDiv.innerHTML = singlePost(post);
}

export function renderPostComments(comments) {
  postComments.innerHTML = '';
  comments.forEach((comment) => {
    postComments.innerHTML += singleComment(comment);
  });
}

/**
 * viser feil toast
 * @param {String} msg som skal vises
 */
export function showErrorMsg(msg) {
  errorMsg.innerHTML = msg;
  errorToast.style.display = 'flex';
}

/**
 * Lukk feiltoast og klar melding
 */
export function closeErrorMsg() {
  errorMsg.innerHTML = '';
  errorToast.style.display = 'none';
}

export function setHeaderUsername(name) {
  headerUsername.innerHTML = name;
}

export function closeEdtModal() {
  titleInput.value = '';
  bodyInput.value = '';
  mediaInput.value = '';
  editModalOverlay.style.display = 'none';
}

export function renderUsers(users) {
  allUsers.innerHTML = '';

  users.forEach((user) => {
    allUsers.innerHTML += singleUser(user);
  });
}
