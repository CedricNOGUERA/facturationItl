import React from 'react'

interface ValidateModalProps {
  validateDocId: string
  handleValidate: any
  trigger: string
}

const ValidateModal: React.FC<ValidateModalProps> = ({validateDocId, handleValidate, trigger}) => {
return (
    <>
  <div className='modal-dialog modal-dialog-centered'>
  <div className='modal-content'>
      <div className='modal-body p-5 text-center'>
      <lord-icon src="https://cdn.lordicon.com/nocovwne.json" trigger="loop" colors='primary:#121331,secondary:#08a88a' style={{width:"90px", height:"90px"}}></lord-icon>
      <div className='mt-4 text-center'>
          <h4>Voulez-vous valider {trigger === 'DEVIS' ? 'ce devis' : 'cette facture'} ?</h4>
          <p className='text-muted fs-15 mb-4'>
          {trigger === 'DEVIS' ? 'Lorsqu\'un devis est validé, il devient une facture au status impayé.' : 'Les informations, de cette facture, seront enregistrées dans votre base de donnée.'}

          </p>
          <div className='hstack gap-2 justify-content-center remove'>
          <button
              className='btn btn-link link-danger fw-medium text-decoration-none'
              id='deleteRecord-close'
              data-bs-dismiss='modal'
          >
              <i className='ri-close-line me-1 align-middle'></i> Fermer
          </button>
          <button className='btn btn-success' id='delete-record' onClick={() => handleValidate(validateDocId)} data-bs-dismiss='modal'>
              Oui, valider
          </button>
          </div>
      </div>
      </div>
  </div>
  </div>
  <div
    aria-labelledby='swal2-title'
    aria-describedby='swal2-html-container'
    className='swal2-popup swal2-modal swal2-icon-success swal2-show'
    tabIndex={-1}
    role='dialog'
    aria-live='assertive'
    aria-modal='true'
    style={{ display: 'grid' }}
  >
    <button
      type='button'
      className='swal2-close'
      aria-label='Close this dialog'
      style={{ display: 'flex' }}
    >
      ×
    </button>
    <ul className='swal2-progress-steps' style={{ display: 'none' }}></ul>
    <div className='swal2-icon swal2-success swal2-icon-show' style={{ display: 'flex' }}>
      <div
        className='swal2-success-circular-line-left'
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
      <span className='swal2-success-line-tip'></span>{' '}
      <span className='swal2-success-line-long'></span>
      <div className='swal2-success-ring'></div>{' '}
      <div
        className='swal2-success-fix'
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
      <div
        className='swal2-success-circular-line-right'
        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
      ></div>
    </div>
    <img className='swal2-image' style={{ display: 'none' }} alt='sweet' />
    <h2 className='swal2-title' id='swal2-title' style={{ display: 'block' }}>
      Good job!
    </h2>
    <div
      className='swal2-html-container'
      id='swal2-html-container'
      style={{ display: 'block' }}
    >
      You clicked the button!
    </div>
    <input className='swal2-input' style={{ display: 'none' }} />
    <input type='file' className='swal2-file' style={{ display: 'none' }} />
    <div className='swal2-range' style={{ display: 'none' }}>
      <input type='range' />
      <output></output>
    </div>
    <select className='swal2-select' style={{ display: 'none' }}></select>
    <div className='swal2-radio' style={{ display: 'none' }}></div>
    <label htmlFor='swal2-checkbox' className='swal2-checkbox' style={{ display: 'none' }}>
      <input type='checkbox' />
      <span className='swal2-label'></span>
    </label>
    <textarea className='swal2-textarea' style={{ display: 'none' }}></textarea>
    <div
      className='swal2-validation-message'
      id='swal2-validation-message'
      style={{ display: 'none' }}
    ></div>
    <div className='swal2-actions' style={{ display: 'flex' }}>
      <div className='swal2-loader'></div>
      <button
        type='button'
        className='swal2-confirm btn btn-primary w-xs me-2 mt-2'
        aria-label=''
        style={{ display: 'inline-block' }}
      >
        OK
      </button>
      <button type='button' className='swal2-deny' aria-label='' style={{ display: 'none' }}>
        No
      </button>
      <button
        type='button'
        className='swal2-cancel btn btn-danger w-xs mt-2'
        aria-label=''
        style={{display: 'inline-block'}}
      >
        Cancel
      </button>
    </div>
    <div className='swal2-footer' style={{ display: 'none' }}></div>
    <div className='swal2-timer-progress-bar-container'>
      <div className='swal2-timer-progress-bar' style={{ display: 'none' }}></div>
    </div>
  </div>
  </>
)
}

export default ValidateModal
