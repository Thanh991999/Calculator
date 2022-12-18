const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const result = $('.equal');
const displayMath = $('.screen__math');
const displayResult = $('.screen__result');
const keyNumbers = $$('.number');
const board = $('.board');
const operations = $$('.operation');
const btnCe = $('.btn--ce');
const btnequal = $('.btn--equal');


const myCalculator = {

  checkOperation: 0,
  arrOperation: [],
  checkEndCalculator: 0,

  render: function() {
    displayMath.innerHTML = '0';
  },

  clear: function() {
    displayMath.textContent = '0';
    displayResult.textContent = '0';
    board.dataset['curentValue'] = '';
    board.dataset['num1'] = '';
    board.dataset['num2'] = '';
    board.dataset['operation'] = '';
    board.dataset['result'] = '';
    myCalculator.checkOperation = 0;
  },

  handleEvent: function() {
    board.onclick = function(event) {
      if(!event.target.closest('button')) return
      const key = event.target;
      const keyValue = key.textContent;
      let displayValue = displayMath.textContent;

      if (keyValue === btnCe.innerHTML){
        myCalculator.clear();
      }

      if (key.classList.contains('number')) {

        // if (myCalculator.checkEndCalculator > 0) {
        //   console.log(1);
        //   myCalculator.clear();
        //   board.dataset['curentValue'] = keyValue;
        //   displayValue = 
        //   myCalculator.checkEndCalculator = 0;
        //   return
        // }

        if( displayValue === '0' ) {
          displayMath.textContent = keyValue;
        }
        else {
          displayMath.textContent = displayValue + keyValue;
        }

        let curentValue = displayMath.textContent;
        board.dataset['curentValue'] = curentValue;

      }

      if (key.classList.contains('operation')) {
        if ( myCalculator.checkOperation === 0 ) {
          firstNum = board.getAttribute('data-curent-value');
          board.dataset['num1'] = firstNum;
          board.dataset['operation'] = keyValue;

          displayMath.textContent = displayValue + keyValue;

          myCalculator.arrOperation = board.getAttribute('data-curent-value');

          myCalculator.checkOperation++;

        }
        else {
          let num1 = +board.getAttribute('data-num1');
          let operation = board.getAttribute('data-operation');
          myCalculator.arrOperation = board.getAttribute('data-curent-value');
          let num2 = +myCalculator.arrOperation.replace(num1,'').replace(operation,'');
          board.dataset['num2'] = num2;
          console.log(num1 ,num2, operation);


          let result = myCalculator.handleCalculations(num1, num2, operation);
          board.dataset['result'] = result;

          board.dataset['num1'] = result;
          displayResult.textContent = result;
          num1 = result;

          board.dataset['operation'] = keyValue;
          operation = board.getAttribute('data-operation');

          displayMath.textContent = num1 + operation;


          // console.log(num1, operation, num2);

        }
        myCalculator.checkOperation = 1;
        // console.log(myCalculator.checkOperation);
      }

      if (keyValue === '=') {

        // if(board.getAttribute('data-num1') === null) {
        //   console.log('hello');
        //   displayResult.textContent = board.getAttribute('data-curent-value');
        //   return
        // };

        let num1 =  +board.getAttribute('data-num1');
        console.log(myCalculator.arrOperation);
        let operation = board.getAttribute('data-operation');
        let num2 = +displayMath.textContent.replace(num1,'').replace(operation, '');

        board.dataset['num2'] = num2;

        let result = myCalculator.handleCalculations(num1, num2, operation);
        board.dataset['result'] = result;
        displayResult.textContent = result;

        myCalculator.checkEndCalculator ++;
      }


    }
  },
  handleCalculations: function(num1, num2, operation) {
    if (operation === '+') return num1 + num2;
    if (operation === '-') return num1 - num2;
    if (operation === '*') return num1 * num2;
    if (operation === '/') return num1 / num2;

  },
  // plusFunction: (a, b) => a + b,

  start: function() {
    this.render();
    this.handleEvent();
  }
}

myCalculator.start();
