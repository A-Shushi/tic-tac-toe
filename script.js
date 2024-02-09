const gameArea = document.querySelector(".gameboard-div")
const textField = document.querySelector("#index")
const submitButton = document.querySelector("#submit-btn")

let gameboard = (function () {
    let gameboardArray = ["", "", "", "", "", "", "", "", ""]
    let render = function () {
        console.log(gameboardArray)
        while (gameArea.firstChild) {
            gameArea.removeChild(gameArea.lastChild)
        }
        gameboardArray.forEach((element) => {
            let newButton = document.createElement("button")
            newButton.textContent = element
            gameArea.appendChild(newButton)
        })
    }
    let arrayUpdate = function (index, sign) {
        gameboardArray[index] = sign;
        render()
    }
    let getArray = function() {
        return gameboardArray
    }
    return {render, arrayUpdate, getArray}
})()

let createUser = function (name, sign) {
    this.name = name;
    this.sign = sign;
    return {name, sign}
}

let game = (function () {
    let gameOn = true
    gameboard.render()
    let playerX = createUser("Igor", "X")
    let playerO = createUser("Kirill", "O")
    let currentPlayer = playerX
    let playerSwitch = function () {
        if (currentPlayer === playerX) {
            currentPlayer = playerO
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX
        }
    }
    let selectPosition = function () {
        if (gameOn) {
            let index = textField.value
            textField.textContent = ""
            gameboard.arrayUpdate(index, currentPlayer.sign)
            let currentArray = gameboard.getArray()
            if (currentArray[0] === currentArray[1] && currentArray[1] === currentArray[2] && currentArray[0] !== "" ||
                currentArray[3] === currentArray[4] && currentArray[4] === currentArray[5] && currentArray[3] !== "" ||
                currentArray[6] === currentArray[7] && currentArray[7] === currentArray[8] && currentArray[6] !== "" ||
                currentArray[0] === currentArray[3] && currentArray[3] === currentArray[6] && currentArray[0] !== "" ||
                currentArray[1] === currentArray[4] && currentArray[4] === currentArray[7] && currentArray[1] !== "" ||
                currentArray[2] === currentArray[5] && currentArray[5] === currentArray[8] && currentArray[2] !== "" ||
                currentArray[0] === currentArray[4] && currentArray[4] === currentArray[8] && currentArray[0] !== "" ||
                currentArray[2] === currentArray[4] && currentArray[4] === currentArray[6] && currentArray[2] !== "") {
                gameOn = false
                console.log("Game Over " + currentPlayer.name + " Won!")
            }
            playerSwitch()
        }
    }
    submitButton.addEventListener("click", selectPosition)
    return {}
})()
