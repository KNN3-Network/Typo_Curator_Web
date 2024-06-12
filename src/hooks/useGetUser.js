import { useBoolean, useToast } from "@chakra-ui/react"; // Import hooks from Chakra UI
import api from "@/api"; // Import API utility
import { useUserStore } from "@/store/user"; // Import user store hook

export default function useGetUser() {
	const toast = useToast(); // Hook to show toast notifications
	const {
		token,
		setScore,
		setToken,
		setUserId,
		setTGId,
		setUserName,
		setName,
		setTonAddress,
		setEvmAddress,
		setLng,
		setIsFirstClaim,
	} = useUserStore(); // Destructure user-related setters from user store

	// Function to get user information from the API
	const getUser = async (accessToken) => {
		try {
			const params = accessToken && {
				headers: {
					authorization: `Bearer ${accessToken || token}`, // Set authorization header with access token or stored token
				},
			};
			const res = await api.get("/user/info", params); // Make API request to get user info

			if (res?.code === 200) {
				// Update user store with the received data
				setToken(accessToken || token); // Set token
				setUserId(res?.data?.id); // Set user ID
				setTGId(res?.data?.tg_id); // Set Telegram ID
				setUserName(res?.data?.username); // Set username
				setTonAddress(res?.data?.ton_address); // Set TON address
				setEvmAddress(res?.data?.evm_address); // Set EVM address
				setLng(res?.data?.language_code || "en"); // Set language code, default to "en"
				setName(res?.data?.first_name + " " + res?.data?.last_name); // Set full name
				setScore(res?.data?.score || 0); // Set user score
				setIsFirstClaim(res?.data?.is_first_claimed || 1); // Set first claim status
			}
		} catch (err) {
			toast({
				status: "error",
				title: err.message, // Show error message in a toast notification
			});
		}
	};

	return {
		getUser, // Return the getUser function
	};
}
