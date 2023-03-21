import React from 'react'

const ButtonTableCreate = () => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <button type='submit' className='btn btn-success' aria-label='save'>
        <i className='ri-save-3-line align-bottom me-1'></i> Valider
      </button>
    </div>
  )
}

export default ButtonTableCreate