import React, { useState } from "react"
import {
	Box,
	Modal,
	IconButton,
	Backdrop,
	Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import FullscreenIcon from "@mui/icons-material/Fullscreen"

const Certificate = ({ ImgSertif }) => {
	const [open, setOpen] = useState(false)

	return (
		<Box sx={{ width: "100%" }}>
			{/* ===== THUMBNAIL ===== */}
			<Box
				onClick={() => setOpen(true)}
				sx={{
					position: "relative",
					width: "100%",
					aspectRatio: "4 / 3", // 🔥 SEMUA UKURAN DISAMAIN
					overflow: "hidden",
					borderRadius: 2,
					cursor: "pointer",
					boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
					transition: "all 0.3s ease",
					"&:hover": {
						transform: "translateY(-6px)",
						boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
						"& .overlay": { opacity: 1 },
						"& img": {
							transform: "scale(1.05)",
							filter: "brightness(1) contrast(1.1)",
						},
					},
				}}
			>
				{/* Image */}
				<img
					src={ImgSertif}
					alt="Certificate"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover", // 🔑 KUNCI UKURAN SAMA
						transition: "all 0.4s ease",
						filter: "brightness(0.9) contrast(1.05)",
					}}
				/>

				{/* Overlay */}
				<Box
					className="overlay"
					sx={{
						position: "absolute",
						inset: 0,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(0,0,0,0.55)",
						opacity: 0,
						transition: "opacity 0.3s ease",
						color: "#fff",
						zIndex: 2,
					}}
				>
					<FullscreenIcon sx={{ fontSize: 42, mb: 1 }} />
					<Typography fontWeight={600}>
						Lihat Sertifikat
					</Typography>
				</Box>
			</Box>

			{/* ===== MODAL ===== */}
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
					sx: {
						backgroundColor: "rgba(0,0,0,0.9)",
						backdropFilter: "blur(6px)",
					},
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						position: "relative",
						maxWidth: "90vw",
						maxHeight: "90vh",
						outline: "none",
					}}
				>
					{/* Close Button */}
					<IconButton
						onClick={() => setOpen(false)}
						sx={{
							position: "absolute",
							top: 16,
							right: 16,
							zIndex: 10,
							color: "#fff",
							backgroundColor: "rgba(0,0,0,0.6)",
							"&:hover": {
								backgroundColor: "rgba(0,0,0,0.8)",
								transform: "scale(1.1)",
							},
						}}
					>
						<CloseIcon />
					</IconButton>

					{/* Full Image */}
					<img
						src={ImgSertif}
						alt="Certificate Full View"
						style={{
							display: "block",
							maxWidth: "100%",
							maxHeight: "90vh",
							objectFit: "contain",
						}}
					/>
				</Box>
			</Modal>
		</Box>
	)
}

export default Certificate