import store from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return <>

  <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer/>
  </Provider>
</>
}
