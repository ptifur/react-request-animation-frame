export const moveComputer = (playerY) => {
    setComputerY(compY => compY += (positionY - (compY + 30)) * 0.1 )
    console.log('move')
}