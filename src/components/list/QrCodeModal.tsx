import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import QrCode from '../ui/QrCode'

interface qrCodeModalProps {
    title: string
    numDoc: string
    qrData: string
    show: boolean
    handleClose: () => void
    handleShow: () => void
}

const QrCodeModal: React.FC<qrCodeModalProps> = ({title, numDoc, qrData, show, handleClose, handleShow}) => {
    return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header className='text-center' closeButton>
      <Modal.Title className='w-100 text-upperCase'>{title.toUpperCase()} N° : {numDoc}</Modal.Title>
    </Modal.Header>
    <Modal.Body className='w-75 p-5 m-auto'>

     <QrCode id={qrData} title={title} />
    </Modal.Body>
    <Modal.Footer>
 
      <Button variant="primary" onClick={handleClose}>Fermer</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default QrCodeModal
