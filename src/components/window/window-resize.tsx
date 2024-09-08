import { useWindows } from '@/lib/hooks/windows.hook';
import { Window, XYWH } from '@/lib/providers/window';
import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

interface IProps {
    children: React.ReactNode,
    window: Window 
}

function WindowResizer({
    window: { name: windowName },
    children
}: IProps) {
    const initialDimensions: XYWH = {
        x: 150,
        y: 150,
        width: 0,
        height: 0
    }
    const { windows, setWindowDimensions, getWindow } = useWindows();
    const [state, setState] = useState(initialDimensions)
    const [zIndex, setZIndex] = useState(0)
    const [opened, setOpened] = useState(true);
    const [disableDragging, setDisableDragging] = useState(false);

    const modifyDimensions = (dimensions: XYWH) => {
        setState(state => ({ ...state, ...dimensions }))
        setWindowDimensions(windowName, dimensions)
    }
    
    useEffect(() => {
        if(windows.length) {
            const window = getWindow(windowName)
            setState(window.dimensions)
            setDisableDragging(window.disableDragging)
            setOpened(window.opened)
            setZIndex(window.zIndex)
        }
    }, [windows])

    return (
        <Rnd
        disableDragging={disableDragging}
        dragHandleClassName='window-drag-handle'
        style={{
            zIndex,
            overflow: 'hidden',
        }}
        className={`!flex flex-col`}
        minHeight={400}
        minWidth={600}
        maxWidth={'100%'}
        bounds={'parent'}
        size={{ width: state.width, height: state.height }}
        position={{ x: state.x, y: state.y }}
        onDragStop={(_e, d) => { modifyDimensions({ ...state, x: d.x, y: d.y }) }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
            modifyDimensions({
                width: Number(ref.style.width),
                height: Number(ref.style.height),
                ...position,
            });
        }}>
            {children}
        </Rnd>
    )
}

export default WindowResizer
