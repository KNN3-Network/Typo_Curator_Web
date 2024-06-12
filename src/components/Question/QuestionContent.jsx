import { useState, useCallback, useEffect, Fragment } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

// import BackIcon from "@/components/Icons/Back";
import QuestionHeader from "@/components/Question/QuestionHeader"; // Import custom component for displaying the question header
import QuestionTitle from "@/components/Question/QuestionTitle"; // Import custom component for displaying the question title
import QuestionAnswer from "@/components/Question/QuestionAnswer"; // Import custom component for displaying the question and answers

export default function QuestionContent() {
	return (
		<VStack className="question" w="100vw" h="full" px="20px" spacing={1}>
			<audio
				id="audio-element" // Audio element to play sounds, identified by ID for manipulation
				src="https://img.tukuppt.com/newpreview_music/01/59/42/638418ec7d7ac33.mp3" // Source URL of the audio file
			/>
			<QuestionHeader /> // Render the QuestionHeader component at the top of the stack
			<VStack
				position="relative" // Use relative positioning for layout control
				w="full" // Full width of the parent container
				h="full" // Full height of the parent container
				sx={{
					"::-webkit-scrollbar": {
						display: "none", // Hide the scrollbar for this element on WebKit browsers
					},
				}}
			>
				<QuestionTitle /> // Render the QuestionTitle component
				<QuestionAnswer /> // Render the QuestionAnswer component to handle displaying and interacting with answers
			</VStack>
		</VStack>
	);
}
