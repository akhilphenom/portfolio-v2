import { WINDOW_TYPES } from '@/lib/providers/window'

/**
 * How an app renders when opened:
 * - 'windowed'   → wrapped in the shared WindowComposition chrome (title bar +
 *                  traffic lights), content comes from window-content.tsx.
 *                  This is the default. e.g. Work Experience.
 * - 'standalone' → the app renders its own chrome (its own open/close/minimize/
 *                  maximize), independent of WindowComposition. e.g. Terminal.
 */
export type AppMode = 'windowed' | 'standalone'

const APP_MODES: Partial<Record<WINDOW_TYPES, AppMode>> = {
  [WINDOW_TYPES.TERMINAL]: 'standalone',
}

export const getAppMode = (name: WINDOW_TYPES): AppMode =>
  APP_MODES[name] ?? 'windowed'
