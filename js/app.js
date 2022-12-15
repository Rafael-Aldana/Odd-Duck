'use strict';

// **************** GLOBALS ******************
let votingRounds = 25;
let productArray = [];


// **************** DOM WINDOWS **************
let imgContainer = document.getElementById("image-Cont");
let imgOne = document.getElementById('img-1');
let imgTwo = document.getElementById('img-2');
let imgThree = document.getElementById('img-3');

let resultsBttn = document.getElementById('results-bttn');
let resultsList = document.getElementById('results-container');
// ********* CANVAS ELEM FOR CHART ***********

let canvasElem = document.getElementById('Chart');


// *************** CONSTRUCTOR FUNCTION *************
function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}


// ************** HELPER FUNCTIONS / UTILITIES / METHODS **********

// ************** THIS FUNCTION RANDOMIZES THE INDEX IN THE ARRAY ******************
function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

// ********** THIS FUNCTION RENDERS THE IMGS *********
let indexArray = [];
function renderImg() {
  while (indexArray.length < 6) {
    let randNum = randomIndex();
    if (!indexArray.includes(randNum)) {
      indexArray.push(randNum);
    }
  }
  // ************** THIS REASSIGNS TWO OF THE VARIABLES **************
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();

  //   let imgOneIndex = randomIndex();
  //   let imgTwoIndex = randomIndex();
  //   let imgThreeIndex = randomIndex();
  // //  ******** VALIDATION TO MAKE SURE NUMBERS ARE UNIQUE *********************
  // while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {

  //   imgOneIndex = randomIndex();
  //    imgTwoIndex = randomIndex();
  //    imgThreeIndex = randomIndex();
  //  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;
  imgOne.alt = `This is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.alt = `This is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.alt = `This is an image of ${productArray[imgThreeIndex].name}`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

// ************* EVENT HANDLERS ****************
// *************** THIS IS THE EVENT HANDLER ****************
function handleClick(event) {

  let imgClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }

  votingRounds--;

  renderImg();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    // *************** LOCAL STORAGE STARTS HERE *************
    let stringifiedProducts = JSON.stringify(productArray);
    localStorage.setItem('myProducts', stringifiedProducts);
  }
}

function handleResults() {
  if (votingRounds === 0) {
    renderChart();
  }

  //   for (let i = 0; i < productArray.length; i++) {
  //     let listElem = document.createElement('list');
  //     listElem.innerText = `${productArray[i].name} had ${productArray[i].votes} votes and was seen ${productArray[i].views} times.`;
  //     resultsList.appendChild(listElem);
  //   }
  //   resultsList.removeEventListener('click', handleResults);
  // }
}
// ************** THIS FUNCTION RENDERS THE CHART ********************
function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundcolor: 'red',
      },
      {
        label: '# of Views',
        data: productVotes,
        borderWidth: 1,
        backgroundcolor: 'blue',
      },

      ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let chart = new Chart(canvasElem, chartObj);
}

// ************* EXECUTABLE CODE ****************
// ************ THIS PULLS DATA FROM THE LOCAL STORAGE *******************
let retreivedProducts = localStorage.getItem('myProducts');
let parsedProducts = JSON.parse(retreivedProducts);
// ************************************************************************
// ************* THIS IF STATEMENT CHECKS IF THERE'S DATA STORED FROM PREVIOUS SESSIONS *************************************
if (retreivedProducts) {
  productArray = parsedProducts;
} else {
  let bag = new Product('bag', 'jpg');
  let banana = new Product('banana', 'jpg');
  let bathroom = new Product('bathroom', 'jpg');
  let boots = new Product('boots', 'jpg');
  let breakfast = new Product('breakfast', 'jpg');
  let bubblegum = new Product('bubblegum', 'jpg');
  let chair = new Product('chair', 'jpg');
  let cthulhu = new Product('cthulhu', 'jpg');
  let dogDuck = new Product('dog-duck', 'jpg');
  let dragon = new Product('dragon', 'jpg');
  let pen = new Product('pen', 'jpg');
  let petSweep = new Product('pet-sweep', 'jpg');
  let scissors = new Product('scissors', 'jpg');
  let shark = new Product('shark', 'jpg');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun', 'jpg');
  let unicorn = new Product('unicorn', 'jpg');
  let waterCan = new Product('water-can', 'jpg');
  let wineGlass = new Product('wine-glass', 'jpg');

  productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
}
renderImg();

imgContainer.addEventListener('click', handleClick);

resultsBttn.addEventListener('click', handleResults);