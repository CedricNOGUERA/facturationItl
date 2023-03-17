import React from 'react'

interface Props{
  handlePrint: () => void
  handleShow: any
}
const ButtonTableDetail: React.FC<Props> = ({handlePrint, handleShow}) => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <button onClick={handlePrint} className='btn btn-success'>
        <i className='ri-printer-line align-bottom me-1'></i> Imprimer
      </button>
      <button  onClick={handleShow} className='btn btn-primary'>
        <i className='ri-qr-code-line align-bottom me-1'></i> QrCode
      </button>
    </div>
  )
}

export default ButtonTableDetail