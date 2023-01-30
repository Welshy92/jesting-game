/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game object contains correct keys", () => {
    test("Score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("CurrentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("PlayerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("Choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("Choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    })
});

describe("newGame function works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2", "button3"];
        game.currentGame = ["button1", "button2", "button3"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("Score resets to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("playerMoves to be cleared", () => {
        expect(game.playerMoves).toStrictEqual([]);
    });
    test("should be 1 element in computers array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("Element with id of score should display 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expecting data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
});

describe("Gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("Add correct class to light up buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("Alert shows after incorrect guess", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move!");
    })
});