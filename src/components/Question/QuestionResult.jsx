import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	VStack,
	Icon,
	HStack,
	Image,
	Button,
	useToast,
	Text,
	useBoolean,
} from "@chakra-ui/react";
import { shareToTelegram, shareOnTwitter } from "@/utils/common";
import { LuShare2 } from "react-icons/lu";
import { Popup, Cell, ConfigProvider } from "react-vant";
import { useNavigate, useParams } from "react-router-dom";
import useGetQ from "@/hooks/useGetQ";
import { useUserStore } from "@/store/user";

export default function QuestionResult({ visible, score, setVisible }) {
	const toast = useToast(); // Hook to show toast notifications
	const navigate = useNavigate(); // Hook to navigate programmatically
	const { getQ } = useGetQ(); // Custom hook to fetch a new question
	const [tpx, setTpx] = useState(0); // State to track rewards
	const { isFirstClaim, setIsFirstClaim } = useUserStore(); // State management from user store

	useEffect(() => {
		if (isFirstClaim === 0) {
			setTpx(10 + score); // Initial reward calculation
			setIsFirstClaim(1); // Mark first claim as done
		} else {
			setTpx(score); // Subsequent reward calculation
		}
	}, [isFirstClaim, score]); // Effect depends on isFirstClaim and score

	console.log(tpx); // Log the current reward points

	return (
		<>
			<Popup
				visible={visible} // Control visibility of the popup
				position="right" // Position the popup to the right
				closeOnClickOverlay={false} // Do not close on overlay click
				style={{ height: "100%", width: "100%" }} // Fullscreen popup style
				onClose={setVisible.off} // Close the popup when triggered
			>
				<VStack pt={12} className="title" spacing={2}>
					<Box
						className={tpx == 0 ? "result-over" : "result-img"} // Conditional class based on rewards
						w="full"
						h="160px"
						mb="10px"
						bgSize="auto 100%"
					/>
					{tpx == 0 && (
						<Text fontSize="20px" fontWeight="600">
							Exhaustion! // Message when no rewards
						</Text>
					)}
					<Text fontSize="16px" fontWeight="600" textAlign="center">
						{tpx == 0
							? "Sorry! Unexpected actions triggered the anti-cheating system" // Message for anti-cheating
							: `Rewards: ${tpx} $Tpx`} // Display the reward points
					</Text>
					<Text fontSize="xs" className="textColor">
						{tpx == 0
							? "Too tired? Take a break and start the next round!" // Suggestion for taking a break
							: "You have enhanced our model!" // Acknowledgement of contribution
					</Text>
				</VStack>
				<Box w="full" pos="absolute" bottom="30px" px="25px">
					<Button
						width="100%"
						borderRadius="50px"
						bg="#C7EFAA"
						height="45px"
						mb={5}
						fontSize="16px"
						fontWeight="bold"
						cursor="pointer"
						onClick={() => {
							navigate(`/profile`); // Navigate to profile page
						}}
					>
						Check my rewards!
					</Button>
					<Button
						width="100%"
						borderRadius="50px"
						bg="#C7EFAA"
						height="45px"
						fontSize="16px"
						fontWeight="bold"
						cursor="pointer"
						onClick={() => {
							getQ(); // Fetch a new question
							setVisible.off(); // Close the popup
						}}
					>
						Continue // Button to continue to the next question
					</Button>
				</Box>
			</Popup>
		</>
	);
}
