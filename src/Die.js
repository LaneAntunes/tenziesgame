import React from 'react'
import './App.css';

function Die(props) {

    return (
        <div onClick={props.handleClick} className={props.isHeld === false ? 'die' : 'green-die'}>
            <h2 className='die-numb'>{props.value}</h2>
        </div>
    )
}

export default Die