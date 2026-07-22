import { useWindows } from '@/lib/hooks/windows.hook'
import { WINDOW_TYPES } from '@/lib/providers/window';
import Genie from './genie.effect';
import WindowResizer from './window-resize';
import WindowComposition from './window-composition';

function WindowStateManager() {
    const { windows } = useWindows();
    return (
        windows.filter((window) => window.name !== WINDOW_TYPES.LAUNCHPAD).map((window) => (
            <WindowResizer key={window.name} window={window}>
                <Genie name={window.name}>
                    <WindowComposition name={window.name}>
                    </WindowComposition>
                </Genie>
            </WindowResizer>
        ))
    )
}

export default WindowStateManager
