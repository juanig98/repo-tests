import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es') 

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </>
)
