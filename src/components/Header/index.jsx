import { useState, useCallback, useEffect, Fragment } from "react";
import { Box, Image, Button, useToast } from "@chakra-ui/react";
import LogoIcon from "@/components/Icons/Logo";
import SignInIcon from "@/components/Icons/SignIn";
import BackIcon from "@/components/Icons/Back";
import { useSDK } from "@metamask/sdk-react";
import { useUserStore } from "@/store/user";
import * as api from "@/api";

export default function Home() {
    // State management for various UI components and user interactions
    const [intent, setIntent] = useState("send");
    const [activePage, setActivePage] = useState("home");
    const [isShowRules, setIsShowRules] = useState(false);
    const [isLogingIn, setIsLogingIn] = useState(false);
    const [account, setAccount] = useState("test");
    // Integration with user store for managing user information
    const { userInfo, updateUserInfo, getUserInfo } = useUserStore();
    // Determine if user is signed in based on presence of userInfo and token
    const isSignedIn = !!userInfo && !!userInfo.token;
    // Use Chakra-UI's toast for showing notifications
    const toast = useToast();
    console.log("userInfo", userInfo);

    // Flags to manage UI state based on login status
    const disabled = isLogingIn;
    const loading = isLogingIn;

    return (
        // Layout container for the home page
        <Box width="100%" height="100%" position="relative">
            // Header section with absolute positioning
            <Box
                position="absolute"
                top="0"
                left="0"
                color="white"
                width="100%"
                height="44px"
            >
                // Flex container for aligning items within the header
                <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                ></Box>
            </Box>
        </Box>
    );
}
