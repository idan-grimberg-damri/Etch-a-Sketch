// True if the user can draw while hovering the board, false otherwise.
let isFreeDraw;
// Will point to the childs of the container (the squares contained in the board).
let children;

const container = document.querySelector('.container');
const minColSize = 1;
const maxColSize = 32;
const defaultColSize = 16;
const brightestColorLim = 256;


/**
 * Get the current board element we hovered above and give it a random background color .
 * @param {Event} event Description of the hover event.
 */
 const setOnSquareHoverListener = (event) => {
    if (event.target.className !== 'container')
        event.target.setAttribute('style', getRandomColor());
};


setOnNewBoardClickListener();
setOnBoardClickListener();
buildBoard(defaultColSize);


/**
 * Prompt the user for the number of collumns that the board will have.
 * @returns The number of columns that the board will have. 
 */
function promptUser(){
    
    let cols;
    do {
        // Prompt the user to enter the number of columns.
        // Continue to prompt the user while the input is invalid.
        cols = prompt(`Enter the number of columns (between ${minColSize} to ${maxColSize})`, defaultColSize);
    }while (cols !== null && (isNaN(cols) || !isInputValid(parseInt(cols))));
   
    //  If the user pressed the cancel button then return the default number of columns.
    if (cols === null )
        return defaultColSize;
        
    // Else return the numeric value for the number of columns that the user entered.
    return parseInt(cols);
             
}

/**
 * Build the drawing board.
 * @param {Number} cols The number of columns that the board will have.  
 */
function buildBoard(cols){
    // Set the structure of the board.
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    // Add cols * cols div elements to the board.
    for (let i = 0; i < cols ** 2; i++)    
        container.appendChild(document.createElement('div'));
        
    children = container.childNodes; 
}

/**
 * Set a listener to when the user clicks the new board button.
 */
function setOnNewBoardClickListener(){
    let button = document.querySelector('button');
    button.addEventListener('click', () => {
        // Get the location of the last square.
        let curr = children.length - 1;
        // While we didn't finish iterating the board's squares, remove the current square from the board.
        while (curr > -1)
            container.removeChild(children[curr--]);
        
        // Disable the ability to draw while hovering the board.
        isFreeDraw = false;
        container.removeEventListener('mouseover', setOnSquareHoverListener);
        // Build a new board according to the user's choice for the number of columns.
        buildBoard(promptUser());

    });
}
/**
 * Set a listener to when the user clicks on the board.
 * Each click enables\disables the ability of the user to draw while hovering the board.
 */
function setOnBoardClickListener(){
    container.addEventListener('click', () => {
        // If the user was unable to draw while hovering the board before, now he can (and vise versa).
        isFreeDraw = !isFreeDraw;
        // If the user is now able to draw while hovering the board then add an hover listener to each board element.
        if (isFreeDraw){
            container.addEventListener('mouseover', setOnSquareHoverListener)
        }
        // Else the user is now unable to draw while hovering the board, so remove the hover listener for each board element.
        else{
            container.removeEventListener('mouseover', setOnSquareHoverListener);
        }

    });
}


/**
 *
 * @param {Number} num A value entered to the prompt window from the user.
 * @returns True if num is a positive natural number in the valid range, false otherwise.
 */
function isInputValid(num){
    return num !== Infinity && num >= minColSize && num <= maxColSize && Math.floor(num) === num;
}

/**
 * Builds a random color
 * @returns A css value for the style attribute, describing a random background color for a specific square in the board.
 */
function getRandomColor(){
    let r = Math.floor(Math.random() * brightestColorLim);
    let g = Math.floor(Math.random() * brightestColorLim);
    let b = Math.floor(Math.random() * brightestColorLim);
    return `background-color: rgb(${r}, ${g}, ${b})`
}

