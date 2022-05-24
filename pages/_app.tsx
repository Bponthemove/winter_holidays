import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '../src/context/globalContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
)};

export default MyApp
