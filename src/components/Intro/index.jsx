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
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"; // Import Swiper CSS for styling the swiper
import "swiper/css/pagination"; // Import pagination styles for swiper

import { Pagination, Navigation } from "swiper/modules"; // Import Swiper modules for pagination and navigation functionality

import intro1 from "@/assets/images/intro1.svg"; // Image assets used in the swiper
import intro2 from "@/assets/images/intro2.svg";
import intro3 from "@/assets/images/intro3.svg";
import intro4 from "@/assets/images/intro4.svg";

export default function QuestionResult({ visible, setVisible }) {
	const toast = useToast(); // Use toast for notifications

	// Function to handle the close action of the popup
	const handleClose = () => {
		setVisible.off(); // Turn off the visibility state
		localStorage.setItem("isShow", true); // Set a local storage item to remember the state
	};

	return (
		// React Fragment for grouping children without adding extra nodes to the DOM
		<>
			<Popup
				visible={visible} // Control the visibility of the popup
				position="bottom" // Set the popup to appear from the bottom
				closeable // Enable a close icon on the popup
				closeOnClickOverlay={false} // Do not close the popup when clicking outside it
				style={{ height: "100%", width: "100%" }} // Full screen popup style
				onClose={handleClose} // Function to call on popup close
			>
				// Vertical stack for aligning children vertically
				<VStack w="100vw" h="100vh" spacing={0} color="#000">
					// Swiper component for sliding images
					<Swiper
						pagination={true} // Enable pagination
						modules={[Pagination, Navigation]} // Activate pagination and navigation modules
						className="mySwiper"
					>
						// Individual slides within the swiper
						<SwiperSlide>
							<Box w="full" h="full">
								<Image src={intro1} w="full" h="full" />
							</Box>
						</SwiperSlide>
						<SwiperSlide>
							<Box w="full" h="full" bg="#000">
								<Image
									src={intro2}
									w="full"
									h="full"
									objectFit="contain !important"
								/>
							</Box>
						</SwiperSlide>
						<SwiperSlide>
							<Box w="full" h="full" bg="#000">
								<Image
									src={intro3}
									w="full"
									h="full"
									objectFit="contain !important"
								/>
							</Box>
						</SwiperSlide>
						<SwiperSlide>
							<Box w="full" h="full" bg="#000">
								<Image
									src={intro4}
									w="full"
									h="full"
									objectFit="contain !important"
								/>
							</Box>
						</SwiperSlide>
					</Swiper>
				</VStack>
			</Popup>
		</>
	);
}
