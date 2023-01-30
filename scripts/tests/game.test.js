/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn } = require("../game");


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
});

describe("newGame function works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2", "button3"];
        game.currentGame = ["button1", "button2", "button3"];
        document.getElementById("score").innerText = "42";
        newGame();
    })
    test("Score resets to 0", () => {
        expect(game.score).toEqual(0);
    })
    test("playerMoves to be cleared", () => {
        expect(game.playerMoves).toStrictEqual([]);
    })
    test("should be 1 element in computers array", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("Element with id of score should display 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    })
});