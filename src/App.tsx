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
  const [ calc,         setCalc         ] = useState<string>("");
  const [ lastInput,    setLastInput    ] = useState<string>("");
  const [ currentChunk, setCurrentChunk ] = useState<string>("0");
  // data flow:
  // Press button
  //  Capture input value
  //  Validate input
  //  Add to calculation data
  
/*   lastIn	currIn  currIn..
      	       +	    -	      *	      /	      .
      +	    replace	replace	replace	replace	"+0."
      -	    replace	  "+"	  replace	replace	"-0."
      *	    replace	  "*-"	replace	replace	"*0."
      /	    replace	  "/-"	replace	replace	"/0."
      .	    ignore	ignore	ignore	ignore	ignore
 */
  
  const sanitizeInput = (input : string) => {
    // validate input according to filter
    
    // do not allow leading double zeros
    const num : RegExp = /[0-9]/
    // console.log(num.test(input))
    if (currentChunk == "0" && num.test(input)) {
      setCurrentChunk(input);
      return;
    }
    // filter according to last input
      const OPERANDS: string[] =          ["+", "-", "/", "*"];
    // Default case: Replace last operand with new operand
    if (OPERANDS.includes(lastInput) && ["+",      "/", "*"].includes(input)) {
      setCurrentChunk(currentChunk.slice(0,-1) + input);
      return;
    }
    // "-" is special - creates negative numbers
    if (lastInput == "-" && input == "-") {
      setCurrentChunk(currentChunk.slice(0,-1) + "+");
      return;
    }
    if (["/", "*"].includes(lastInput) && input == "-") {
      setCurrentChunk(currentChunk + input);
      return;
    }
    if (lastInput == "+" && input == "-") {
      setCurrentChunk(currentChunk + input);
      return;
    }

    // Decimal (".") creates decimal numbers
    if (OPERANDS.includes(lastInput) && input == ".") {
      setCurrentChunk(currentChunk + "0" + input);
      return;
    }
    // check for multiple "." in chunk
    if (currentChunk.includes(".") && input == ".")
      return;
    // add input to chunk
    else
      setCurrentChunk(currentChunk + input);

    setLastInput(input);
  }
  const newChunk = () => {
    // if input is operand, start new chunk
    setCalc(calc+currentChunk);
    setCurrentChunk("");
  }
  const commitChunk = () => {
    // send chunk to state
  }

  const handleInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    const BUTTON = e.target as HTMLButtonElement;
    const INPUT  = BUTTON.innerText;
    
    const OPERANDS: string[] = ["+", "-", "/", "*"];
    const OP_REGEX: RegExp   = /\+|\-|\/|\*/;

    sanitizeInput(INPUT);
/* 
    if (INPUT   == "." && currentChunk.includes("."))           // current chunk contains "." ? return : continue
      return;

    if (calc == "0" && INPUT != "." && !OPERANDS.includes(INPUT))
      setCalc(INPUT);
    else if (OPERANDS.includes(INPUT)  && OPERANDS.includes(lastInput))
      setCalc(calc.slice(0, -1) + INPUT);
    else
      setCalc(calc + INPUT);

    setLastInput(INPUT); */
  }

  const handleClear = () => {
    setCalc        ("");
    setLastInput   ("");
    setCurrentChunk("0");
  }

  const handleCalc = () => {
    // eval(state+chunk);
    // setState(state+chunk);
    // this means pressing "=" again repeats the operation in currentChunk
    setCalc(eval(calc + currentChunk));
  }

  return (
    <div className="calculator">
      <div id='display' > CALC: {calc} CHUNK: {currentChunk} </div>
      {/* <div id='display' > {calc + currentChunk} </div> */}
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
