import { useHapticFeedback } from "@tma.js/sdk-react"; // Import haptic feedback hook from the TMA SDK
import { useAppStore } from "@/store/app"; // Import app store hook

export default function useFeedback() {
  const { isTG } = useAppStore(); // Determine if the app is running in Telegram
  const haptic = isTG ? useHapticFeedback() : null; // Initialize haptic feedback if in Telegram

  const vibrate = (style) => {
    if (isTG) {
      haptic?.impactOccurred(style || "medium");  // Trigger haptic feedback with specified style
    } else {
      window.navigator.vibrate(200); // Fallback to browser vibration API
    }
  }

  const notification = (type) => {
    haptic?.notificationOccurred(type || 'success'); // Trigger haptic notification with specified type
  }

  const selectionChange = () => {
    haptic.selectionChanged(); // Trigger haptic feedback for selection change
  }

  return {
    vibrate,
    notification,
    selectionChange
  }
}
