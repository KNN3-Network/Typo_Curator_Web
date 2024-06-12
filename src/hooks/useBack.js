import { useBackButton } from "@tma.js/sdk-react";
import { useAppStore } from "@/store/app";

export default function useBack() {
	const { isTG } = useAppStore();
	const bb = isTG ? useBackButton() : null;
	return bb;
}
