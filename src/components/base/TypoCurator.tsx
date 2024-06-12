import React, { useState } from "react"; // Import React and useState hook for managing state
import { Button, Text, VStack, Box } from "@chakra-ui/react"; // Import UI components from Chakra UI
import { useEffect, useMemo } from "react"; // Import useEffect and useMemo hooks from React

const TypoCurator = ({ fontSize }) => {
	return (
		<Box pos="relative" className="typocurator title"> // Define a Box component with relative positioning
			<Text
				className="typo-text" // Apply custom CSS class for styling
				fontSize={fontSize || "32px"} // Set font size passed via props or default to 32px
				fontWeight="600" // Set font weight to bold (600)
			>
				TypoCurator // Display the text "TypoCurator"
			</Text>
			<Text
				className="typo-text" // Same styling as the previous Text component
				fontSize={fontSize || "32px"} // Same conditional font size application
				fontWeight="600" // Same font weight for consistency
			>
				TypoCurator // Display the same text again "TypoCurator"
			</Text>
		</Box>
	);
};

export default TypoCurator; // Export the component for use in other parts of the application
