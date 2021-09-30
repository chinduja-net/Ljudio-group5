export async function createAccountFetch(body) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
}

export async function createPlaylistFetch(body) {
  const token = getToken();
  const res = await fetch('/api/createPlaylist', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data;
}

export async function loginFetch(body) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('login data', data);
  return data;
}

export function getToken() {
  return sessionStorage.getItem('auth');
}

export async function isLoggedIn() {
  const token = getToken();
  if (token === null) {
    const result = { loggedIn: false };
    return result;
  }

  const response = await fetch('/api/loggedin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return await data;
}

export async function showUserPlaylistsFetch() {
  const token = getToken();

  const res = await fetch('/api/playlistsByUserId', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log('data log frontend', data);
  return data;
}

export async function songsInsidePlaylistFetch(body) {
  const token = getToken();
  const res = await fetch('/api/getSongsInPlaylist', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log('songs found from backend', data);
  return data;
}

export async function addSongsToPlaylistFetch(body) {
  const token = getToken();
  const res = await fetch('/api/addSongToPlaylist', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log('song added to playlist', data);
  return data;
}
