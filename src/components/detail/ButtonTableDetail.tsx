import React from 'react'

interface Props{
  handlePrint: () => void
  handleShow: any
  handleShowSendModal: any
  title: string
}
const ButtonTableDetail: React.FC<Props> = ({handlePrint, handleShow , handleShowSendModal, title}) => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      <button onClick={handlePrint} className='btn btn-success' aria-label='Print'>
        <i className='ri-printer-line align-bottom me-1'></i> Imprimer
      </button>
      {title !== 'overview' && (
        <>
          <button onClick={handleShow} className='btn btn-primary' aria-label='Qrcode'>
            <i className='ri-qr-code-line align-bottom me-1'></i> QrCoder
          </button>
          <button onClick={handleShowSendModal} className='btn btn-danger' aria-label='Envoyé'>
            <i className='ri-send-plane-fill align-bottom me-1'></i> Envoyé
          </button>
        </>
      )}
    </div>
  )
}

export default ButtonTableDetail