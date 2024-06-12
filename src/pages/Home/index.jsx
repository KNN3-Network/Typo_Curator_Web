import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	HStack,
	Flex,
	VStack,
	Text,
	Button,
	useToast,
	Image,
	Avatar,
	useBoolean,
} from "@chakra-ui/react";
import LogoIcon from "@/components/Icons/Logo";
import { useUserStore } from "@/store/user";
import api from "@/api";
import Screen from "@/components/Screen";
import TypoCurator from "@/components/base/TypoCurator";
import BaseModal from "@/components/base/BaseModal";
import { useNavigate, useParams } from "react-router-dom";
import { stringToJSON } from "@/utils/common";
import useGetUser from "@/hooks/useGetUser";
import { useAppStore } from "@/store/app";
import Intro from "@/components/Intro";

import PlayLight from "@/assets/images/play-light.svg";
import PlayDark from "@/assets/images/play-dark.svg";

let index = 0;
export default function Home() {
	const navigate = useNavigate(); // Hook to navigate programmatically
	const toast = useToast(); // Hook to show toast notifications
	const { getUser } = useGetUser(); // Custom hook to get user information
	const { theme } = useAppStore(); // Access theme from app store

	const [isLoading, setIsLoading] = useBoolean(false); // State to manage loading status
	const [showModal, setShowModal] = useBoolean(false); // State to control modal visibility
	const [visible, setVisible] = useBoolean(false); // State to control intro visibility
	const { userId, startParam, initDataRaw, name } = useUserStore(); // Destructure necessary states from user store

	// Function to insert share information if startParam is present
	const insertShare = async (accessToken) => {
		console.log("startParam", startParam, stringToJSON(startParam));
		if (startParam) {
			const params = stringToJSON(startParam);
			if (params?.nav === "press") {
				navigate(`/press`);
			}
			if (params?.qid) {
				await api.post(
					`/question/share`,
					{
						id: params?.qid,
					},
					{
						headers: {
							authorization: `Bearer ${accessToken}`,
						},
					}
				);
			}
		}
	};

	// Function to handle user sign in
	const signIn = async () => {
		try {
			if (index === 0) {
				index++;
				setIsLoading.on();

				const res1 = await api.post(`/auth/login`, {
					webAppInitData: initDataRaw,
				});

				const accessToken = res1?.data?.accessToken;

				if (accessToken) {
					await getUser(accessToken);
					await insertShare(accessToken);
					toast({
						status: "success",
						title: "Login Success!",
					});
				} else {
					toast({
						status: "error",
						title: "Login Failed!",
					});
				}
				setIsLoading.off();
			}
		} catch (err) {
			console.error(err);
			setIsLoading.off();
			toast({
				status: "error",
				title: err.message,
			});
		}
	};

	// Effect to sign in if initDataRaw is present
	useEffect(() => {
		if (initDataRaw) {
			signIn();
		}
	}, [initDataRaw]);

	// Effect to show intro modal if not shown before
	useEffect(() => {
		const isShow = localStorage.getItem("isShow");
		if (!isShow) {
			setVisible.on();
		}
	}, []);

	return (
		<Screen>
			<Box
				w="100%"
				h="100%"
				p="20px"
				display="flex"
				flexDirection="column"
				justify="center"
			>
				<Flex justify="space-between" alignItems="center" fontWeight="600">
					<HStack onClick={() => navigate(`/profile`)}>
						<Avatar name={name} size="sm" borderRadius="full" />
						<Text textDecoration="underline">{name}</Text>
					</HStack>
					<Text
						fontSize="14px"
						cursor="pointer"
						onClick={() => {
							setShowModal.on();
						}}
					>
						Rules
					</Text>
				</Flex>
				<VStack borderRadius="10px" padding="20px" my="40px" spacing={4}>
					<LogoIcon />
					<TypoCurator fontSize="30px" />
				</VStack>

				<Box width="100%" mt={2}>
					<VStack width="100%" h="full" fontWeight="semibold">
						<Button
							width="100%"
							borderRadius="50px"
							bg="#C7EFAA"
							height="45px"
							fontSize="16px"
							fontWeight="bold"
							opacity={isLoading ? "0.5" : "1"}
							cursor={isLoading ? "disabled" : "default"}
							isLoading={isLoading}
							disabled={isLoading}
							loadingText="Signing in"
							onClick={() => {
								if (userId) {
									navigate(`/question`);
								} else {
									signIn();
								}
							}}
						>
							{userId ? "Start Training" : "Log in"}
						</Button>
						<HStack
							alignItems="center"
							mt={3}
							className="title"
							onClick={() => {
								navigate(`/games`);
							}}
						>
							<Image
								src={theme === "dark" ? PlayDark : PlayLight}
								boxSize={6}
							/>
							<Text cursor="pointer">Game Center</Text>
						</HStack>
					</VStack>
				</Box>
				<BaseModal
					isOpen={showModal}
					onClose={() => {
						setShowModal.off();
					}}
					title="Rules"
				>
					<Box h="380px" overflowY="scroll" pt="20px">
						<Box className="rules" />
					</Box>
				</BaseModal>
				<Intro visible={visible} setVisible={setVisible} />
			</Box>
		</Screen>
	);
}
