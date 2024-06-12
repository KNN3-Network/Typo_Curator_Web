import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	VStack,
	HStack,
	Text,
	Flex,
	Progress,
	Image,
	Icon,
	useToast,
	useBoolean,
} from "@chakra-ui/react";
import api from "@/api";
import { useUserStore } from "@/store/user";
import QuestionResult from "@/components/Question/QuestionResult";
import useFeedback from "@/hooks/useFeedback";
import { formatQuestion } from "@/utils/common";
import useGetQ from "@/hooks/useGetQ";
import { LuRefreshCcw } from "react-icons/lu";

export default function QuestionAnswer() {
	const toast = useToast(); // Use Chakra UI's toast for notifications
	const [answerIndex, setAnswerIndex] = useState(""); // State for tracking user's answer selection
	const [isLoading, setIsLoading] = useBoolean(false); // State for loading status to manage UI during API calls
	const [visible, setVisible] = useBoolean(false); // State for controlling the visibility of result modal
	const { vibrate, notification } = useFeedback(); // Custom hook for handling vibrations and notifications
	const { question, setQuestion } = useUserStore(); // Using context to get and set the current question
	const [score, setScore] = useState(0); // State to track user's score
	const { getQ } = useGetQ(); // Custom hook to fetch a new question

	// Function to handle playback of audio feedback
	const playAudio = () => {
		const audioElement = document.getElementById("audio-element");
		audioElement.play();
	};

	// Function to handle the submission of an answer
	const submit = async (index) => {
		try {
			if (isLoading) {
				return; // Prevent multiple submissions while loading
			}
			setIsLoading.on(); // Set loading true
			const res = await api.post(`/question/submit`, {
				id: question?.id,
				answ: question?.ans[index] || "",
			});

			if (res?.code === 200) {
				if (!res?.data?.next) {
					setScore(res?.data?.score || 0); // Update the score if it's the last question
					setVisible.on(); // Show the results
					notification("success"); // Notify success
					playAudio(); // Play success audio
				} else {
					const q = formatQuestion(res?.data?.next || {}); // Format the next question
					setQuestion(q); // Set the next question
				}
			} else {
				getQ(); // Fetch a new question if submission fails
			}
			setAnswerIndex(""); // Reset the answer index
			setIsLoading.off(); // Set loading false
		} catch (err) {
			console.error(err);
			setAnswerIndex("");
			setIsLoading.off();
			getQ(); // Fetch a new question on error
			toast({
				status: "error",
				title: err.message, // Show error message
			});
		}
	};

	useEffect(() => {
		getQ(); // Initially fetch a question when component mounts
	}, []);

	return (
		<Box w="full">
			<VStack w="full" mt="15px" mb={5} spacing={5}>
				{question?.ans?.map((item, index) => {
					// Map through answers and display them
					return (
						<Flex
							key={index}
							w="full"
							h={question?.tag === "question-dapp" ? "75px" : "95px"}
							px="20px"
							alignItems="center"
							cursor="pointer"
							className={
								answerIndex === index ? "answer answer-active" : "answer"
							}
							borderRadius={6}
							fontWeight="600"
							lineHeight="22px"
							fontSize={question?.tag === "question-dapp" ? "16px" : "15px"}
							bg={answerIndex === index ? "#C7EFAA!" : ""}
							onClick={() => {
								setAnswerIndex(index);
								vibrate("heavy"); // Trigger vibration on selection
								submit(index); // Submit the selected answer
							}}
						>
							<Text
								w="full"
								textAlign={
									question?.tag === "question-dapp" ? "center" : "left"
								}
							>
								{item}
							</Text>
						</Flex>
					);
				})}
				{!question?.title && (
					// Display refresh option if there is no title (i.e., no current question)
					<HStack onClick={() => getQ()} mt={5} cursor="pointer">
						<Icon as={LuRefreshCcw} boxSize={5} />
						<Text fontWeight="600" fontSize="16px">
							Refresh
						</Text>
					</HStack>
				)}
			</VStack>
			<QuestionResult visible={visible} score={score} setVisible={setVisible} />
		</Box>
	);
}
