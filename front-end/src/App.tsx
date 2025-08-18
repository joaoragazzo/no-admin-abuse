import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { GameList } from "./pages/GameList"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { ServerList } from "./pages/ServerList"
import { LLMTrain } from "./pages/LLMTrain"
import { ScrollToTop } from "./utils/ScrollToTop"
import { AuthProvider } from "./contexts/AuthContext"
import { SteamLogin } from "./pages/SteamLogin"
import { ToastContainer } from 'react-toastify';
import { NetworkHomeWrapper } from "./pages/Network/NetworkHomeWrapper"

function App() {
  return (
    <AuthProvider>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
        theme="dark"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/servers/:game" element={<ServerList />} />
          <Route path="/network/:networkId" element={<NetworkHomeWrapper />} />
          <Route path="/auth/steam/callback" element={<SteamLogin />} />
          <Route path="/llm-train" element={<LLMTrain />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
