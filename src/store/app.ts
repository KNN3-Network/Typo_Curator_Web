import { immer } from "zustand/middleware/immer"; // Import immer middleware for immutable state updates
import { persist } from "zustand/middleware"; // Import persist middleware for state persistence
import { create } from "zustand"; // Import create function from zustand

export const useAppStore: any = create<any>()(
	persist(
		(set, get) => ({
			isTG: true, // Initial state for Telegram usage flag
			theme: "dark", // Initial state for theme setting

			// Setter for updating the isTG state
			setIsTG: (isTG: boolean) => {
				set({ isTG });
			},

			// Setter for updating the theme state and applying it to the document
			setTheme: (theme: "dark" | "light") => {
				set({ theme });
				document.documentElement.className = theme; // Update the document's class name
				document.documentElement.setAttribute("data-theme", theme); // Update the document's data-theme attribute
			},

			// Method to clear the app-related state values
			clearUserInfo: () => {
				set({
					isTG: true,
					theme: "dark",
				});
			},
		}),
		{
			name: "useAppStore", // Name for the persisted state in local storage
		}
	)
);
