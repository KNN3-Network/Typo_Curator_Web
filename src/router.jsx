import { createBrowserRouter } from "react-router-dom"; // Importing createBrowserRouter from react-router-dom
import Root from "@/pages/Root"; // Importing Root component
import Home from "@/pages/Home"; // Importing Home component
import Question from "@/pages/Question"; // Importing Question component
import Profile from "@/pages/Profile"; // Importing Profile component
import Table from "@/pages/Table"; // Importing Table component
import Games from "@/pages/Games"; // Importing Games component
import Press from "@/pages/Games/Press"; // Importing Press game component
import KillTheKing from "@/pages/Games/KillTheKing"; // Importing KillTheKing game component

// Creating the router with route configuration
export const router = createBrowserRouter([
	{
		path: "/", // Root path
		element: <Root />, // Root component
		children: [
			{ path: "/", element: <Home /> }, // Home page route
			{ path: "/question", element: <Question /> }, // Question page route
			{ path: "/profile", element: <Profile /> }, // Profile page route
			{ path: "/table", element: <Table /> }, // Table page route
			{ path: "/games", element: <Games /> }, // Games main page route
			{ path: "/games/press", element: <Press /> }, // Press game route
			{ path: "/games/killTheKing", element: <KillTheKing /> }, // KillTheKing game route
		],
	},
]);
