//  calculator width classes es6

class Calculator {
  constructor() {
    this.numberBtns      = document.querySelectorAll('.number');
    this.operationBtns   = document.querySelectorAll('.operation');
    this.resultBtn       = document.querySelector('.btn--equal');
    this.displayPrevious = document.querySelector('.screen__math');
    this.displayCurrent  = document.querySelector('.screen__result');
    this.clearBtn        = document.querySelector('.btn--ce');
    this.deleteBtn       = document.querySelector('.btn--dl');
    this.darkmodeBtn     = document.querySelector('.header__menu');
    this.app             = document.querySelector('.app');
    this.screen          = document.querySelector('.screen');
    this.countResult     = 0;
    this.isRenderDisplay = false;
    this.countOperation  = 0;

    this.clear();
    this.renderDisplay();
    this.handleEvent();
  }

  renderDisplay() {

    this.displayCurrent.style.fontSize = (this.operandCurrent.toString().length >= 6) ? '65px' : '106px';

    this.displayCurrent.value = this.operandCurrent;

    if ( this.isRenderDisplay ) {
      this.displayPrevious.value = `${this.operandPrevious} ${this.operation}`;
    }
    else {
      this.displayPrevious.value = this.operandPrevious;
    }

  }

  clear() {
    this.operandCurrent  = '';
    this.operandPrevious = '';
    this.operation       = '';
    this.countOperation  = 0;
  }

  handleEvent() {
    const _this = this;

    this.numberBtns.forEach(function(numberBtn) {
      numberBtn.onclick = function(e) {
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

    this.operationBtns.forEach(function(operationBtn){
      operationBtn.onclick = function(e){
        _this.countResult = 0;
        _this.appendOperand(e.target.textContent);
        _this.renderDisplay();
        _this.countOperation ++;
      }
    })

    this.clearBtn.onclick = function() {
      _this.clear();
      _this.renderDisplay();
    }

    this.deleteBtn.onclick = function() {
      if (typeof(_this.operandCurrent) === 'number') return
      _this.operandCurrent = _this.operandCurrent.slice(0, _this.operandCurrent.length - 1);
      _this.renderDisplay();

    }

    this.resultBtn.onclick = function() {
      if (_this.operation == '') return;
      _this.countResult ++;
      _this.calculate();
      _this.renderDisplay();
    }

    this.darkmodeBtn.onclick = function() {
      _this.app.classList.toggle('dark');
    }

    this.displayCurrent.oninput = function(e) {
      console.log(eval(e.target.value));
    }

  }

  appendNumber(number) {
    if (number === '.' && this.operandCurrent.includes('.')) return
    this.operandCurrent = this.operandCurrent.toString() + number.toString();
  }

  appendOperand(operand) {
    // if( this.operandCurrent === '' ) return;
    if (this.oprerandPrevious !== '') {
      this.calculate();
    }

    this.operandPrevious = this.operandCurrent;
    this.operandCurrent = '';
    this.operation = operand;
    this.isRenderDisplay = true;

  }

  calculate() {
    let prev = parseFloat(this.operandPrevious);
    let next = parseFloat(this.operandCurrent);

    if (isNaN(next) || isNaN(prev) || this.operation == '') return;
    let result = eval(` ${prev} ${this.operation} ${next}`);

    result = (result != "Infinity") ? result : 'Not a number'

    console.log(prev, next, result, this.operation);

    result = Math.round((result + Number.EPSILON) * 100) / 100;

    this.operandCurrent = result;
    this.operandPrevious = `${prev} ${this.operation} ${next} = `;
    this.isRenderDisplay = false;
    this.operation = '';

  }

}

const calculatorObj = new Calculator();


