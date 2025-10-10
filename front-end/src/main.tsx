import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Layout: {
              triggerBg: "#101010",
              siderBg: "#141414"
            },
            Switch: {
              colorPrimary: '#2563eb',
              colorBgContainer: '#262626'
            },
          }
        }}
      >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
)
