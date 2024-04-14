import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {StyleProvider} from '@ant-design/cssinjs'
import { ConfigProvider } from "antd";
import {theme} from 'antd'

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <>
      <StyleProvider hashPriority="low">
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
          }}>
            <Component {...pageProps} />
          </ConfigProvider>
        </QueryClientProvider>
      </StyleProvider>
    </>
  )
}
