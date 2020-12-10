import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const HandleKeypress = () => {

    // get canvas
    const canvasRef = useRef()

    // set frame counter
    const [counter, setCounter] = useState(0)
    const [shouldStop, setShouldStop] = useState(true)

    // box position and speed
    const [positionX, setPositionX] = useState(165)
    const [positionY, setPositionY] = useState(165)

    const [dx, setDx] = useState(2)
    const [dy, setDy] = useState(1.5)

    const [motionType, setMotionType] = useState('Circle')

    // output graphics
    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.clearRect(0, 0, 350, 350)

        // motion
        if (motionType === 'Circle') {
            setPositionX(x => Math.sin(counter * .025) * 130 + 165)
            setPositionY(y => -Math.cos(counter * .025) * 130 + 165)
        }
        if (motionType === 'Bounce') {
            setPositionX(x => x + dx)
            setPositionY(y => y + dy)
        }

        // collision
        if (positionX > 300) {
            setDx(dxPrev => dxPrev * -1)
            setPositionX(x => x - 10)
        }
        if (positionX < 30) {
            setDx(dxPrev => dxPrev * -1)
            setPositionX(x => x + 10)
        }
        if (positionY > 300) {
            setDy(dyPrev => dyPrev * -1)
            setPositionY(y => y - 10)
        }
        if (positionY < 30) {
            setDy(dyPrev => dyPrev * -1)
            setPositionY(y => y + 10)
        }

        context.fillStyle = '#555555'
        context.fillRect(positionX, positionY, 20, 20)

    }, [counter])

    // update the counter
    useLayoutEffect(() => {
        if (!shouldStop) {
            let timerId

            const animate = () => {
                
                setCounter(c => c + 1)
    
                timerId = requestAnimationFrame(animate)
            }
            timerId = requestAnimationFrame(animate)
            return () => cancelAnimationFrame(timerId)
        }
    }, [shouldStop])
    
    const changeMotionType = () => {
        if (motionType === 'Circle') {
            setMotionType('Bounce')
        } else {
            setMotionType('Circle')
        }
    }

    return (
        <div className='container'>
            <canvas ref={canvasRef} width="350px" height="350px" onClick={changeMotionType} />
            <h3>Frame count: {counter}</h3>
            <p>Motions type is {motionType}</p>
            <button onClick={() => setShouldStop(!shouldStop)}>{ shouldStop ? 'Start' : 'Stop' }</button>
        </div>
    )
}

export default HandleKeypress