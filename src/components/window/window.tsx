import { WINDOW_TYPES } from "@/lib/providers/window"
import { Card } from "../ui/card"
import WindowComposition from "./window-composition"
import WindowResizer from "./window-resize"

function Window() {
    return (
        <WindowResizer>
            <WindowComposition name={WINDOW_TYPES.GMAIL}>
                <div className="grid grid-cols-4 gap-4 mr-3">
                    <Card>
                        <div className="text-center text-sm font-medium">File 1</div>
                    </Card>
                    <Card>
                        <div className="text-center text-sm font-medium">File 2</div>
                    </Card>
                </div>
            </WindowComposition>
        </WindowResizer>
    )
}

export default Window
