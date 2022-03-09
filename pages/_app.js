import "../styles/globals.scss";
import { ChinoProvider } from "../context/ChinoContext";
function MyApp({ Component, pageProps }) {
  return (
    <ChinoProvider>
      <Component {...pageProps} />
    </ChinoProvider>
  );
}

export default MyApp;
