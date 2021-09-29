import React, { useState, useContext } from "react"
import {
	showUserPlaylistsFetch,
	createPlaylistFetch,
	isLoggedIn,
} from "../services/authService"

import { SearchContext } from "../context/SongProvider"

function CreatePlaylistForm({setRenderCreateButton}) {
	const { setPlaylistsState } = useContext(SearchContext)
	const [playlistName, setPlaylistName] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		createPlaylist(playlistName)
	}

	async function fetchOnMountIfLoggedIn() {
		const data = await isLoggedIn()
		if (data.loggedIn === true) {
			let playlists = await showUserPlaylistsFetch()
			setPlaylistsState(playlists)
		}
	}

	async function createPlaylist(playlistName) {
		const obj = {
			playlistName,
		}
		try {
			const data = await createPlaylistFetch(obj)
			if (data) {
				console.log(data)
				await fetchOnMountIfLoggedIn()
				setRenderCreateButton(true)
			}
		} catch (error) {
			console.log(error)
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
	)
}

export default CreatePlaylistForm
