import { GoogleOAuthProvider } from "@react-oauth/google"
import { MagnificationDock } from "./components/dock/magnification-dock"
import HeroSection from "./components/hero-section"
import { WindowsProvider } from "./lib/providers/window"
import WindowStateManager from "./components/window/window-state-manager"
import { Cards } from "./components/card-stack"
import AppChip from "./components/app-chip"
import BackgroundImage from "./components/background-image"
import IMAGES from "./Images/Images"

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <main className="bg-slate-950">
        <WindowsProvider>
          <BackgroundImage src={IMAGES.background2}/> 
          <HeroSection/>
          <Cards/>
          <AppChip/>
          <WindowStateManager/>
          <MagnificationDock/>
        </WindowsProvider>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
