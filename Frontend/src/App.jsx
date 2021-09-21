import React, { useContext } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.css"
import YoutubePlayer from "./components/YoutubePlayer"
import { SearchContext } from "./context/SongProvider"
import Routes from "./routes/Index"

function App() {
	const { ytPlayerState } = useContext(SearchContext)
	return (
		<>
			<Router>
				<div>{ytPlayerState}</div>
				<YoutubePlayer />
				<Routes />
			</Router>
		</>
	)
}

export default App
