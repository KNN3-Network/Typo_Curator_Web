import { immer } from "zustand/middleware/immer"; // Import immer middleware for immutable state updates
import { persist } from "zustand/middleware"; // Import persist middleware for state persistence
import { create } from "zustand"; // Import create function from zustand

export const useUserStore: any = create<any>()(
	persist(
		(set, get) => ({
			// Initial state values
			startParam: "",
			initDataRaw: "",
			ton_address: "",
			evm_address: "",
			userId: "",
			token: "",
			TGId: "",
			lng: "en",
			userName: "",
			isFirstClaim: 1,
			name: "",
			score: 0,
			question: {},

			// Setters for updating state values
			setStartParam: (startParam: number | undefined) => {
				set({ startParam });
			},
			setInitDataRaw: (initDataRaw: string | undefined) => {
				set({ initDataRaw });
			},
			setTonAddress: (ton_address: string) => {
				set({ ton_address });
			},
			setEvmAddress: (evm_address: string) => {
				set({ evm_address });
			},
			setUserId: (userId: string) => {
				set({ userId });
			},
			setToken: (token: string) => {
				set({ token });
			},
			setTGId: (TGId: string) => {
				set({ TGId });
			},
			setUserName: (userName: string) => {
				set({ userName });
			},
			setName: (name: string) => {
				set({ name });
			},
			setScore: (score: string) => {
				set({ score });
			},
			setIsFirstClaim: (isFirstClaim: number) => {
				set({ isFirstClaim });
			},
			setLng: (lng: string) => {
				set({ lng });
			},
			setQuestion: (question: any) => {
				set({ question });
			},

			// Method to clear all user information
			clearUserInfo: () => {
				set({
					startParam: "",
					initDataRaw: "",
					ton_address: "",
					evm_address: "",
					userId: "",
					token: "",
					TGId: "",
					lng: "en",
					userName: "",
					name: "",
					score: 0,
					isFirstClaim: 1,
					question: {},
				});
			},
		}),
		{
			name: "useUserStore", // Name for the persisted state in local storage
		}
	)
);
