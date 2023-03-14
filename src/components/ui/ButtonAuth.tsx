import React from 'react'

const ButtonAuth = ({text}: any) => {
  return (
    <div className='text-center mt-4'>
    <button className='btn btn-success w-100' type='submit'>
      {text}
    </button>
  </div>
  )
}

export default ButtonAuth
