import React, { useState } from "react";
import { Button, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

const KillTheKing = () => {
	return (
		<VStack h="100vh" w="100vw">
			<iframe
				src="https://btcsteven.github.io/"
				title="Kill the king"
				width="100%"
				height="100%"
			/>
		</VStack>
	);
};

export default KillTheKing;
