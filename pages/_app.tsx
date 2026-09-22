import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import mnMN from "antd/locale/mn_MN";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={mnMN}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
