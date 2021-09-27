import React, { useState, useContext, useEffect } from "react"
import { SearchContext } from "../context/SongProvider"

import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"

const Widget = styled("div")(({ theme }) => ({
	padding: 16,
	borderRadius: 16,
	width: 343,
	maxWidth: "100%",
	margin: "auto",
	position: "relative",
	zIndex: 1,
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(0,0,0,0.6)"
			: "rgba(255,255,255,0.4)",
	backdropFilter: "blur(40px)",
}))

const TinyText = styled(Typography)({
	fontSize: "0.75rem",
	opacity: 0.38,
	fontWeight: 500,
	letterSpacing: 0.2,
})

function ProgressBar() {
	const { ytPlayer } = useContext(SearchContext)
	const theme = useTheme()
	const [duration, setDuration] = useState(0)
	const [position, setPosition] = useState(0)

	function formatDuration(value) {
		const minute = Math.floor(value / 60)
		const secondLeft = value - minute * 60
		return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`
	}

	useEffect(() => {
		setDuration(ytPlayer.player.playerInfo.duration)
		console.log(ytPlayer.player)
	}, [])

	// * change timestamp of audio player ytPlayer
	// player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void

	return (
		//   <div>
		//   {/* Slider */}
		//   <div>
		//     {/* currentTime */}
		//     {/* currentSong.duration */}
		//   </div>
		// </div>
		<div>
			<Widget>
				<Slider
					aria-label="time-indicator"
					size="small"
					value={position}
					min={0}
					step={1}
					max={duration}
					onChange={(_, value) => setPosition(value)}
					sx={{
						color:
							theme.palette.mode === "dark"
								? "#fff"
								: "rgba(0,0,0,0.87)",
						height: 4,
						"& .MuiSlider-thumb": {
							width: 8,
							height: 8,
							transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
							"&:before": {
								boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
							},
							"&:hover, &.Mui-focusVisible": {
								boxShadow: `0px 0px 0px 8px ${
									theme.palette.mode === "dark"
										? "rgb(255 255 255 / 16%)"
										: "rgb(0 0 0 / 16%)"
								}`,
							},
							"&.Mui-active": {
								width: 20,
								height: 20,
							},
						},
						"& .MuiSlider-rail": {
							opacity: 0.28,
						},
					}}
				/>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mt: -2,
					}}
				>
					<TinyText>{formatDuration(position)}</TinyText>
					<TinyText>-{formatDuration(duration - position)}</TinyText>
				</Box>
			</Widget>
		</div>
	)
}

export default ProgressBar