const gameArea = document.querySelector(".gameboard-div")

let gameboard = function() {
    let gameboardArray = ["", "", "", "", "", "", "", "", ""]
    let render = function() {
        gameboardArray.forEach((element) => {
            let newButton = document.createElement("button")
            gameArea.appendChild(newButton)
        })
    }
    return {render}
}()

gameboard.render()
