import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "./components/Sidebar";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <ClerkProvider>
    <Sidebar/>
  <Component {...pageProps} />;
  </ClerkProvider>
)
};

export default api.withTRPC(MyApp);
