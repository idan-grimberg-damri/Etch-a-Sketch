const minColSize = 1;
const maxColSize = 32;
const defaultColSize = 16;
const brightestColorLim = 256;
const container = document.querySelector('.container');


setOnNewBoardClickListener();
setBoard(true);

/**
 * Set a square board that allows the user to sketch random color squeres in it
 * @param isFirstPlay false if the user already presed the new board button, true otherwise 
 */
function setBoard(isFirstPlay){
    let colSize;
    // if the user already pressed (sometime) on the new board button then prompt him to enter
    // the number of columns.
    if (!isFirstPlay)
        colSize = prompt(`Enter the number of columns (between ${minColSize} to ${maxColSize})`, defaultColSize);
    // else set the column size to the default column size.
    else
        colSize = defaultColSize;
    
    // if the user didn't press the cancel button in the prompt window then proceed.
    if (colSize !== null){
        // while the user input is not valid continue to ask him for a prompt (calling setBoard recursively).
        while(!isInputValid(parseInt(colSize)))
            setBoard();
        // get the number value of colSize.
        colSize = parseInt(colSize);
        // set the structure of the grid.
        container.style.gridTemplateColumns = `repeat(${colSize}, 1fr)`;
        // add colSize * colSize div elements to the grid.
        // for each div element add a mouseover listener such that when the user hovers over some square
        // in the grid then set the background of that square (div) to a random color.
        // finally add the square div to the grid (his container).
        for (let i = 0; i < colSize ** 2; i++){
            let div = document.createElement('div');
            div.addEventListener('mouseover', (event) => {
                event.currentTarget.setAttribute('style', getRandomColor());  ;    
                
            });
            container.appendChild(div);
        }
        
    }
            
}

/**
 * set a listener to when the user clicks the new board button
 */
function setOnNewBoardClickListener(){
    let button = document.querySelector('button');
    button.addEventListener('click', () => {
        // get the list of the grid's squares.
        let children = container.childNodes;
        // get the location of the last square.
        let curr = children.length - 1;
        // while we did't finish iterating of the the grid's squares remove the current square from the grid.
        while (curr > -1)
            container.removeChild(children[curr--]);
        // allow the user to set a new board.
        setBoard(false);

    });
}

/**
 *
 * @param {*} num a value entered to the prompt window from the user.
 * @returns true if num is a positive natural number, false otherwise.
 */
function isInputValid(num){
    return !isNaN(num) && num !== Infinity && num >= minColSize && num <= maxColSize && Math.floor(num) === num;
}

/**
 * builds a random color
 * @returns a css value for the style attribute, describing a random background color for a specific square in the grid.
 */
function getRandomColor(){
    let r = Math.floor(Math.random() * brightestColorLim);
    let g = Math.floor(Math.random() * brightestColorLim);
    let b = Math.floor(Math.random() * brightestColorLim);
    return `background-color: rgb(${r}, ${g}, ${b})`
}

