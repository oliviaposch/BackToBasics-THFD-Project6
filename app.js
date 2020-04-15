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
    'The ball is in your court',
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
    //do stuff to any arr that is passed in

}
//calling getRandomPhraseAsArray should have the phrasesArr array as an argument
//console.log(phrasesArr); 
