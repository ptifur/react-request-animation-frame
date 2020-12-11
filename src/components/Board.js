import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import beep from '../sounds/beep.mp3'
import bleep from '../sounds/bleep.mp3'
import loose from '../sounds/loose.mp3'
import { Howl, Howler } from 'howler'

const Board = () => {

    // get canvas
    const canvasRef = useRef()

    const buttonRef = useRef()

    // set frame counter
    const [counter, setCounter] = useState(0)
    const [shouldStop, setShouldStop] = useState(true)

    // board dimentions
    const boardWidth = 600
    const boardHeight = 350

    // ball position and speed
    const [positionX, setPositionX] = useState(boardWidth / 2 - 60)
    const [positionY, setPositionY] = useState(boardHeight / 2 - 10)

    const [dx, setDx] = useState(0)
    const [dy, setDy] = useState(0)

    // player posution and score
    const [playerY, setPlayerY] = useState(165)

    const [scorePlayerOne, setScorePlayerOne] = useState(0)

    const [gameOver, setGameOver] = useState(false)

    // update the counter
    useLayoutEffect(() => {
        // if (!shouldStop) {
            let timerId
            const animate = () => {                
                setCounter(c => c + 1)
                timerId = requestAnimationFrame(animate)
            }
            timerId = requestAnimationFrame(animate)
            return () => cancelAnimationFrame(timerId)
        // }
    }, [])

    const ballMovement = () => {
        setPositionX(x => x + dx)
        setPositionY(y => y + dy)
    }

    const collideWall = () => {
        if (positionX > boardWidth - 60) {
            setDx(dxPrev => dxPrev * -1)
            setPositionX(x => x - 10)
            playSound(beep)
        }

        if (positionX <= 0) reset()

        if (positionY > boardHeight - 30) {
            setDy(dyPrev => dyPrev * -1)
            setPositionY(y => y - 10)
        }
        if (positionY < 10) {
            setDy(dyPrev => dyPrev * -1)
            setPositionY(y => y + 10)
        }
    }

    // loose the ball
    const reset = () => {
        setPositionX(boardWidth / 2 - 60)
        setPositionY(boardHeight / 2 - 10)
        
        setDx(0)
        setDy(0)

        buttonRef.current.classList.remove('grey')

        setScorePlayerOne(score => score + 1)

        playSound(loose)
    }

    // press button
    const restart = () => {
        if (gameOver) setGameOver(false)
        if (dx === 0 && dy === 0) {
            setDx(-3)
            setDy(1.2)

            buttonRef.current.classList.add('grey')
        }
    }

    const collidePlayer = () => {
        if (positionX < 40 && positionY > playerY && positionY < playerY + 60) {
            setDx(dxPrev => dxPrev * -1)
            setPositionX(x => x + 10)
            playSound(beep)
        }
    }

    // output graphics
    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.clearRect(0, 0, boardWidth, boardHeight)

        ballMovement()
        collideWall()

        collidePlayer()

        if (scorePlayerOne >= 2) {
            setScorePlayerOne(0)
            setGameOver(true)
        }

        // net
        context.fillStyle = '#555555'

        for (let i = 0; i < 350; ++i) {
            context.fillRect(boardWidth / 2 - 3, 10 + i * 35, 6, 20)
        }

        // ball
        context.fillStyle = '#555555'
        context.fillRect(positionX, positionY, 20, 20)

        // player 1
        // context.fillStyle = '#cccccc'
        context.fillRect(20, playerY, 20, 60)

        // player 2
        // context.fillStyle = '#cccccc'
        context.fillRect(boardWidth - 40, positionY - 20, 20, 60)

    }, [counter])

    // start with keyboard
    useEffect(() => {
        const startWithKeyboard = ({ code }) => {
            if (code === 'Space') {
                // setShouldStop(should => !should)
                restart()
            }
        }
        document.addEventListener('keypress', startWithKeyboard)
        return () => {
            document.removeEventListener('keypress', startWithKeyboard)
        }

    }, [])

    const getMouse = (event) => {
        setPlayerY(p => event.clientY * .55 - 80)
    }

    // console.log(beep)

    const playSound = (src) => {
        const sound = new Howl({
            src
        })
        Howler.volume(.5)
        sound.play()
    }

    return (
        <div className='container' onMouseMove={getMouse}>
            <canvas ref={canvasRef} width={boardWidth} height={boardHeight} />
            {/* <h3>Frame count: {counter}</h3> */}
            {/* { gameOver ? 'Game over' : `Your score is ${scorePlayerOne}`} */}
            { gameOver ? 'Game over' : ''} { gameOver ? '' : `Your score is ${scorePlayerOne}`}
            <div>
                <button onClick={restart} ref={buttonRef}>{(scorePlayerOne === 0) ? 'Start' : 'Resume'}</button>
            </div>
        </div>
    )
}

export default Board