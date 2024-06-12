import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	HStack,
	Flex,
	Input,
	VStack,
	Text,
	Button,
	useToast,
	Image,
	useBoolean,
	Avatar,
	Icon,
	Link,
} from "@chakra-ui/react";
import { PiNotepad } from "react-icons/pi";
import { useUserStore } from "@/store/user";
import Screen from "@/components/Screen";
import {
	useTonConnectModal,
	useTonAddress,
	useTonConnectUI,
} from "@tonconnect/ui-react";
import { toShortAddress } from "@/utils/common";
import { useNavigate, useParams } from "react-router-dom";
import useBack from "@/hooks/useBack";
import api from "@/api";
import useGetUser from "@/hooks/useGetUser";
import { Popup, Cell, ConfigProvider } from "react-vant";
import moment from "moment";
import config from "@/config";
import { useAppStore } from "@/store/app";

import walletImg from "@/assets/images/wallet.jpeg";
import Achievements1 from "@/assets/images/achievements-1.png";
import Achievements2 from "@/assets/images/achievements-2.png";
import Achievements3 from "@/assets/images/achievements-3.png";
// import Achievements4 from "@/assets/images/achievements-4.svg";

let index = 0;
export default function Profile() {
	const navigate = useNavigate(); // Hook to navigate programmatically
	const toast = useToast(); // Hook to show toast notifications
	const bb = useBack(); // Custom hook for handling back button
	const { getUser } = useGetUser(); // Custom hook to get user information
	const { theme } = useAppStore(); // Access theme from app store

	const [visible, setVisible] = useBoolean(false); // State to control popup visibility
	const [isLoading, setIsLoading] = useBoolean(false); // State to manage loading status
	const [isTransfering, setIsTransfering] = useBoolean(false); // State to manage transferring status
	const { name, score, ton_address, setTonAddress } = useUserStore(); // Destructure necessary states from user store
	const [amount, setAmount] = useState(0); // State to track amount for withdrawal
	const { state, open, close } = useTonConnectModal(); // Hooks for TON Connect modal
	const [stat, setStat] = useState({}); // State to store user statistics
	const [history, setHistory] = useState([]); // State to store withdrawal history

	const [tonConnectUI] = useTonConnectUI();
	const userFriendlyAddress = useTonAddress(); // Get user-friendly TON address

	// Function to disconnect TON wallet
	const onDisconnect = async () => {
		await tonConnectUI.disconnect();
	};

	// Function to get user statistics
	const getStatic = async () => {
		if (index === 0) {
			index++;
			const res = await api.get(`/user/statistic`);
			if (res?.code === 200) {
				setStat(res.data);
			}
		}
	};

	// Function to bind TON address
	const bindAddress = async () => {
		const res = await api.post(`/user/bind/address`, {
			ton_address: userFriendlyAddress,
		});

		if (res.code === 200) {
			toast({
				status: "success",
				title: "Bind address success",
			});
		}

		setTonAddress(userFriendlyAddress);
	};

	// Function to handle amount input change
	const handleChange = (event) => {
		const value = event.target.value;
		setAmount(value);
	};

	// Function to withdraw amount
	const withdraw = async () => {
		if (amount < 10) {
			toast({
				status: "warning",
				title: "Enter an integer greater than 10",
			});
			return;
		}
		setIsLoading.on();
		try {
			const res = await api.post(`/user/withdrawal`, {
				amount: Number(amount),
			});

			if (res.code === 200) {
				await getUser();
				toast({
					status: "success",
					title: "Withdraw success",
				});
			} else {
				toast({
					status: "error",
					title: res?.data.errorMsg || "Withdraw Error",
				});
			}
			setIsTransfering.off();
			setIsLoading.off();
		} catch (error) {
			setIsTransfering.off();
			setIsLoading.off();
			toast({
				status: "error",
				title: err.message,
			});
		}
	};

	// Function to get withdrawal history
	const getHistory = async () => {
		const res = await api.get(`/user/withdrawal/list`, {
			params: {
				pageNumber: 1,
				pageSize: 9999,
			},
		});
		if (res?.code === 200) {
			setHistory(res.data?.withdrawal || []);
		}
	};

	useEffect(() => {
		if (userFriendlyAddress) {
			bindAddress();
			setIsLoading.off();
		}
	}, [userFriendlyAddress]);

	useEffect(() => {
		bb?.show();
		bb?.on("click", () => {
			navigate("/");
			bb?.hide();
		});
	}, [bb]);

	useEffect(() => {
		getUser();
		getStatic();
		getHistory();
	}, []);

	return (
		<Screen>
			<VStack w="full" h="full" justify="flex-end">
				<Box
					w="full"
					h="96%"
					p="25px"
					className="bg-card"
					borderTopRadius="24px"
					overflowY="scroll"
				>
					<Flex pt="3" justify="space-between" alignItems="center">
						<HStack>
							<Avatar name={name} size="sm" borderRadius="full" />
							<Text fontWeight="600">{name}</Text>
						</HStack>
						{ton_address ? (
							<HStack fontWeight="600">
								<Image src={walletImg} boxSize={6} borderRadius="full" />
								<Text>{toShortAddress(ton_address, 12)}</Text>
							</HStack>
						) : (
							<Button
								colorScheme="blue"
								size="sm"
								bg="rgb(1, 128, 255)"
								isLoading={isLoading}
								loadingText="Connecting"
								disabled={isLoading}
								leftIcon={
									<Image src={walletImg} boxSize={5} borderRadius="full" />
								}
								onClick={async () => {
									setIsLoading.on();
									open();
								}}
							>
								Link Wallet
							</Button>
						)}
					</Flex>
					<Box className="card-panel" mt="30px">
						<HStack w="full" justify="space-between">
							<Text onClick={setIsTransfering.off}>Rewards</Text>
							<Icon
								as={PiNotepad}
								boxSize={5}
								onClick={() => {
									setVisible.on();
									getHistory();
								}}
							/>
						</HStack>

						<HStack mt={2} fontWeight="600">
							{isTransfering ? (
								<Input
									value={amount}
									type="number"
									min={1}
									max={score}
									step={1}
									onChange={handleChange}
									onKeyDown={(event) => {
										if (event.key === ".") {
											event.preventDefault();
										}
									}}
									onInput={(e) => e.target.value.replace(/[^0-9]/g, "")}
									placeholder="Enter an integer greater than 10"
								/>
							) : (
								<Text fontSize="32px">{score}</Text>
							)}

							<Text fontSize="13px" mt={3}>
								$Tpx
							</Text>
						</HStack>
						<Button
							mt={4}
							mb={3}
							width="100%"
							borderRadius="10px"
							bg="#C7EFAA"
							height="40px"
							fontSize="16px"
							fontWeight="bold"
							opacity={isLoading ? "0.5" : "1"}
							cursor={isLoading ? "disabled" : "default"}
							isLoading={isLoading}
							isDisabled={isLoading || amount > score}
							loadingText="Signing in"
							onClick={async () => {
								if (!ton_address) {
									toast({
										status: "warning",
										title: "Please link wallet",
									});
								}
								if (isTransfering) {
									withdraw();
								} else {
									setAmount(score);
									setIsTransfering.on();
								}
							}}
						>
							{isTransfering ? "withdraw" : "Go to withdraw"}
						</Button>
					</Box>
					<Box className="card-panel" mt="30px">
						<Text>Achievements</Text>
						<Flex
							flexFlow="row wrap"
							rowGap={7}
							mt="20px"
							fontSize="13px"
							mb={3}
						>
							<VStack w="50%" textAlign="center" spacing={0}>
								<Box h="45px">
									<Image src={Achievements1} boxSize={10} />
								</Box>

								<Text fontSize="12px">QUIZ</Text>
								<Text fontWeight="600" fontSize="16px" mt={1}>
									{stat?.question_count || 0}
								</Text>
							</VStack>
							<VStack w="50%" textAlign="center" spacing={0}>
								<Box h="45px">
									<Image src={Achievements2} boxSize={10} />
								</Box>

								<Text fontSize="12px">ACCURACY</Text>
								<Text fontWeight="600" fontSize="16px" mt={1}>
									{stat?.accurate_ratio || 0}
								</Text>
							</VStack>
							<VStack
								w="50%"
								textAlign="center"
								justify="space-between"
								spacing={0}
							>
								<Box h="45px">
									<Image src={Achievements3} boxSize={10} />
								</Box>

								<Text fontSize="12px">$Tpx</Text>
								<Text fontWeight="600" fontSize="16px" mt={1}>
									{stat?.score || 0}
								</Text>
							</VStack>
							{/* <VStack w="50%" textAlign="center" spacing={0}>
								<Image src={Achievements4} boxSize={12} />
								<Text>准确率超60%</Text>
							</VStack> */}
						</Flex>
					</Box>
				</Box>
			</VStack>

			<Popup
				visible={visible}
				position="right"
				style={{ height: "100%", width: "85%" }}
				onClose={setVisible.off}
			>
				<Text pt={5} pl={4} className="title" fontWeight="600">
					History
				</Text>
				<VStack
					py={3}
					px={4}
					h="90%"
					className="title"
					spacing={3}
					alignItems="flex-start"
					overflowY="scroll"
				>
					{history.map((item) => {
						return (
							<Box
								w="full"
								key={item.id}
								boxShadow="0 2px 12px 0 rgba(0, 0, 0, 0.1)"
								borderWidth="1.5px"
								borderColor={theme === "dark" ? "#363636" : "#c6c6c6"}
								borderRadius={4}
								py={2}
								px={3}
							>
								<HStack w="full" justify="space-between" className="textColor">
									<Text fontWeight="600" fontSize="15px">
										Amount
									</Text>
									<Flex alignItems="flex-end" gap={1}>
										<Text fontWeight="600" fontSize="15px">
											{item.amount}
										</Text>
										<Text fontSize="13px">Tpx</Text>
									</Flex>
								</HStack>
								<HStack
									mt={1}
									w="full"
									justify="space-between"
									className="textColor"
									fontWeight="600"
								>
									<Text fontSize="15px">Status</Text>
									<Flex
										alignItems="center"
										gap={1}
										fontSize="13px"
										color={item.status === 0 ? "#396BF8" : "#24BD8F"}
									>
										<Box
											w="6px"
											h="6px"
											borderRadius="full"
											bg={item.status === 0 ? "#396BF8" : "#24BD8F"}
										/>
										<Text>
											{item.status === 0 ? "In progress" : "Complete"}
										</Text>
									</Flex>
								</HStack>
								<HStack
									mt={1}
									w="full"
									justify="space-between"
									className="textColor"
								>
									<Text fontSize="15px" fontWeight="600">
										Time
									</Text>
									<Flex alignItems="flex-end" gap={1} fontSize="13px">
										<Text>{moment(item.created_at).fromNow()}</Text>
									</Flex>
								</HStack>
								<HStack
									mt={1}
									w="full"
									justify="space-between"
									className="textColor"
								>
									<Text fontSize="15px" fontWeight="600">
										ID
									</Text>
									<Flex alignItems="flex-end" gap={1}>
										<Link
											target="_blank"
											fontSize="13px"
											color="#396BF8"
											textDecoration="underline"
											href={`${config.browser}/tx/${item?.hash}`}
										>
											{toShortAddress(item?.hash, 10)}
										</Link>
									</Flex>
								</HStack>
							</Box>
						);
					})}
				</VStack>
			</Popup>
		</Screen>
	);
}
