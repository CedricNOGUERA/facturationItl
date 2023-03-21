import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'

const SendEmailModal = ({
  showSendModal,
  handleCloseSendModal,
  form,
  sendEmail,
  filteredData,
  isMail,
  docType,
}: any) => {
  const [email, setEmail] = React?.useState<string>()

  React.useEffect(() => {
    
    setEmail(filteredData?.email_customer)
    
  }, [filteredData?.email_customer, setEmail]);

  return (
    <Modal show={showSendModal} onHide={handleCloseSendModal}>
      <Modal.Header closeButton className='px-5'>
        <Modal.Title>
          Envoyer {docType === 'devis' ? 'le' : 'la'} {docType} par email
        </Modal.Title>
      </Modal.Header>
      <form ref={form} onSubmit={sendEmail}>
        <Modal.Body className='px-5 mb-2' style={{ height: '50px' }}>
          <input type='hidden' name='invoice_id' value={filteredData?.id} />
          <input type='hidden' name='doc_type' value={docType} />
          <label className='fs-3 d-none'>Email</label>
          <input
            type='email'
            name='user_email'
            placeholder='Saisissez un email'
            className='form-control bg-light border-0 '
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </Modal.Body>
        <Modal.Footer className=' px-5 text-center'>
          <span className='py-2 btn btn-soft-danger' onClick={handleCloseSendModal}>
            <span className=''> Annuler</span>
          </span>
          <button type='submit' value='Send' className='py-2 btn btn-success'>
            {isMail ? (
              <>
                <Spinner style={{ width: '14px', height: '14px' }} />{' '}
                <span className='ms-3 m-auto'> Envoi en cours ...</span>
              </>
            ) : (
              <>
                <i className='ri-send-plane-fill align-bottom me-1'></i>{' '}
                <span className=''> Envoyer</span>
              </>
            )}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default SendEmailModal
