import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StateContextProvider } from "../src/context/StateContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  );
}

export default MyApp;
