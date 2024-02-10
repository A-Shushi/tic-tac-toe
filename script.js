const gameArea = document.querySelector(".gameboard-div")
const resetButton = document.querySelector("#reset")
const nameButton = document.querySelector("#change-name")
const playerXText = document.querySelector("#playerX")
const playerOText = document.querySelector("#playerO")
const alertText = document.querySelector("#alert")

let gameboard = (function () {
    let gameboardArray = ["", "", "", "", "", "", "", "", ""]
    let render = function () {
        let i = 0
        console.log(gameboardArray)
        while (gameArea.firstChild) {
            gameArea.removeChild(gameArea.lastChild)
        }
        gameboardArray.forEach((element) => {
            let newButton = document.createElement("button")
            newButton.className = "game-btn"
            newButton.setAttribute("data-index", i)
            if (element !== "") {
                newButton.textContent = element
                newButton.disabled = true
            } else {
                newButton.textContent = element
            }
            gameArea.appendChild(newButton)
            i++
        })
    }
    let arrayUpdate = function (index, sign) {
        gameboardArray[index] = sign;
        render()
    }
    let getArray = function () {
        return gameboardArray
    }
    let clearArray = function () {
        gameboardArray = ["", "", "", "", "", "", "", "", ""]
    }

    return {render, arrayUpdate, getArray, clearArray}
})()

let createUser = function (name, sign) {
    this.name = name;
    this.sign = sign;
    return {name, sign}
}

let game = function () {
    let gameOn = true
    gameboard.clearArray()
    alertText.textContent = ""
    gameboard.render()
    let playerX = createUser(prompt("Player 1 Name:"), "X")
    playerXText.textContent = `${playerX.name} is playing as ${playerX.sign}`
    let playerO = createUser(prompt("Player 2 Name:"), "O")
    playerOText.textContent = `${playerO.name} is playing as ${playerO.sign}`
    let currentPlayer = playerX
    let playerSwitch = function () {
        if (currentPlayer === playerX) {
            currentPlayer = playerO
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX
        }
    }
    let selectPosition = function () {
        let index = this.getAttribute("data-index")
        gameboard.arrayUpdate(index, currentPlayer.sign)
        buttonAssign()
        checkCondition()
        playerSwitch()
    }


    let gameOver = function () {
        let buttons = document.querySelectorAll(".game-btn")
        buttons.forEach((button) => {
            button.disabled = true
        })
    }
    let checkCondition = function () {
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
            alertText.textContent = `${currentPlayer.name} has won!`
            gameOver()
        } else if (currentArray[0] && currentArray[1] && currentArray[2] &&
            currentArray[3] && currentArray[4] && currentArray[5] &&
            currentArray[6] && currentArray[7] && currentArray[8] !== "") {
            gameOn = false
            alertText.textContent = "It's a draw!"
            gameOver()
        }
    }
    let resetGame = function () {
        nameButton.removeEventListener("click", resetGame)
        game()
    }

    let clearGame = function () {
        gameboard.clearArray()
        alertText.textContent = ""
        currentPlayer = playerX
        gameboard.render()
        buttonAssign()
    }
    let buttonAssign = function() {
        let buttons = document.querySelectorAll(".game-btn")
        buttons.forEach((button) => {
            button.addEventListener("click", selectPosition)
        })
    }
    buttonAssign()

    nameButton.addEventListener("click", resetGame)
    resetButton.addEventListener("click", clearGame)
}

game()

