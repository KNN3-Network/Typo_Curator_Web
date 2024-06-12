import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	VStack,
	Text,
	Flex,
	Image,
	Button,
	useToast,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/user"; // Hook to access user store
import { Progress } from "react-vant"; // Progress component from react-vant library

export default function QuestionTitle() {
	const { question } = useUserStore(); // Access the current question from the user store

	return (
		<>
			<Flex w="full" justify="space-between">
				<Text fontWeight="600" fontSize="18px">
					{question?.title || "Request Content Error"} // Display the question title or an error message
				</Text>
			</Flex>
			<Box w="full" mt="15px">
				<Progress
					style={{ marginBottom: 20 }} // Styling for the progress bar
					trackColor="#353535" // Color of the progress track
					color="#C7EFAA" // Color of the progress indicator
					textColor="#000" // Color of the text inside the progress bar
					strokeWidth={5} // Width of the progress bar stroke
					percentage={parseFloat(((question?.seq || 1) / 20) * 100).toFixed(0)} // Calculate and display progress percentage
				/>
			</Box>
		</>
	);
}
