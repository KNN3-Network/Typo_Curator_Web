import { useBoolean, useToast } from "@chakra-ui/react"; // Import hooks from Chakra UI
import api from "@/api"; // Import API utility
import { formatQuestion } from "@/utils/common"; // Import utility function to format questions
import { useUserStore } from "@/store/user"; // Import user store hook

export default function useGetQ() {
	const toast = useToast(); // Hook to show toast notifications
	const [loading, setLoading] = useBoolean(false); // State to track loading status
	const { setQuestion } = useUserStore(); // Hook to set question in user store

	// Function to get a question from the API
	const getQ = async (accessToken) => {
		try {
			if (loading) {
				return; // Prevent multiple simultaneous requests
			}

			setLoading.on(); // Set loading state to true
			const params = accessToken && {
				headers: {
					authorization: `Bearer ${accessToken}`, // Set authorization header if accessToken is provided
				},
			};
			const res = await api.get("/question", params); // Make API request to get a question

			if (res?.code === 200) {
				const q = formatQuestion(res?.data?.question || {}); // Format the received question
				setQuestion(q); // Set the question in the user store
			}
			setLoading.off(); // Set loading state to false
		} catch (err) {
			setLoading.off(); // Set loading state to false on error
			toast({
				status: "error",
				title: err.message, // Show error message in a toast notification
			});
		}
	};

	return {
		getQ, // Return the getQ function
		loading, // Return the loading state
	};
}
