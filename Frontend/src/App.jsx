import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

import "./App.css"
import BottomNavLinks from "./components/BottomNavLinks"
import MiniPlayer from "./components/MiniPlayer"
import Routes from "./routes/Index"

function App() {
	return (
		<>
			<Router>
				<Routes />
				<MiniPlayer />
				<BottomNavLinks />
			</Router>
		</>
	)
}

export default App
