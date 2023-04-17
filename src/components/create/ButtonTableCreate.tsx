import React from 'react'
import { Spinner } from 'react-bootstrap'

const ButtonTableCreate = ({isLoadingCreate}: any) => {
  console.log(isLoadingCreate)
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <button type='submit' className='btn btn-success' aria-label='save'>
        {isLoadingCreate ? <Spinner variant='light' size='sm' /> : <i className='ri-save-3-line align-bottom me-1'></i>} Valider
      </button>
    </div>
  )
}

export default ButtonTableCreate