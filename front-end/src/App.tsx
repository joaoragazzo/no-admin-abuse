import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { GameList } from "./pages/GameList"
import { NetworkList } from "./pages/NetworkList"
import { ScrollToTop } from "./utils/ScrollToTop"
import { AuthProvider } from "./contexts/AuthContext"
import { SteamLogin } from "./pages/SteamLogin"
import { ToastContainer } from 'react-toastify';
import { NetworkHomeWrapper } from "./pages/Network/NetworkHomeWrapper"
import { AdminTags } from "./pages/Admin/AdminTags"
import { AdminLayout } from "./pages/Admin/AdminLayout"
import { AdminTranslations } from "./pages/Admin/AdminTranslations"
import { MainLayout } from "./pages/MainLayout"

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/:game/networks" element={<NetworkList />} />
          <Route path="/:game/networks/:networkId" element={<NetworkHomeWrapper />} />
          <Route path="/auth/steam/callback" element={<SteamLogin />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index />
          <Route path="tags" element={<AdminTags />} />
          <Route path="users" />
          <Route path="reviews" />
          <Route path="tags" />
          <Route path="reports" />
          <Route path="security" />
          <Route path="statistics" />
          <Route path="servers" />
          <Route path="networks" />
          <Route path="translations" element={<AdminTranslations />} />
        </Route>
        
      </Routes>
    </AuthProvider>
  )
}

export default App
