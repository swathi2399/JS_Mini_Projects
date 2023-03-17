class Calculator {
     constructor(prevOperandEle,currOperandEle) {
        this.prevOperandEle = prevOperandEle
        this.currOperandEle = currOperandEle
        this.clear()
     }
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currOperand = this.currOperand.toString().slice(0,-1)

    }
    appendNum(number) {
        if (number =='.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()


    }
    chooseOperation(operation) {
        if(this.currOperand == '') return
        if(this.prevOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''

    }
    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
            
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
    getDisplayNum(number) {
        const stringNum = number.toString()
        const integerNum = parseFloat(stringNum.split('.')[0])
        const decimal = stringNum.split('.')[1]
        let intDisplay
        if(isNaN(integerNum)) {
            intDisplay = ''
        }else {
            intDisplay = integerNum.toLocaleString('en', {
                maximumFractionDigits:0 })
        }
        if (decimal != null) {
            return `${intDisplay}.${decimal}`
        }else {
            return intDisplay
        }
       
    }
    updateDisplay() {
        this.currOperandEle.innerText = this.getDisplayNum(this.currOperand)
        if(this.operation != null){
            this.prevOperandEle.innerText = `${this.getDisplayNum(this.prevOperand)} ${this.operation}`
        }else {
            this.prevOperandEle.innerText = ''
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allclearButton = document.querySelector('[data-allclear]')
const deleteButton = document.querySelector('[data-delete]')
const prevOperandEle = document.querySelector('[data-previous-operand]')
const currOperandEle = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandEle,currOperandEle)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})

allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})