import React from 'react'

interface Props{
  handlePrint: () => void
}
const ButtonTableDetail: React.FC<Props> = ({handlePrint}) => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <button onClick={handlePrint} className='btn btn-success'>
        <i className='ri-printer-line align-bottom me-1'></i> Imprimer
      </button>
      <a href='/' className='btn btn-primary'>
        <i className='ri-download-2-line align-bottom me-1'></i> Télécharger
      </a>
    </div>
  )
}

export default ButtonTableDetail