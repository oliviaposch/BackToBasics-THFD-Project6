const keyBoard = document.getElementById('qwerty'); //console.log(keyBoard);
const lettersButtonsContainer = document.getElementById('phrase'); // buttons container UL for the single letter 
let missed = 0; // to track the guesses the player has missed 

//eventListener start game
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (e) => {
    if(e.target.className == 'btn__reset'){
        overlay.style.display = 'none';
    }
    
});
//phrases Array
const phrasesArr = [
    'Easy Peasy',
    'The ball is in your cort',
    'hit the hay',
    'A penny for your thoughts',
    'A piece of cake'
];
/**
 * randomly phrasesArr array
 * choose a phrase
 * split choosed phrase into a new array of characters 
 * the function an array as a parameter / returns an array of characters
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
 * for each Char in the Arr. create a LI
 * put the Char inside of the LI
 * append the LI to the #phrase UL in HTML
 * If the Char in the Arr is a Letter and not Space, add class 'letter' to LI
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
const phrasesArrChars = getRandomPhraseAsArray(phrasesArr);
addPhraseToDisplay(phrasesArrChars);

/**
 * FUNCTION HAVE ONE PARAMETER: the Btn the player has clicked
 * function get all Elements with class Letter
 * loop over the letters and check:
 *  if they match the Letter in the Btn the player has chosen
 * if there's match , add 'show' class to the list item
 * store the matching letter inside of a variable, and return that letter
 * if a match wasn't found, the function return null 
 */
function checkLetter(userGessBtn){

    const classLetterLi = document.getElementsByClassName('letter'); //console.log(classLetterLi);

    for (let i = 0; i < classLetterLi.length; i++) {
        if( classLetterLi[i].innerText.toLowerCase() === userGessBtn.toLowerCase()){
            //add show class just to the matched letter?
            classLetterLi[i].classList.add('show');
            console.log(classLetterLi[i]);
        }
        
    }
    return classLetterLi; 

}
checkLetter('a');