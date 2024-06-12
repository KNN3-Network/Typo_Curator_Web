import { useState, useCallback, useEffect, Fragment } from "react";
import {
	Box,
	VStack,
	HStack,
	Text,
	Icon,
	useToast,
	useBoolean,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/user";
import { shareToTelegram, shareOnTwitter } from "@/utils/common"; // Utility functions for social sharing
import { LuShare2 } from "react-icons/lu";
import { ShareSheet, Cell } from "react-vant";
import BaseModal from "@/components/base/BaseModal";
import { useClipboard } from "@chakra-ui/react";
import api from "@/api";
import config from "@/config"; // Configuration file for global settings

export default function QuestionHeader() {
	const toast = useToast(); // Hook to show toast notifications
	const [showModal, setShowModal] = useBoolean(false); // State to control modal visibility
	const [visible, setVisible] = useBoolean(false); // State to control sharesheet visibility
	const { onCopy, value, setValue, hasCopied } = useClipboard(); // Hook to manage clipboard operations
	const { question } = useUserStore(); // Access question data from global state

	console.log("config", config); // Log current configuration settings

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 100) + 1;
		if (randomNumber <= 10) {
			setVisible.on(); // Show share sheet based on a random condition
			setValue(`${config.appUrl}?startapp=qid_${question?.id}`); // Set shareable link to clipboard
		}
	}, [question]); // Effect runs when question changes

	const options = [
		{ name: "Telegram", icon: "https://web.telegram.org/a/favicon.svg" },
		{
			name: "Twitter",
			icon: "https://typography.staging.knn3.xyz/images/twitter.svg",
		},
		{ name: "Copy Link", icon: "link" },
	]; // Options for the ShareSheet component

	const shareLog = async () => {
		await api.post(`/user/share/log`, {
			id: question?.id,
		}); // Log share activity in the backend
	};

	return (
		<>
			<HStack w="full" justify="space-between" h="60px" pt="10px">
				<Box className="top-logo" onClick={() => setShowModal.on()} />
				<HStack alignItems="center" spacing={3}>
					<HStack spacing={0}>
						<Box className="top-people" w="50px" h="20px" bgSize="auto 15px" />
						{question?.answ_count > 4 && (
							<Text className="textColor" fontSize="15px" fontWeight="600">
								+{question?.answ_count}
							</Text>
						)}
					</HStack>
					<Icon
						cursor="pointer"
						onClick={() =>
							shareToTelegram(
								config.appUrl,
								"Join us to solve AI labeling puzzles, and earn $TPX on TypoCurator"
							)
						}
						as={LuShare2}
						boxSize={5}
					/>
				</HStack>
			</HStack>
			<ShareSheet
				visible={visible}
				options={options}
				overlay={true}
				cancelText="Cancel"
				title={
					<VStack pt={2} className="title" spacing={2}>
						<Box className="help-img" w="full" h="120px" bgSize="auto 100%" />
						<HStack spacing={0} pt={4} fontWeight="600">
							<Box className="top-share" w="50px" h="20px" bgSize="auto 15px" />
							<Text>({question?.answ_count}/5)</Text>
						</HStack>
						<Text fontSize="20px" fontWeight="600" pt={2}>
							I Need Help
						</Text>
						<Text pt={10} className="textColor">
							Sorry
						</Text>
						<Text mt={-1} fontSize="xs" className="textColor" lineHeight="18px">
							Some questions lack options for accurate feedback.Invite friends
							to help!
						</Text>
					</VStack>
				}
				onCancel={setVisible.off}
				onSelect={(option, index) => {
					// Function called when an option in the sharesheet is selected
					if (index === 0) {
						shareToTelegram(
							value,
							`ex: "${question?.title}",
-> Please help me answer that on TypoCurator.`
						);
					} else if (index === 1) {
						shareOnTwitter(
							value,
							`ex: "${question?.title}", help me answer that on TypoCurator.`
						);
					} else {
						onCopy(); // Copy the link to clipboard
						toast({
							status: "success",
							title: "Link Copied!",
						});
					}
					setVisible.off(); // Close the sharesheet
					shareLog(); // Log the sharing action
				}}
			/>
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
		</>
	);
}
