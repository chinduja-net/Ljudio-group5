import React, { useContext, useRef, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { SearchContext } from "../context/SongProvider"

import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import HomeIcon from "@mui/icons-material/Home"
import SearchIcon from "@mui/icons-material/Search"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import Paper from "@mui/material/Paper"

function BottomNavLinks() {
	const { linkTagsValue, setLinkTagsValue } = useContext(SearchContext)
	const ref = useRef(null)
	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
    
    // ! Infinite loop here. Look into react router dom history.listen() or similar alternatives
    // // Home page
		// if (location.pathname === "/") {
		// 	setLinkTagsValue(0)
		// }
		// if (linkTagsValue === 0) {
		// 	history.push("/")
		// }

    // // Searchresults page
		// if (location.pathname === "/searchResults") {
		// 	setLinkTagsValue(1)
		// }
		// if (linkTagsValue === 1) {
		// 	history.push("/searchResults")
		// }

    // // Library page
		// if (location.pathname === "/library") {
		// 	setLinkTagsValue(2)
		// }
		// if (linkTagsValue === 2) {
		// 	history.push("/library")
		// }
	}, [linkTagsValue])

	return (
		<Box sx={{ pb: 7 }} ref={ref}>
			<CssBaseline />
			<Paper
				sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={linkTagsValue}
					onChange={(event, newValue) => {
						console.log("new", newValue)
						setLinkTagsValue(newValue)
					}}
				>
					<BottomNavigationAction
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: "rgba(0, 0, 0, 0.6);",
						// 	},
						// }}
						label="Home"
						icon={<HomeIcon />}
					/>
					<BottomNavigationAction
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: "rgba(0, 0, 0, 0.6);",
						// 	},
						// }}
						label="Search"
						icon={<SearchIcon />}
					/>
					<BottomNavigationAction
						// sx={{
						// 	"&.Mui-selected": {
						// 		color: "rgba(0, 0, 0, 0.6);",
						// 	},
						// }}
						label="Library"
						icon={<LibraryMusicIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	)
}

export default BottomNavLinks
