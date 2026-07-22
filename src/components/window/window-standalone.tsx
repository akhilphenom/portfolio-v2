import { WINDOW_TYPES } from '@/lib/providers/window'
import Terminal from '../apps/terminal'

/**
 * Renders apps that provide their own window chrome (no WindowComposition).
 * Standalone apps receive the window `name` so they can wire up their own
 * open/close/minimize/maximize via useWindowControls.
 */
export default function WindowStandalone({ name }: { name: WINDOW_TYPES }) {
  switch (name) {
    case WINDOW_TYPES.TERMINAL:
      return <Terminal name={name} />
    default:
      return null
  }
}
