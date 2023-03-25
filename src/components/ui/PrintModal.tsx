import { Modal } from 'react-bootstrap'

const PrintModal = ({ show, handleClose, handlePrint }: any) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <div className='modal-content'>
        <div className='modal-body p-5 text-center'>
          <lord-icon
            src='https://cdn.lordicon.com/nocovwne.json'
            trigger='hover'
            colors='primary:#121331,secondary:#08a88a'
            style={{ width: '90px', height: '90px' }}
          ></lord-icon>
          <div className='mt-4 text-center'>
            <h4>Voulez-vous vraiement imprimer ce document ?</h4>
            <p className='text-muted fs-15 mb-4'>
            "Avant d'imprimer, pensez à l'impact environnemental et privilégiez la lecture en ligne ou l'utilisation de papier recyclé et l'impression recto-verso
            </p>
            <div className='hstack gap-2 justify-content-center remove'>
              <button
                className='btn btn-link link-danger fw-medium text-decoration-none'
                id='deleteRecord-close'
                data-bs-dismiss='modal'
                onClick={handleClose}
              >
                <i className='ri-close-line me-1 align-middle'></i> Fermer
              </button>
              <button
                className='btn btn-success'
                id='delete-record'
                onClick={() => {
                  handleClose()
                  handlePrint()}}
                data-bs-dismiss='modal'
              >
                Imprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PrintModal
