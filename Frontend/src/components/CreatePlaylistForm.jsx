import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { isLoggedIn } from "../services/authService";


function CreatePlaylistForm() {
   
 const [playlistName, setPlaylistName] = useState();
  const history = useHistory();

  function setName(e) {
    setPlaylistName(e.target.value);
    
  }

  return (
    <div>
      {isLoggedIn() ? (
        <form action="submit">
          <input name="playlistname" type="text" onChange={setName} />
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
