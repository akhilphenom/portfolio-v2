import { useState } from 'react';
import { Rnd } from 'react-rnd';

interface IProps {
    children: React.ReactNode
}

function WindowResizer({
    children
}: IProps) {
    const [state, setState] = useState({
        x: 150,
        y: 150,
        width: 400,
        height: 400
    })
    return (
        <Rnd
        dragHandleClassName='window-drag-handle'
        className='!flex flex-col'
        minHeight={400}
        minWidth={600}
        maxWidth={'90%'}
        bounds={'parent'}
        size={{ width: state.width, height: state.height }}
        position={{ x: state.x, y: state.y }}
        onDragStop={(_e, d) => { setState(state => ({ ...state, x: d.x, y: d.y })) }}
        onResizeStop={(_e, _direction, ref, _delta, position) => {
            setState({
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
