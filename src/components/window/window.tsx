import TopGradient from "../shared/top-gradient"
import { Card } from "../ui/card"
import WindowComposition from "./window-composition"
import WindowResizer from "./window-resize"

function Window() {
    return (
        <WindowResizer>
            <WindowComposition>
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
