import React, { useState } from "react";
import { Button, Text, VStack, Box, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import useFeedback from "@/hooks/useFeedback"; // Custom hook for haptic feedback

const LongPress = ({ time, fault }) => {
    const { vibrate } = useFeedback(); // Use the vibrate function from the custom hook
    const toast = useToast(); // Chakra UI toast for notifications
    const [pressing, setPressing] = useState(false); // State to track if the button is being pressed
    const [startTime, setStartTime] = useState(0); // State to store the start time of the press
    const [pressTime, setPressTime] = useState(0); // State to store the duration of the press

    const handlePressStart = () => {
        vibrate(); // Trigger haptic feedback on start of press
        setPressing(true); // Set pressing to true indicating start of press
        setStartTime(Date.now()); // Record the start time of the press
    };

    const handlePressEnd = () => {
        setPressing(false); // Set pressing to false indicating end of press
        const pressTime = Math.floor((Date.now() - startTime) / 1000); // Calculate the press duration

        // Check if the press duration is within the allowed fault range
        if (Math.abs(pressTime - time) <= fault) {
            toast({
                status: "success",
                title: "Challenge Success!", // Notify success
            });
        } else {
            toast({
                status: "warning",
                title: "Challenge failed!", // Notify failure
            });
        }
        setPressTime(pressTime); // Update the press time state
    };

    useEffect(() => {
        // Prevent default right-click context menu on the entire document
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
    }, []);

    return (
        <VStack align="center">
            <Text fontSize="22px" fontWeight="600" mt="120px" className="title">
                Press and hold for 10 seconds // Instructional text
            </Text>
            <Box h="30px" my={3}>
                {!pressing && startTime !== 0 && (
                    <Text fontSize="15px" className="title">
                        You pressed for {pressTime} seconds in total! // Display the total press duration
                    </Text>
                )}
            </Box>
            <Button
                mt={4}
                borderRadius="full"
                size="lg"
                w="120px"
                h="120px"
                className={pressing ? "breathe-div" : ""} // Apply dynamic class based on pressing state
                transform="scale(1.12)"
                onMouseDown={handlePressStart} // Start press handler
                onMouseUp={handlePressEnd} // End press handler
                onTouchStart={handlePressStart} // Handle touch events for mobile
                onTouchEnd={handlePressEnd}
            >
                {pressing ? "Pressing" : "Press"} // Dynamic button text based on pressing state
            </Button>
        </VStack>
    );
};

export default LongPress; // Export the component for use in other parts of the application
