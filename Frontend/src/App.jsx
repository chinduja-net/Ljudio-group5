import React from "react"
import "./App.css"

import SearchBar from "./components/SearchBar"
import SearchResults from "./Router/SearchResults"
import SearchProvider from "./context/SearchContext"

function App() {
	return (
		<div className="App">
			<SearchProvider>
				<SearchBar />
				<SearchResults />
			</SearchProvider>
		</div>
	)
}

export default App
