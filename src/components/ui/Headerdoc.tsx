import React from 'react'

const Headerdoc = () => {
  return (
    <div className='card-body border-bottom border-bottom-dashed p-4'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='profile-user mx-auto  mb-3'>
            
              <label htmlFor='profile-img-file-input' className='d-block' tabIndex={0}>
                <span
                  className='overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded'
                  style={{ height: '60px', width: '256px' }}
                >
                  <img
                    src='../assets/images/logo-dark.png'
                    className='card-logo card-logo-dark user-profile-image img-fluid'
                    alt='logo dark'
                  />
                </span>
              </label>
            </div>
            <div>
              <div>
                <label htmlFor='companyAddress'>Adresse</label>
              </div>
              <div className='mb-2 text-muted'>Immeuble Mananui, Auae, Faa'a</div>
              <div className='mb-2 text-muted'>BP 1904 - 98713 Papeete - Tahiti</div>
            </div>
          </div>

          <div className='col-lg-4 ms-auto'>
            <div className='mb-2'>
              N°Tahiti :<div className='mb-2 text-muted'>RCS N°21 412 B - N°TAHITI E48924</div>
            </div>
            <div className='mb-2'>
              Email
              <div className='mb-2 text-muted'>itahitilab@lwane.com</div>
            </div>

            <div>
              Téléphone
              <div className='mb-2 text-muted'>87 77 58 67</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Headerdoc
