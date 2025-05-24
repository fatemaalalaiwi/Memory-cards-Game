

const startGame = document.querySelector(".firstPage-button >span");



startGame.onclick = function() {
  let yourName = prompt('What is your name?');
  console.log(yourName);

  if (yourName ==''|| yourName == null){
    document.querySelector('.name span').innerHTML='unknown';
  }else {
     document.querySelector('.name span').innerHTML=yourName;
  }
// remove the first page in both with nme or whithowt
   document.querySelector('.firstPage-button').remove()


};
// 1 step for restart
const restartButton =document.querySelector('.restart-button');

// 3rd step for reset massaga to 0.
const handle  =(event) => {
    // Reset wrong tries count(message)
    document.querySelector('.tries span').textContent = '0';
    // 4th step Flip all cards back and remove match classes
    const cards = document.querySelectorAll('.game-block');
    cards.forEach(card => {
        card.classList.remove('is-flipped', 'has-match');
        
    });} 
// 2 step for restart
restartButton.addEventListener('click', handle);
    // Code to reset the game will go here

// Duration for 1 second
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// it will create array for Blocks container by(array.form)
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys(0-19)
let orderRange = Array.from(Array(blocks.length).keys());

// change the key(id) randomly
 orderRange = shuffle(orderRange);
// console.log(orderRange)


// loop for Game Blocks to make order list by index`
blocks.forEach((block, index) => {
  // Add Order Property
  block.style.order = orderRange[index];
  
  //(B) Add Click Event
  block.addEventListener('click', function () {

    //  if press any block it will flip by using the flip function
    flipBlock(block);

  });

});

//  (A)Flip Block Function for each bloch(animation)
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards from blocks array
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // now we need 2 Step 1- Clicking Function
    stopClicking();
    // 2-Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }

}

// Stop Clicking Function
function stopClicking() {

  // Add Class No Clicking on the Container
  blocksContainer.classList.add('no-clicking');

  // Wait Duration
  setTimeout(() => {

    // Remove Class No Clicking After The Duration of i sec that is 1000
    blocksContainer.classList.remove('no-clicking');

  }, 1000);

}

// Check every 2 block Block
function checkMatchedBlocks(firstBlock, secondBlock) {
 // the numper shown in top titel of tries
  let triesElement = document.querySelector('.tries span');
// if borh blockes is equal
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
   //remove is flipped
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
   //add has match
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

 document.getElementById('matcing').play();


// if diffrent
  } else {
//usinh parsInt coz we need integar
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
      
    }, duration);

     document.getElementById('fail').play();

  }

}


// Check if all cards have been matched
const matchedCards = document.querySelectorAll('has-match');
if (matchedCards.length === blocks.length) {
  // win actions
  youWin();
}

function youWin() {
   document.getElementById('win').play();
 
}






// Shuffle Function
function shuffle(array) {

  //  Variables
    let currentValue = array.length;
    let  tempValue;
    let random;

  while (currentValue > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * currentValue);
    // Decrease Length of array  By One
    currentValue -= currentValue;
    
    //steps to make random array list element
    // [first] Save Current Element in the temporary value
        tempValue = array[currentValue];

    // [second] save the random element in the current value
        array[currentValue] = array[random];

    // [3] save the temporary value  in the randome place 
        array[random] = tempValue;

  }
  return array;
}

