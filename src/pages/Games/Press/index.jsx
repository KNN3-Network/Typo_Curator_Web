import React, { useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import LongPress from "@/components/LongPress";

const PressGame = () => {
	return (
		<VStack h="100vh">
			<LongPress time={10} fault={2} />
		</VStack>
	);
};

export default PressGame;
