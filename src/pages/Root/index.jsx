import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {
	SDKProvider,
	useInitData,
	useInitDataRaw,
	useThemeParams,
	DisplayGate,
} from "@tma.js/sdk-react";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import config from "@/config";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// Component to handle Telegram initialization data
function TGInitData() {
	const { setStartParam, setInitDataRaw } = useUserStore(); // User store setters
	const { setTheme } = useAppStore(); // App store setter
	const initData = useInitData(); // Hook to get initial data
	const initDataRaw = useInitDataRaw(); // Hook to get raw initial data
	const themeParams = useThemeParams(); // Hook to get theme parameters

	useEffect(() => {
		setStartParam(initData?.startParam); // Set start parameters from initial data
	}, [initData]);

	useEffect(() => {
		setInitDataRaw(initDataRaw); // Set raw initial data
	}, [initDataRaw]);

	useEffect(() => {
		const theme = themeParams?.getState(); // Get current theme state
		if (theme?.backgroundColor === "#ffffff") {
			setTheme("light"); // Set theme to light if background is white
		} else {
			setTheme("dark"); // Set theme to dark otherwise
		}

		window.telegramAnalytics.init({
			token:
				"eyJhcHBfbmFtZSI6IlR5cG9DdXJhdG9yIiwiYXBwX3VybCI6Imh0dHBzOi8vdHlwb2N1cmF0b3IudHlwb3guYWkvIiwiYXBwX2RvbWFpbiI6Imh0dHBzOi8vdHlwb2N1cmF0b3IudHlwb3guYWkvIn0=!k/QzGCQGyCrD3iVf9Z7PwR95C3pXbmRLMAHHklYk3fA=",
			appName: "TypoCurator",
		}); // Initialize Telegram analytics
	}, [themeParams]);

	return null;
}

// Component to handle H5 initialization and error handling
function H5({ error }) {
	const { setInitDataRaw } = useUserStore(); // User store setter
	const { setIsTG, setTheme } = useAppStore(); // App store setters

	useEffect(() => {
		setIsTG(false); // Set Telegram flag to false
		setInitDataRaw(
			`user=%7B%22id%22%3A5244400416%2C%22first_name%22%3A%22Steven%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22bitSteven%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=8078904810627284045&chat_type=group&auth_date=1716273819&hash=b5e0b4901381988743926ecbebfb238f28424b8046871cdab9a3ae536ba181e0`
		); // Set raw initial data for H5
		setTheme("dark"); // Set theme to dark

		console.log("ProviderError", error.toString()); // Log provider error
	}, []);

	return (
		<Box className="container" height="100%">
			<Outlet /> {/* Render child routes */}
		</Box>
	);
}

// Root component to setup providers and display content
export default function Root() {
	return (
		<>
			<TonConnectUIProvider
				manifestUrl={`${config.webUrl}/tonconnect-manifest.json`} // URL to TON Connect manifest
				actionsConfiguration={{
					twaReturnUrl: config.appUrl, // Return URL for TON Wallet
				}}
			>
				<SDKProvider
					options={{ acceptCustomStyles: true, cssVars: true, async: true }} // SDK Provider options
				>
					<DisplayGate
						error={H5} // Error component for SDK initialization
						loading={<div>SDK is loading.</div>} // Loading state component
						initial={<div>Waiting for initialization to start.</div>} // Initial state component
					>
						<Box className="container" height="100%">
							<Outlet /> {/* Render child routes */}
						</Box>
						<TGInitData /> {/* Initialize Telegram data */}
					</DisplayGate>
				</SDKProvider>
			</TonConnectUIProvider>
		</>
	);
}
