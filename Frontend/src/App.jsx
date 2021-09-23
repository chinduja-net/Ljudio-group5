import React, { useContext } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.css"
import { SearchContext } from "./context/SongProvider"
import Routes from "./routes/Index"

import MiniPlayer from "./components/MiniPlayer"
import YoutubePlayer from "./components/YoutubePlayer"

function App() {
	const { ytPlayerState } = useContext(SearchContext)
	return (
		<>
			<Router>
				<div>{ytPlayerState}</div>
				<YoutubePlayer />
				<Routes />
				<MiniPlayer />
			</Router>
		</>
	)
}

export default App
