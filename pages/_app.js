// import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {StyleProvider} from '@ant-design/cssinjs'

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <>
      <StyleProvider hashPriority="low">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </StyleProvider>
    </>
  )
}
