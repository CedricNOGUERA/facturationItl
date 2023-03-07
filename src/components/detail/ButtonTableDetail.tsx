import React from 'react'

const ButtonTableDetail = () => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <a href='javascript:window.print()' className='btn btn-success'>
        <i className='ri-printer-line align-bottom me-1'></i> Imprimer
      </a>
      <a href='/' className='btn btn-primary'>
        <i className='ri-download-2-line align-bottom me-1'></i> Télécharger
      </a>
    </div>
  )
}

export default ButtonTableDetail