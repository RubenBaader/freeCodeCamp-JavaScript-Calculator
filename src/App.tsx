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

// Let's chunk the state - each operator divides the input into a new chunk
//    => allows ops on only current chunk - decimal numbers, sign change?
// Combine all chunks in display -- keep user abreast of state

function App() {
  const [display,   setDisplay  ] = useState<string>("0")
  const [lastInput, setLastInput] = useState<string>("")

  const handleInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const input  = button.innerText;
    
    const OPERANDS: string[] = ["+", "-", "/", "*"];
    // const OP_REGEX: RegExp = /\+|\-|\/|\*/                     // <= last resort
    if (input   == "." && lastInput == ".")           // current chunk contains "." ? return : continue
      return;
    if (display == "0" && input != "." && !OPERANDS.includes(input))
      setDisplay(input);
    else if (OPERANDS.includes(input)  && OPERANDS.includes(lastInput))
      setDisplay(display.slice(0, -1) + input);
    else
      setDisplay(display + input);

    setLastInput(input);
  }

  const handleClear = () => {
    setDisplay  ("0");
    setLastInput("");
  }

  const handleCalc = () => {
    // eval(state);
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
