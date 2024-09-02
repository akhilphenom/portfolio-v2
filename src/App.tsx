import { LampDemo } from "@/components/ui/lamp-header"
import GoogleOAuthLogin from "./components/auth/google/google-auth-button"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from "./components/auth/google/google-login"
import { MagnificationDock } from "./components/dock/magnification-dock"

function App() {
  console.log(import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID)
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID}>
      <main className="bg-slate-950">
        <LampDemo/>
        <MagnificationDock/>
      </main>
    </GoogleOAuthProvider>
  )
}

export default App
