import { GoogleOAuthProvider } from "@react-oauth/google"
import { MagnificationDock } from "./components/dock/magnification-dock"
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation"
import HeroSection from "./components/hero-section"
import { WindowsProvider } from "./lib/providers/window"
import WindowStateManager from "./components/window/window-state-manager"
import { Cards } from "./components/card-stack"

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <main className="bg-slate-950">
        <WindowsProvider>
          <BackgroundGradientAnimation/>
          <HeroSection/>
          <Cards/>
          <WindowStateManager/>
          <MagnificationDock/>
        </WindowsProvider>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
