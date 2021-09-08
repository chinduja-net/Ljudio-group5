import React from "react"
import "./App.css"

import SearchBar from "./components/SearchBar"
import SearchResults from "./routes/SearchResults"

function App() {
	return (
		<div className="App">
			<SearchBar />
			<SearchResults />
		</div>
	)
}

export default App
