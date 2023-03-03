import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="calculator">
      <div id='display'> {count} </div>
      <div className='numbers'>
        <button id='zero'    > 0 </button>
        <button id='one'     > 1 </button>
        <button id='two'     > 2 </button>
        <button id='three'   > 3 </button>
        <button id='four'    > 4 </button>
        <button id='five'    > 5 </button>
        <button id='six'     > 6 </button>
        <button id='seven'   > 7 </button>
        <button id='eight'   > 8 </button>
        <button id='nine'    > 9 </button>
        <button id='decimal' > . </button>
      </div>
      <div className='operations'>
        <button id='clear'   > AC </button>
        <button id='add'     > + </button>
        <button id='subtract'> - </button>
        <button id='multiply'> * </button>
        <button id='divide'  > / </button>
        <button id='equals'  > = </button>
      </div>
    </div>
  )
}









export default App
