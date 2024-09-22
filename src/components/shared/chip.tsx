import { useState, useEffect } from 'react'

interface IChipProps {
  timeout?: number,
  text?: string,
  color?: string
}

export default function Chip({ text: givenText, timeout }: IChipProps) {
  const [cursorVisible, setCursorVisible] = useState(true)
  const [text, setText] = useState(givenText)
  const fullText = 'Under Development'

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index))
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId)
        setCursorVisible(false)
      }
    }, 150)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if(!timeout) {
      return
    }
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)

    return () => timeout && clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex items-center px-4 py-2 rounded-md text-sm font-mono bg-black text-green-500 border border-green-500 shadow-[0_0_10px_rgba(0,255,0,0.3)] overflow-hidden">
        <div className="absolute inset-0 bg-green-500 opacity-5 animate-[flicker_0.15s_infinite_alternate]"></div>
        <div className="relative z-10 flex items-center">
          <span className="w-3 h-3 rounded-full bg-orange-500 mr-3 animate-pulse shadow-[0_0_10px_rgba(255,165,0,0.7)]"></span>
          <span className='text-sm'>{text}</span>
          <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▋</span>
        </div>
      </div>
    </div>
  )
}