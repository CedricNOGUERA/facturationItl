import React from 'react'



const TextArea: React.FC<any> = ({placeholder, data, setData, required}) => {
  return (
    <textarea
    className='form-control bg-light border-0'
    rows={3}
    placeholder={placeholder}
    value={data}
    onChange={(e: any) => setData(e.currentTarget.value)}
    required={required}
  ></textarea>
  )
}

export default TextArea
