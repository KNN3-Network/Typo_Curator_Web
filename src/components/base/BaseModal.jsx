// Define a functional component for a base modal using the imported UI components
export default function BaseModal(props) {
	// Destructuring props to extract configuration options and children components
	const {
		isOpen,                 // Boolean to control the display of the modal
		onClose,                // Function to call when the modal is requested to close
		maxW,                   // Maximum width for the modal (currently not applied in JSX)
		children,               // Children elements to render inside the modal
		isCentered,             // Boolean to determine if the modal is centered
		title,                  // Title string for the modal header
		closeOnOverlayClick = true, // Boolean to enable closing the modal by clicking on the overlay, default true
		footer,                 // Components to render as the footer of the modal
		size,                   // Size of the modal (currently overridden in JSX)
		hiddenClose = false,    // Boolean to hide the close button, default false
	} = props;

	return (
		<Modal
			isOpen={isOpen}                            // Control modal visibility based on isOpen
			isCentered={isCentered !== undefined ? isCentered : true}  // Default or specified centering
			motionPreset="slideInBottom"               // Animation style for modal entry
			onClose={onClose}                          // Function to execute on closing the modal
			closeOnOverlayClick={closeOnOverlayClick}  // Permit closing modal by clicking outside it
			size="sm"                                  // Set a fixed size for the modal
		>
			<ModalOverlay />                          // Overlay component for modal background
			<ModalContent
				className="base-modal"                 // Custom class for additional styling
				w="320px"                              // Fixed width for the modal content
				borderRadius="md"                      // Border radius for modal content
				py="10px"                              // Vertical padding for modal content
				px="0px"                               // Horizontal padding for modal content
			>
				{title ? (                            // Conditional rendering of the modal header
					<ModalHeader
						pt={2}                          // Padding top for the header
						whiteSpace="nowrap"             // Prevent text wrapping in the header
						textOverflow="ellipsis"         // Ellipsis for overflow text
						overflow="hidden"               // Hide overflow content
						fontSize="md"                   // Medium font size for the header
						fontWeight="semibold"           // Semibold font weight for the header
						pb={1}                          // Padding bottom for the header
					>
						<span>{title}</span>            // Display the title
					</ModalHeader>
				) : null}
				{!hiddenClose && (                     // Conditionally render the close button if not hidden
					<ModalCloseButton
						color="text.black"               // Text color for the close button
						borderRadius="0"                 // No border radius for the close button
						mr="5px"                         // Margin right for the close button
						mt="10px"                        // Margin top for the close button
						w="20px"                         // Width of the close button
						h="20px"                         // Height of the close button
						fontSize="12px"                  // Font size of the close button
					/>
				)}

				<ModalBody w="full" my={1}>           // Modal body for additional content
					{children}                        // Render children inside the modal body
				</ModalBody>
				{footer ? footer : null}              // Conditionally render the footer if provided
			</ModalContent>
		</Modal>
	);
}
