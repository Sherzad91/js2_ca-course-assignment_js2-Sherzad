document.addEventListener('DOMContentLoaded', async function () {
  localStorage.removeItem('user');
  window.location.href = './signin.html';
});
