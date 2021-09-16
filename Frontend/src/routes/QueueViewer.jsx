import React, { useContext, useEffect } from "react"

import { SearchContext } from "../context/SongProvider"

function QueueViewer() {
	const { currentSong, queueSongs } = useContext(SearchContext)

	return (
		<div>
			{/* <button className={hideBtn}>Icon</button> */}
			<h2>Now Playing</h2>
			{currentSong ? (
				<div className="currentSong">
					<img src={currentSong.thumbnails[1].url} alt="song thumbnail" />
					<div>
						<h3>{currentSong.name}</h3>
						<h4>{currentSong.artist}</h4>
					</div>
				</div>
			) : null}

			{queueSongs ? (
				<>
					<div>
						<h2>Next in queue</h2>
						<button className="clearQueue">Clear</button>
					</div>
					<div className="songListContainer">
						<div className=""></div>
					</div>{" "}
				</>
			) : null}

			{/* <h2>Next from: Playlist</h2>
			<div className="songListContainer">
				<div className=""></div>
			</div>*/}
		</div>
	)
}

export default QueueViewer
