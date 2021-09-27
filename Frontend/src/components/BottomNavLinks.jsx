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

	// Run once on mount to set initial linkTagsValue for proper rendering in the nav
	useEffect(() => {
		if (location.pathname === "/") {
			setLinkTagsValue(0)
		} else if (location.pathname === "/searchResults") {
			setLinkTagsValue(1)
		} else if (location.pathname === "/playlists") {
			setLinkTagsValue(2)
		}
	}, [])

	// Run every time linkTagsValue change and history changes
	// Why? - To update pages across the app with the proper link tag value
	useEffect(() => {
		// ! This is poorly optimized, it runs some of the selections several times / Joel
		// Change url based on click value from bottom nav
		if (linkTagsValue === 0 && location.pathname !== "/") {
			history.push("/")
		} else if (
			linkTagsValue === 1 &&
			location.pathname !== "/searchResults"
		) {
			history.push("/searchResults")
		} else if (linkTagsValue === 2 && location.pathname !== "/playlists") {
			history.push("/playlists")
		}

		// Change the state value that handles the highlighting of the nav tags
		history.listen((location) => {
			if (location.pathname === "/") {
				setLinkTagsValue(0)
			}
			if (location.pathname === "/searchResults") {
				setLinkTagsValue(1)
			}
			if (location.pathname === "/playlists") {
				setLinkTagsValue(2)
			}
		})
	}, [linkTagsValue, history])

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
						setLinkTagsValue(newValue)

						// historyOld.listen()
						// onRouteChanged()

						// Home page
						// if (newValue === 0) {
						// 	if (location.pathname === "/" && linkTagsValue !== 0) {
						// 		setLinkTagsValue(0)
						// 	}
						// 	if (linkTagsValue === 0 && location.pathname !== "/") {
						// 		history.push("/")
						// 	}
						// }

						// // Searchresults page
						// if (newValue === 1) {
						// 	if (
						// 		location.pathname === "/searchResults" &&
						// 		linkTagsValue !== 1
						// 	) {
						// 		setLinkTagsValue(1)
						// 	}
						// 	if (
						// 		linkTagsValue === 1 &&
						// 		location.pathname !== "/searchResults"
						// 	) {
						// 		history.push("/searchResults")
						// 	}
						// }

						// // Library page
						// if (newValue === 2) {
						// 	if (
						// 		location.pathname === "/library" &&
						// 		linkTagsValue !== 2
						// 	) {
						// 		setLinkTagsValue(2)
						// 	}
						// 	if (
						// 		linkTagsValue === 2 &&
						// 		location.pathname !== "/library"
						// 	) {
						// 		history.push("/library")
						// 	}
						// }
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
						label="Playlists"
						icon={<LibraryMusicIcon />}
					/>
				</BottomNavigation>
			</Paper>
		</Box>
	)
}

export default BottomNavLinks
