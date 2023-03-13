import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Behaviour: Calculator
// Store button input to allow multiple operations before calculating
// Combination of button presses will alter values (e.g. "3" + "." + "5" => 3.5)
// Input sanitation: only one decimal (".") per value
//                   no leading (multiple) zeroes
// Operand logic   : last pressed operand overwrites
//     Special case: "-" modifies to negative
// Pressing "="    : If no new input, redo last operation

// input     :  str = "1+2+5-3*4"
//   eval(str) => num result 
//             => setDisplay(result)
//  chunk input=> lastChunk = e.g. "+42"
//             => "=" evaluates combined state + lastChunk, adds lastChunk to combined state

// input flow:
//   start chunk
//   filter valid inputs on chunk
//   add sanitized chunk to state, start new chunk

function App() {
  const [ display,      setDisplay      ] = useState<string>("0");
  const [ lastInput,    setLastInput    ] = useState<string>("");
  const [ currentChunk, setCurrentChunk ] = useState<string>("");
  // data flow:
  // Press button
  //  Capture input value
  //  Validate input
  //  Add to calculation data
  
  const initializeChunk = () => {
    // if input is operand, start new chunk
  }
  const sanitizeChunk = (operandArr : string[], input : string) => {
    /* if (OPERANDS.includes(input)) {              // also handle OPERAND + "-" as negative number
      // commit latest chunk (if !empty) to storage
      // initiate new chunk in state
      // add input to chunk
    } */
  }
  const commitChunk = () => {
    // send chunk to state
  }

  const handleInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const BUTTON = e.target as HTMLButtonElement;
    const INPUT  = BUTTON.innerText;
    
    const OPERANDS: string[] = ["+", "-", "/", "*"];
    const OP_REGEX: RegExp   = /\+|\-|\/|\*/;


    // 

    if (INPUT   == "." && currentChunk.includes("."))           // current chunk contains "." ? return : continue
      return;

    if (display == "0" && INPUT != "." && !OPERANDS.includes(INPUT))
      setDisplay(INPUT);
    else if (OPERANDS.includes(INPUT)  && OPERANDS.includes(lastInput))
      setDisplay(display.slice(0, -1) + INPUT);
    else
      setDisplay(display + INPUT);

    setLastInput(INPUT);
  }

  const handleClear = () => {
    setDisplay     ("0");
    setLastInput   ("");
    setCurrentChunk("");
  }

  const handleCalc = () => {
    // eval(state+chunk);
    // setState(state+chunk);
    // this means pressing "=" again repeats the operation in currentChunk
    setDisplay(eval(display));
  }

  return (
    <div className="calculator">
      <div id='display' > {display} </div>
      <div className='numbers'>
        <button id='zero'     onClick={ handleInput }> 0 </button>
        <button id='one'      onClick={ handleInput }> 1 </button>
        <button id='two'      onClick={ handleInput }> 2 </button>
        <button id='three'    onClick={ handleInput }> 3 </button>
        <button id='four'     onClick={ handleInput }> 4 </button>
        <button id='five'     onClick={ handleInput }> 5 </button>
        <button id='six'      onClick={ handleInput }> 6 </button>
        <button id='seven'    onClick={ handleInput }> 7 </button>
        <button id='eight'    onClick={ handleInput }> 8 </button>
        <button id='nine'     onClick={ handleInput }> 9 </button>
        <button id='decimal'  onClick={ handleInput }> . </button>
      </div>
      <div className='operations'>
        <button id='add'      onClick={ handleInput }> + </button>
        <button id='subtract' onClick={ handleInput }> - </button>
        <button id='multiply' onClick={ handleInput }> * </button>
        <button id='divide'   onClick={ handleInput }> / </button>

        <button id='clear'    onClick={ handleClear }> AC</button>
        <button id='equals'   onClick={ handleCalc  }> = </button>
      </div>
    </div>
  )
}









export default App
