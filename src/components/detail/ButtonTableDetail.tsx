import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  handlePrint: () => void
  htmlToPdf: any
  handleShow: any
  handleShowSendModal: any
  title: string
  docId: string
}
const ButtonTableDetail: React.FC<Props> = ({
  handlePrint,
  htmlToPdf,
  handleShow,
  handleShowSendModal,
  title,
  docId,
}) => {
  return (
    <div className='hstack gap-2 justify-content-end d-print-none mt-4'>
      {title !== 'overview' && (
        <>
          <Link className='text-light' to={`/${docId}/update-${title}`}>
            <button className='btn btn-secondary' aria-label='update'>
              <i className='ri-pencil-fill align-bottom me-1'></i>
              Modifier
            </button>
          </Link>
          |
        </>
      )}
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

export default React.memo(ButtonTableDetail)
