import { useContext } from 'react'
import { GoogleAuthContext } from '@/lib/providers/google-auth'

export const useGoogleAuth = () => useContext(GoogleAuthContext)
