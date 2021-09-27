import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { createPlaylistFetch, isLoggedIn } from '../services/authService';

function CreatePlaylistForm() {
  const [playlistName, setPlaylistName] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(playlistName);
  };

  async function createPlaylist(playlistName) {
    const obj = {
      playlistName,
    };
    try {
      const data = await createPlaylistFetch(obj);
      if (data) {
        console.log(data);
        history.push('/PlayListViewer');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isLoggedIn() ? (
        <form action="submit" onSubmit={handleSubmit}>
          <input
            name="playlistname"
            type="text"
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <label htmlFor="playlistname">Give your playlist a name</label>
        </form>
      ) : (
        <div>
          <p>
            you need to login first ! <a href="/">click here</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default CreatePlaylistForm;
