import React from 'react'

const ButtonAuth = ({text, icon, disabled}: any) => {
  return (
    <div className='text-center mt-4'>
    <button className='btn btn-success w-100' type='submit' disabled={disabled}>
    {/* <i className='ri-send-plane-fill align-bottom me-1'></i>{' '}  {text} */}
    <i className={icon + ' align-bottom me-1'}></i>{' '}  {text}
    </button>
  </div>
  )
    // <i className={icon + 'align-bottom me-1'}></i>{' '}  {text}
    // ri-restart-line 
}

export default ButtonAuth
