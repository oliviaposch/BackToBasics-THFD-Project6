const lettersButtonsContainer = document.getElementById('phrase'); // buttons container UL for the single letter 
let missed = 0; // to track the guesses the player has missed 
const keyBoard = document.getElementById('qwerty'); 
const scoreBoard = document.getElementsByClassName('tries'); console.log(scoreBoard);
const overlay = document.getElementById('overlay');
const resetUl = document.querySelector('#phrase ul');
let letterFound = '';

//phrases Array
const phrasesArr = [
    'Easy Peasy',
    'The ball is in your court',
    'hit the hay',
    'A penny for your thoughts',
    'A piece of cake'
];

/**
 * randomly phrasesArr array
 */
function getRandomPhraseAsArray(arr){
    for (let i = arr.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
    }
    let elemToShow = arr[0].replace(/[^\w\s]/gi, ''); 
    let arrOfCharacters = elemToShow.split('');
    return arrOfCharacters;
}

/**
 * Loops through an Arr. of Char
 * create a LI | append the LI to the #phrase UL in HTML
 */
function addPhraseToDisplay(arr){
    const ulList = document.querySelector('#phrase ul');
    
    for (let i = 0; i < arr.length; i++ ) {
        let createLi = document.createElement('li'); 
        createLi.innerText = arr[i];
        if (createLi.innerText !== ' ') {
            createLi.className = 'letter';
        }else{
            createLi.style.width = '1em';
        }
        ulList.appendChild(createLi);
    }
    return ulList;
}


/**
 * Reset Function
 * reset the UL List 
 * new Random of phrases 
 * remove the classes chosen and disabled Attr.
 * reset hearts
 */
//extending Element prototype
Element.prototype.removeAttributes = function(...attrs) {
    attrs.forEach(attr => this.removeAttribute(attr))
  }
function resetGame(){
    resetUl.innerHTML = '';
    const phrasesArrChars = getRandomPhraseAsArray(phrasesArr);
    addPhraseToDisplay(phrasesArrChars);

    //reset classes from keyboard
    const resetTagButtonClasses = keyBoard.getElementsByTagName('button');
    for (let i = 0; i < resetTagButtonClasses.length; i++) {
        if(resetTagButtonClasses[i].hasAttribute('disabled')){
            resetTagButtonClasses[i].removeAttributes('disabled', 'class');
        }
    }

    //reset hearts
    const resetImages = document.getElementsByClassName('tries'); 
    for (let index = 0; index < resetImages.length; index++) {
        resetImages[index].children[0].src = 'images/liveHeart.png';
    }

    letterFound = '';
    missed = 0;
 
 }
 

/**
 *  eventListener start game
 */ 
overlay.addEventListener('click', (e) => {
    if(e.target.className == 'btn__reset'){
        overlay.style.display = 'none';
        //reset function
        resetGame();
    }
    
});



/**
 * FUNCTION HAVE ONE PARAMETER: the Btn the player has clicked
 * function get all Elements with class Letter
 * loop over the letters and check and compare with the UserGess choises
 */
function checkLetter(userGessBtn){

    const classLetterLi = document.getElementsByClassName('letter');
    let usersMatchedLetter = null;
    
    for (let i = 0; i < classLetterLi.length; i++) {
        if( classLetterLi[i].innerText.toLowerCase() === userGessBtn.toLowerCase()){
            
            classLetterLi[i].classList.add('show'); 
            usersMatchedLetter = classLetterLi[i].innerText; //console.log(usersMatchedLetter);
          
        }
    }

    return usersMatchedLetter;       
}

/**
 * Event Listener to the keyboard
 * when Btn has been clicked add 'choosen class' and Attr 'dsabled
 * passing the Btn to checkLetter Func. And stored it in a Var. called 'letterFound' 
 */

keyBoard.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        const button = e.target;
        button.className = 'chosen';
        if(button.classList.contains('chosen')){
            button.setAttribute('disabled', true);
            letterFound = checkLetter(button.innerText); //or innerHTML
            
             /**
            * Count the missed guesses 
            * if valeu null : remove one of the tries from scoreboard | and increase missed class
            */
            if(letterFound === null && missed <= 5){ //if both are true

                //use current number of missed variable to get the index position of the score .
                scoreBoard[missed].firstChild.src = 'images/lostHeart.png'; 
                missed++;
            }
           
           
        }
        
    }
    checkWin();
   
})

/**
 * checkWin Func.
 * is number of class SHOW equal number of letters with class Letters?
 * if number of misses  === 5 SHOW overlay 'lose' 
 */
function checkWinBtns(classN, fText, lText){
    overlay.className = classN;
    overlay.style.display = 'flex';
    overlay.firstElementChild.innerText = fText;
    overlay.lastElementChild.innerText = lText;
}
function checkWin() {
    const showClassArr = document.getElementsByClassName('show');
    const letterClassArr = document.getElementsByClassName('letter');
    
    if(showClassArr.length === letterClassArr.length){
        checkWinBtns('win', 'Congratulations you won the Game!', 'Play again!');
        
    }
    if(missed === 5){
        checkWinBtns('lose', 'Game over!', 'Try again!');
    
    }
}