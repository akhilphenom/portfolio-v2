import { GoogleOAuthProvider } from "@react-oauth/google"
import { GoogleAuthProvider } from "./lib/providers/google-auth"
import { MagnificationDock } from "./components/dock/magnification-dock"
import HeroSection from "./components/hero-section"
import { WindowsProvider } from "./lib/providers/window"
import WindowStateManager from "./components/window/window-state-manager"
import { Cards } from "./components/card-stack"
import NotificationHub from "./components/notification-hub"
import BackgroundImage from "./components/background-image"
import Launchpad from "./components/launchpad"
import IMAGES from "./Images/Images"

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <GoogleAuthProvider>
        <main className="bg-slate-950">
          <WindowsProvider>
            <BackgroundImage src={IMAGES.background0}/> 
            <HeroSection/>
            <Cards/>
            <NotificationHub/>
            <WindowStateManager/>
            <MagnificationDock/>
            <Launchpad/>
          </WindowsProvider>
        </main>
      </GoogleAuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
