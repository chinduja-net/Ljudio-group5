import React from "react"
import SearchBar from "../components/SearchBar"
import PlayLists from "../components/PlayLists"
import SignupModal from "../components/SignupModal"
import LoginModal from "../components/LoginModal"

import { Container } from "@mui/material"
import { Box } from "@mui/system"

function Home() {
	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
			>
				<SignupModal />
				<LoginModal />
			</Box>
			<SearchBar />
			<PlayLists />
		</Container>
	)
}

export default Home
