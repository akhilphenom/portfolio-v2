import { GoogleOAuthProvider } from "@react-oauth/google"
import { MagnificationDock } from "./components/dock/magnification-dock"
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation"
import HeroSection from "./components/hero-section"
import Window from "./components/window/window"

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <main className="bg-slate-950">
        <BackgroundGradientAnimation/>
        <HeroSection/>
        <Window/>
        <MagnificationDock/>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
