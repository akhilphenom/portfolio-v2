import { useContext } from "react";
import { WindowsContext } from "../providers/window";

export const useWindows = () => {
    const context = useContext(WindowsContext);
    if (!context) {
      throw new Error('useWindows must be used within a WindowsProvider');
    }
    return context;
};
  