const gameArea = document.querySelector(".gameboard-div")

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
            newButton.setAttribute("data-index", i)
            newButton.textContent = element
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
        let index = this.getAttribute("data-index")
        gameboard.arrayUpdate(index, currentPlayer.sign)
        buttonAssign()
        checkCondition()
        playerSwitch()
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
            console.log("Game Over " + currentPlayer.name + " Won!")
        } else if (currentArray[0] && currentArray[1] && currentArray[2] &&
            currentArray[3] && currentArray[4] && currentArray[5] &&
            currentArray[6] && currentArray[7] && currentArray[8] !== "") {
            gameOn = false
            console.log("Game Over! It's a Draw!");
        }
    }
    let buttonAssign = function() {
        let buttons = document.querySelectorAll("button")
        buttons.forEach((button) => {
            button.addEventListener("click", selectPosition)
        })
    }
    buttonAssign()
})

game()
