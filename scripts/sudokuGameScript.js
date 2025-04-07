const fs = require('fs');
const path = require('path');

const saveFilePath = path.join(__dirname, 'sudokuProgress.json');

// Function to save the current game state to a JSON file
function saveGameState(board) {
    const gameState = { board };
    fs.writeFile(saveFilePath, JSON.stringify(gameState, null, 2), (err) => {
        if (err) {
            console.error('Error saving game state:', err);
        } else {
            console.log('Game state saved successfully.');
        }
    });
}

// Function to load the game state from the JSON file
function loadGameState() {
    if (fs.existsSync(saveFilePath)) {
        try {
            const data = fs.readFileSync(saveFilePath, 'utf8');
            const gameState = JSON.parse(data);
            console.log('Game state loaded successfully.');
            return gameState.board;
        } catch (err) {
            console.error('Error loading game state:', err);
        }
    } else {
        console.log('No saved game state found.');
        return null;
    }
}

// Example usage
const exampleBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

// Save the example board
saveGameState(exampleBoard);

// Load the saved board
const loadedBoard = loadGameState();
console.log('Loaded Board:', loadedBoard);