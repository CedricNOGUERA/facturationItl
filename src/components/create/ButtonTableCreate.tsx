import React from 'react'

const ButtonTableCreate = () => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
                <button type='submit' className='btn btn-success'>
                  <i className='ri-save-3-line align-bottom me-1'></i> Valider
                </button>
                <a href='/' className='btn btn-primary'>
                  <i className='ri-download-2-line align-bottom me-1'></i> Télécharger
                </a>
                <a href='/' className='btn btn-danger'>
                  <i className='ri-send-plane-fill align-bottom me-1'></i> Envoyer
                </a>
              </div>
  )
}

export default ButtonTableCreate