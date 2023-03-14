import React from 'react'

const Input = ({type, placeholder, data, setData, required, readOnly }: any) => {
  return (
    <input
    type={type}
    className={readOnly === true ? 'form-control bg-light border-0 text-end' : 'form-control bg-light border-0'}
    placeholder={placeholder}
    value={data}
    onChange={(e: any) => setData(e.currentTarget.value)}
    required={required}
    readOnly={readOnly}
  />
  )
}

export default Input
