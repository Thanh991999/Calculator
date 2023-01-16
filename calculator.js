//  Calculator width object

const numberBtns      = document.querySelectorAll('.number');
const operationBtns   = document.querySelectorAll('.operation');
const resultRtn       = document.querySelector('.btn--equal');
const displayPrevious = document.querySelector('.screen__math');
const displayCurrent  = document.querySelector('.screen__result');
const clearBtn        = document.querySelector('.btn--ce');
const deleteBtn       = document.querySelector('.btn--dl');
const darkmodeBtn     = document.querySelector('.header__menu');
const app             = document.querySelector('.app');

const calculator = {

  countResult : 0,

  renderDisplay: function () {

    if (this.operandCurrent.length >= 6) {
      displayCurrent.style.fontSize = '65px';
    }
    else {
      displayCurrent.style.fontSize = '106px';
    }

    displayCurrent.value = this.operandCurrent;
    if (this.operation != undefined ) {
      displayPrevious.value = `${this.operandPrevious} ${this.operation}`;
    }
    else {
      displayPrevious.value = this.operandPrevious;
    }
  },

  clear: function() {
    this.operandCurrent = '';
    this.operandPrevious = '';
    this.operation = undefined;
  },

  handleEvent: function() {

    const _this = this;
    // appendNumber
    numberBtns.forEach(function(numberBtn){
      numberBtn.onclick = function(e){
        if (_this.countResult > 0) {
          _this.clear();
          _this.renderDisplay();
          _this.countResult = 0;
        }
        let number = e.target.textContent
        _this.appendNumber(number);
        _this.renderDisplay();
      }
    })

    operationBtns.forEach(function(operationBtn){
      operationBtn.onclick = function(e){
        _this.countResult = 0;
        _this.appendOperand(e.target.textContent);
        _this.renderDisplay();
      }
    })

    clearBtn.onclick = function() {
      _this.clear();
      _this.renderDisplay();
    }

    deleteBtn.onclick = function() {
      if (typeof(_this.operandCurrent) === 'number') return
      _this.operandCurrent = _this.operandCurrent.slice(0, _this.operandCurrent.length - 1);
      _this.renderDisplay();

    }

    resultRtn.onclick = function() {
      _this.countResult ++;
      _this.calculate();
      _this.renderDisplay();
    }

    darkmodeBtn.onclick = function() {
      app.classList.toggle('dark');
    }

  },

  appendNumber: function(number) {
    if (number === '.' && this.operandCurrent.includes('.')) return
    this.operandCurrent = this.operandCurrent.toString() + number.toString();
  },

  appendOperand: function(operand) {
    if( this.operandCurrent === '' ) return;
    if (this.oprerandPrevious !== '') {
      this.calculate();
    }
    this.operation = operand;
    this.operandPrevious = this.operandCurrent;
    this.operandCurrent = '';

  },

  calculate: function() {
    let prev = parseFloat(this.operandPrevious);
    let next = parseFloat(this.operandCurrent);
    let result;

    if (isNaN(next) || isNaN(prev)) return;

    switch (this.operation) {
      case '+': {
        result = prev + next;
        break;
      }
      case '-': {
        result = prev - next;
        break;
      }
      case '*': {
        result = prev * next;
        break;
      }
      case '/': {
        result = prev / next;
        break;
      }
      default:
        return
    }

    console.log(prev, next, result, this.operation);

    this.operandCurrent = result;
    this.operandPrevious = `${prev} ${this.operation} ${next} = `;
    this.operation = undefined;

  },

  start: function (){
    this.clear();
    this.renderDisplay();
    this.handleEvent();
  }

}
calculator.start();