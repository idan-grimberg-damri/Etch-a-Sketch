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
 const onBoardElementMouseOver = (event) => {
    event.currentTarget.setAttribute('style', getRandomColor());
};


setOnNewBoardClickListener();
setOnBoardClickListener();
setBoard(true);

/**
 * Set a square board that allows the user to sketch random color squeres in it.
 * @param {Boolean} isFirstPlay False if the user already presed the new board button, true otherwise .
 */
function setBoard(isFirstPlay){
    // Initially, the user can't draw while hovering the board.
    isFreeDraw = false;

    let colSize;
    // If the user already pressed (sometime) on the new board button then prompt him to enter
    // the number of columns.
    if (!isFirstPlay)
        colSize = prompt(`Enter the number of columns (between ${minColSize} to ${maxColSize})`, defaultColSize);
    // Else set the column size to the default column size.
    else
        colSize = defaultColSize;
    
    // If the user didn't press the cancel button in the prompt window then proceed.
    if (colSize !== null){
        // While the user input is not valid continue to prompt the user (calling setBoard recursively).
        while(isNaN(colSize) || !isInputValid(parseInt(colSize)))
            setBoard(false);
        // Get the number value of colSize.
        colSize = parseInt(colSize);
        // Set the structure of the board.
        container.style.gridTemplateColumns = `repeat(${colSize}, 1fr)`;
        // Add colSize * colSize div elements to the board.
        for (let i = 0; i < colSize ** 2; i++)    
            container.appendChild(document.createElement('div'));
        
        children = container.childNodes; 
        
    }
            
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
        // Let the user set a new board.
        setBoard(false);

    });
}
/**
 * Set a listener to when the user clicks on the board.
 * Each click enables\disables the ability of the user to draw while hovering the board.
 */
function setOnBoardClickListener(){
    container.addEventListener('click', () => {
        let curr = children.length - 1;
        // If the user was unable to draw while hovering the board before, now he can (and vise versa).
        isFreeDraw = !isFreeDraw;
        // If the user is now able to draw while hovering the board then add an hover listener to each board element.
        if (isFreeDraw){
            while (curr > -1)
                children[curr--].addEventListener('mouseover', onBoardElementMouseOver);
        }
        // Else the user is now unable to draw while hovering the board, so remove the hover listener for each board element.
        else{
            while (curr > -1)
                children[curr--].removeEventListener('mouseover', onBoardElementMouseOver);
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

