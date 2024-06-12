import React, { useState } from "react";
import { HStack, Text, VStack, Image, Badge } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Cell, ConfigProvider } from "react-vant";
import useBack from "@/hooks/useBack";

import PlayLight from "@/assets/images/play-light.svg";

const Games = () => {
	const navigate = useNavigate(); // Hook to navigate programmatically
	const bb = useBack(); // Custom hook to handle back button behavior
	const themeVars = {
		cellBackgroundColor: "#fff", // Theme variables for react-vant components
	};

	useEffect(() => {
		bb?.show(); // Show the custom back button
		bb?.on("click", () => {
			navigate(-1); // Navigate back on back button click
			bb?.hide(); // Hide the custom back button
		});
	}, [bb]); // Effect runs when bb changes

	return (
		<VStack h="100vh" w="100vw" py="20px" bg="#ebedf1" color="#000">
			<HStack alignItems="center" spacing={2} my="10px" pos="relative">
				<Image src={PlayLight} boxSize={6} /> {/* Play icon */}
				<Text fontWeight="600" mb={2}>
					TypoCurator Game Platform
				</Text>
				<Badge
					pos="absolute"
					right="-45px"
					top="-12px"
					borderRadius="6px"
					boxShadow="md"
					color="#fff"
					w="40px"
					h="18px"
					fontSize="12px"
					textAlign="center"
					bg="var(--green-grad, linear-gradient(92deg, #487C7E 0%, #004D50 99.5%));"
				>
					beta {/* Badge indicating beta version */}
				</Badge>
			</HStack>
			<ConfigProvider themeVars={themeVars} style={{ width: "100%" }}>
				<Cell
					center
					title="Press and hold"
					label="Press and hold for 10 seconds"
					icon={
						<Image
							boxSize={10}
							src="/game/press.png"
							mr={3}
							borderRadius="full"
						/>
					}
					onClick={() => navigate(`/games/press`)} // Navigate to "Press and hold" game
					isLink
				/>
				<Cell
					center
					title="Kill the king"
					label="Kill King Trost"
					icon={
						<Image
							boxSize={10}
							borderRadius="full"
							src="/game/killking.png"
							mr={3}
						/>
					}
					onClick={() => navigate(`/games/killTheKing`)} // Navigate to "Kill the king" game
					isLink
				/>
			</ConfigProvider>
		</VStack>
	);
};

export default Games;
