import { chakra, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Footer } from '../component/Footer/Footer';
import { Header } from '../component/Header/Header';
import { AuthProvider } from '../feature/auth/provider/AuthProvider';
import { theme } from '../lib/chakra/theme';
import { initializeFirebaseApp } from '../lib/firebase/firebase';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  initializeFirebaseApp();

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <chakra.main flex={1} display={'flex'} flexDirection={'column'} minHeight={0}>
          <Component {...pageProps} />
        </chakra.main>
        <Footer />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
