// Import user store hook from user store and Axios for HTTP requests
import { useUserStore } from "@/store/user";
import axios from "axios";
// Import toast functionality for showing messages from Chakra UI
import { createStandaloneToast } from "@chakra-ui/react";
// Import API URL configuration from the project's configuration file
import config from "@/config";

// Initialize the toast function for notifications
const { toast } = createStandaloneToast();

// Create an Axios instance with a base URL and a retry configuration
const api = axios.create({
  baseURL: config.apiUrl,
  retry: 1,
});

// Add a request interceptor to Axios to handle connectivity and authentication before each request
api.interceptors.request.use(
  (config) => {
    // Check if the browser is online before proceeding with the request
    if (typeof window !== "undefined" && !window.navigator.onLine) {
      // Display a toast message when there is no network connection
      toast({
        title: "Network error.",
        status: "error",
        variant: "subtle",
        duration: 3000,
        isClosable: false,
        position: "top-right",
      });
    }

    // Extract the existing authorization token from the headers
    const authToken = config.headers.authorization;
    // Retrieve the user's token from the user store
    const token = useUserStore.getState()?.token;
    // Set the authorization header to use the existing token or the user's token
    config.headers.authorization = authToken ? authToken : `Bearer ${token}`;
    return config;  // Proceed with the modified configuration
  },
  (err) => {
    // Handle request errors
    return Promise.reject(err);
  }
);

// Add a response interceptor to handle data and errors after the response is received
api.interceptors.response.use(
  (res) => {
    // Handle the response by checking if the response code is 200 (success)
    if (res.data.code === 200) {
      // Return the actual data part of the response if successful
      return res.data;
    } else {
      // Return the full response if the response code is not 200
      return res;
    }
  },
  (error) => {
    // Handle specific HTTP errors
    if (error && error.response && error.response.status === 403) {
      // Log to console if the error is a 403 Forbidden
      console.error(error);
    } else {
      // Log the error configuration if another type of error occurs
      let config = error.config;
      console.log(config);
    }
  }
);

// Export the configured Axios instance for use in other parts of the application
export default api;
