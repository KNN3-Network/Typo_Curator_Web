import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // Router provider for handling routes
import { ChakraProvider } from '@chakra-ui/react'; // Chakra UI provider for styling and theming
import { router } from './router.jsx'; // Importing router configuration
import { MetaMaskProvider } from '@metamask/sdk-react'; // MetaMask provider for integrating MetaMask
import './index.css'; // Importing global styles
import "./styles/theme.less"; // Importing theme styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    {/* Providing MetaMask integration with custom options */}
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'Red Packet', // Dapp name for MetaMask
          url: window.location.href, // Current URL for MetaMask
        }
      }}
    >
      <RouterProvider router={router} /> {/* Providing router for the application */}
    </MetaMaskProvider>
  </ChakraProvider>,
);
