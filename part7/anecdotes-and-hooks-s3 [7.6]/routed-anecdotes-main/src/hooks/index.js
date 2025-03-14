import { useState } from 'react'


export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    //console.log('value', value)
    setValue(event.target.value)
  }

  const reset = () => {
    //if(r === false) {
    //console.log('here')
    
    setValue('')
  
    
  }

  return {
    name,
    value,
    onChange, 
    reset
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}