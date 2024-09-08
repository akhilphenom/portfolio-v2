import { GoogleOAuthProvider } from "@react-oauth/google"
import { MagnificationDock } from "./components/dock/magnification-dock"
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation"
import HeroSection from "./components/hero-section"
import Window from "./components/window/window"
import { WindowsProvider } from "./lib/providers/window"
import WindowStateManager from "./components/window/window-state-manager"

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <main className="bg-slate-950">
        <WindowsProvider>
          <BackgroundGradientAnimation/>
          <HeroSection/>
          <WindowStateManager/>
          <MagnificationDock/>
        </WindowsProvider>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
