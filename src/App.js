import './App.css';
import Die from './Die';
import React, { useEffect, useState } from 'react'
import { nanoid } from "nanoid"

import Confetti from 'react-confetti'

function App() {
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  const [numbArray, setNumArray] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)


  useEffect(() => {

    const allHeld = numbArray.every(die => die.isHeld)

    // array of numbers held + not held are 7s
    let sameNumber = numbArray.map(numbHeld => {
      return numbHeld.isHeld === true ? numbHeld.value : 7
    })

    function allAreEqual(array) {
      const result = array.every(element => {
        if (element === array[0] && element !== 7) {
          return true;
        }
      });
      return result;
    }

    setTenzies(prev => allAreEqual(sameNumber) === true && allHeld === true ? true : false)

  }, [numbArray])

  const [timesClicked, setTimesClicked] = useState(0)


  function holdDice(id) {

    let checkDice = numbArray.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    })

    setNumArray(prev => checkDice)
  }

  function resetGame() {
    let reset = numbArray.map(resetNumb => {
      return { ...resetNumb, isHeld: false, value: Math.ceil(Math.random() * 6) }
    })
    setNumArray(prev => reset)
  }

  let dieElements = numbArray.map(eachDie => {
    return <Die
      value={eachDie.value}
      key={eachDie.id}
      isHeld={eachDie.isHeld}
      handleClick={() => holdDice(eachDie.id)}
    />
  })

  function rollDice() {
    setTimesClicked(prev => prev + 1)
    const checkIfHelp = numbArray.map(eachBtn => {
      return eachBtn.isHeld === false ? { ...eachBtn, value: Math.ceil(Math.random() * 6) } : eachBtn
    })
    setNumArray(prev => checkIfHelp)
  }


  return (
    < main >
      {tenzies && <Confetti />} <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>{dieElements}</div>
      <div><button className='roll-dice-btn' onClick={tenzies === false ? rollDice : resetGame}>{`${tenzies === false ? 'Roll' : 'Start new Game'}`}</button>
        {timesClicked !== 0 && <p className='times-clicked'>{timesClicked} Click{timesClicked === 1 ? '' : `${'s'}`}</p>}</div>
    </main >
  )
}

export default App;
