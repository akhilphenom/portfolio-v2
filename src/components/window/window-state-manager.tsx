import { useWindows } from '@/lib/hooks/windows.hook'
import Genie from './genie.effect';
import WindowResizer from './window-resize';
import WindowComposition from './window-composition';

function WindowStateManager() {
    const { windows } = useWindows();
    return (
        windows.map((window) => (
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
