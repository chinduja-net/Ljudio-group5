import React, { useContext } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.css"
import MiniPlayer from "./components/MiniPlayer"
import Player from "./components/Player"
import { SearchContext } from "./context/SongProvider"

import Routes from "./routes/Index"

function App() {
	const { ytPlayer } = useContext(SearchContext)
	return (
		<>
			<Router>
      {/* onLoad={ytPlayer.onPlayerLoad} */}
				<Player  />
				<Routes />
				<MiniPlayer />
			</Router>
		</>
	)
}

export default App
