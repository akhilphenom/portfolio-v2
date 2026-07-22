import { useCallback, useRef } from 'react'
import { useWindows } from './windows.hook'
import { WINDOW_TYPES, XYWH } from '../providers/window'

/**
 * Shared open/close/minimize/maximize + z-order behavior for any window,
 * whether it renders inside the shared WindowComposition chrome or provides
 * its own standalone chrome (e.g. the Terminal).
 */
export function useWindowControls(windowName: WINDOW_TYPES) {
  const {
    windows,
    rearrangeWindows,
    setWindowState,
    setWindowDimensions,
    getWindow,
    setDisableDragging,
  } = useWindows()

  const restoreDimensions = useRef<XYWH | null>(null)

  const bringToFront = useCallback(() => {
    const opened = [...windows].filter((item) => item.opened)
    const closed = [...windows].filter((item) => !item.opened)
    const index = opened.findIndex(({ name }) => name == windowName)
    if (index < 0) {
      return
    }
    const rearrangedArray = [
      ...closed,
      ...opened.slice(0, index),
      ...opened.slice(index + 1),
      opened[index],
    ].map((item, i) => ({
      ...item,
      zIndex: !item.opened ? -1 : 99 + windows.length + i,
    }))
    rearrangeWindows(rearrangedArray)
  }, [windows, windowName, rearrangeWindows])

  const close = useCallback(() => {
    setWindowState(windowName, false)
  }, [windowName, setWindowState])

  const maximize = useCallback(() => {
    bringToFront()
    const current = getWindow(windowName)
    if (current && current.dimensions.width !== '100vw') {
      restoreDimensions.current = current.dimensions
    }
    setWindowDimensions(windowName, {
      x: 0,
      y: 0,
      width: '100vw',
      height: '100vh',
    })
  }, [bringToFront, getWindow, windowName, setWindowDimensions])

  const minimize = useCallback(() => {
    if (restoreDimensions.current) {
      setWindowDimensions(windowName, restoreDimensions.current)
      restoreDimensions.current = null
      return
    }
    const current = getWindow(windowName)
    setWindowDimensions(windowName, {
      x: current?.dimensions.x ?? 0,
      y: current?.dimensions.y ?? 0,
      width: 400,
      height: 400,
    })
  }, [getWindow, windowName, setWindowDimensions])

  return { bringToFront, close, maximize, minimize, setDisableDragging }
}
