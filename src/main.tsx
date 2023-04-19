import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import { theme } from './styles/theme'
import { CartProvider } from './contexts/cart'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </CartProvider>
  </React.StrictMode>,
)
