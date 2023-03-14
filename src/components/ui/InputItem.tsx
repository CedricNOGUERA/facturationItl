import React from 'react'

const InputItem = ({type, placeholder, data, setData, indx, inputName, required}: any) => {



  return (
    <input
      type={type}
      className='form-control bg-light border-0'
      placeholder={placeholder}
      value={data}
      onChange={(e) => setData(e, indx, inputName)}
      required={required}
    />
  )
}

export default InputItem
