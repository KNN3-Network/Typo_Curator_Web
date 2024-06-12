import { useState, useCallback, useEffect, Fragment } from "react";
import { Box, Image, Button, useToast } from "@chakra-ui/react";
import BackIcon from "@/components/Icons/Back";

export default function Screen({ children, onBack, title }) {
	// console.log("onBack", onBack, title);
	return (
		<Box width="100%" height="100%" position="relative">
			<Box width="100%" height="100%" marginTop="0" overflowY="scroll">
				{children}
			</Box>
		</Box>
	);
}
