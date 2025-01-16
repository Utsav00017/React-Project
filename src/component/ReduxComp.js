import React from 'react'
import { useAppSelector } from '../redux/hooks'

function ReduxComp() {
    const count = useAppSelector(state => state.counter)
  return (
    <div>
        <h1>Counter : {count}</h1>
    </div>
  )
}

export default ReduxComp