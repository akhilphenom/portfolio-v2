import { createContext, useState } from 'react';

export type XYWH = {
  x: number,
  y: number,
  width: number | string,
  height: number | string,
}

export type Window = {
  name: WINDOW_TYPES,
  opened: boolean,
  fullScreen: boolean,
  zIndex: number,
  dimensions: XYWH,
  disableDragging: boolean
}

export enum WINDOW_TYPES {
  LAUNCHPAD = 'launchpad',
  WORK_EXPERIENCE = 'work-experience',
  PROJECTS = 'projects',
  RESUME = 'resume',
  GMAIL = 'gmail',
}

export enum WINDOW_TYPES_NAMES {
  'launchpad' = 'Launchpad',
  'work-experience' = 'Work Experience',
  'projects' = 'Projects',
  'resume' = 'Resume',
  'gmail' = 'Gmail',
}

export interface WindowContext {
  windows: Window[], 
  getWindow: (window: WINDOW_TYPES) => Window
  addWindow: (window: WINDOW_TYPES, dimensions: XYWH) => void, 
  removeWindow: (window: WINDOW_TYPES) => void, 
  toggleWindow: (window: WINDOW_TYPES) => void, 
  setWindowState: (window: WINDOW_TYPES, state: boolean) => void
  setWindowScreenSize: (window: WINDOW_TYPES, fullScreen: boolean) => void
  setWindowDimensions: (window: WINDOW_TYPES, dimensions: XYWH) => void,
  setDisableDragging: (window: WINDOW_TYPES, disable: boolean) => void,
  setWindowZIndex: (window: WINDOW_TYPES, zIndex: number) => void,
  rearrangeWindows: (windows: Window[]) => void
}

export const WindowsContext = createContext<WindowContext>({
  windows: [],
  getWindow: (_window: WINDOW_TYPES) => null,
  addWindow: (_window: WINDOW_TYPES, _dimensions: XYWH) => {}, 
  removeWindow: (_window) => {}, 
  toggleWindow: (_window) => {}, 
  setWindowState: (_window: WINDOW_TYPES, _state: boolean) => {},
  setWindowScreenSize: (_window: WINDOW_TYPES, _state: boolean) => {},
  setWindowDimensions: (_window: WINDOW_TYPES, _dimensions: XYWH) => {},
  setDisableDragging: (_window: WINDOW_TYPES, _disable: boolean) => {},
  setWindowZIndex: (_window: WINDOW_TYPES, _zIndex: number) => {},
  rearrangeWindows: (_windows: Window[]) => {}
});

export const WindowsProvider = ({ children }) => {
  const [windows, setWindows] = useState<WindowContext['windows']>([]);

  const addWindow = (name: WINDOW_TYPES, dimensions: XYWH) => {
    setWindows((prevWindows) => [...prevWindows, { name, disableDragging: false, fullScreen: false, opened: true, dimensions, zIndex: 99 + windows.length }]);
  };

  const removeWindow = (name: WINDOW_TYPES) => {
    setWindows((prevWindows) => prevWindows.filter(w => w.name !== name));
  };

  const toggleWindow = (name: WINDOW_TYPES) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, opened: !w.opened } : w ));
  };

  const setWindowState = (name: WINDOW_TYPES, state: boolean) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, opened: state } : w ));
  };

  const setWindowScreenSize = (name: WINDOW_TYPES, fullScreen: boolean) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, fullScreen } : w ));
  };

  const setWindowDimensions = (name: WINDOW_TYPES, dimensions: XYWH) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, dimensions } : w ));
  };

  const setDisableDragging = (name: WINDOW_TYPES, disable: boolean) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, disableDragging: disable } : w ));
  };

  const setWindowZIndex = (name: WINDOW_TYPES, zIndex: number) => {
    setWindows((prevWindows) => prevWindows.map(w => w.name === name ? { ...w, zIndex } : w ));
  };

  const getWindow = (window: WINDOW_TYPES) => windows.find(({ name }) => name == window)

  const rearrangeWindows = (windows: Window[]) => {
    setWindows(windows)
  }

  return (
    <WindowsContext.Provider
      value={{ 
        windows, 
        getWindow,
        addWindow, 
        removeWindow, 
        toggleWindow, 
        setWindowState, 
        setWindowScreenSize, 
        setWindowDimensions,
        setDisableDragging,
        setWindowZIndex,
        rearrangeWindows,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};
