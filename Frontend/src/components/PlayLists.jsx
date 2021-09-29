import React, { useState, useEffect, useContext } from "react"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

import { Button, Container, Typography } from "@mui/material"

import { showUserPlaylistsFetch, isLoggedIn } from "../services/authService"
import { SearchContext } from "../context/SongProvider"
import CreatePlaylistForm from "./CreatePlaylistForm"

function PlayLists() {
	const { playlistsState, setPlaylistsState } = useContext(SearchContext)
	const [renderCreateButton, setRenderCreateButton] = useState(true)

	function createPlayList() {
		setRenderCreateButton(false)
	}

	async function fetchOnMountIfLoggedIn() {
		const data = await isLoggedIn()
		if (data.loggedIn === true) {
			let playlists = await showUserPlaylistsFetch()
			setPlaylistsState(playlists)
		}
	}

	useEffect(fetchOnMountIfLoggedIn, [])

	return (
		<Container maxWidth="xs" sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 5
		}}>
			{renderCreateButton ? (
				<Button
					variant="outlined"
					onClick={createPlayList}
					startIcon={<AddOutlinedIcon />}
				>
					Create Playlist
				</Button>
			) : (
				<CreatePlaylistForm setRenderCreateButton={setRenderCreateButton} />
			)}
			<Container>
				{playlistsState
					? playlistsState.map(({ playlistName, id }, index) => {
							return (
								<Typography key={`${id}${index}`}>
									{playlistName}
								</Typography>
							)
					  })
					: null}
			</Container>
		</Container>
	)
}

export default PlayLists
