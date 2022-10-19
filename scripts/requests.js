import { API_URL, REQUEST_HEADERS } from './constants.js';

export async function getAllPosts() {
  try {
    const res = await fetch(`${API_URL}/social/posts?_author=true&_reactions=true`, {
      headers: REQUEST_HEADERS,
      method: 'GET',
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

/**
 * @param {Object} body e-post og passord brukt for å logge inn
 */
export async function postSignin(body) {
  try {
    const res = await fetch(`${API_URL}/social/auth/login`, {
      headers: REQUEST_HEADERS,
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

/**
 * @param {Object} body registreringsdata
 */
export async function postRegister(body) {
  try {
    const res = await fetch(`${API_URL}/social/auth/register`, {
      headers: REQUEST_HEADERS,
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function postCreatePost(body) {
  try {
    const res = await fetch(`${API_URL}/social/posts`, {
      headers: REQUEST_HEADERS,
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function getSinglePost(id) {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}?_author=true&_comments=true&_reactions=true`, {
      headers: REQUEST_HEADERS,
      method: 'GET',
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function postComment(id, body) {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}/comment`, {
      headers: REQUEST_HEADERS,
      method: 'POST',
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function deletePostReq(id) {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}`, {
      headers: REQUEST_HEADERS,
      method: 'DELETE',
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function putPost(id, newPost) {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}`, {
      headers: REQUEST_HEADERS,
      method: 'PUT',
      body: JSON.stringify(newPost),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

// å sende emojier i URL fungerer ikke
export async function putReactPost(id) {
  try {
    const res = await fetch(`${API_URL}/social/posts/${id}/react/👍`, {
      headers: REQUEST_HEADERS,
      method: 'PUT',
      body: '{}',
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function getMe(name) {
  try {
    const res = await fetch(
      `${API_URL}/social/profiles/${name}?_followers=true&_posts=true&_following=true`,
      {
        headers: REQUEST_HEADERS,
        method: 'GET',
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function putUpdateProfile(name, body) {
  try {
    const res = await fetch(`${API_URL}/social/profiles/${name}/media`, {
      headers: REQUEST_HEADERS,
      method: 'PUT',
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function getAllUsers() {
  try {
    const res = await fetch(`${API_URL}/social/profiles?_followers=true`, {
      headers: REQUEST_HEADERS,
      method: 'GET',
    });

    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function followUser(name) {
  try {
    const res = await fetch(`${API_URL}/social/profiles/${name}/follow`, {
      headers: REQUEST_HEADERS,
      method: 'PUT',
      body: '{}',
    });
    const data = await res.json();
    return data;
  } catch (e) {}
}

export async function unfollowUser(name) {
  try {
    const res = await fetch(`${API_URL}/social/profiles/${name}/unfollow`, {
      headers: REQUEST_HEADERS,
      method: 'PUT',
      body: '{}',
    });
    const data = await res.json();
    return data;
  } catch (e) {}
}
