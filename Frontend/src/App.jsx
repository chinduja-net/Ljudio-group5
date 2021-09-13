import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "./App.css"

import Routes from "./routes/Index"

function App() {
	return (
		<Router>
			<Routes />
		</Router>
	)
}

export default App
