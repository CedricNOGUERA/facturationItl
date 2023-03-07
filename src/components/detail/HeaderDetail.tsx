import React from 'react'

const HeaderDetail = ({filteredInvoice}: any) => {
  return (
    <>
      <div className='col-lg-12'>
        <div className='card-header border-bottom-dashed'>
          <div className='row g-3'>
            <div className='col-8'>
              <img
                src='assets/images/logo-dark.png'
                className='card-logo card-logo-dark'
                alt='logo dark'
                height='50'
              />
              <img
                src='assets/images/logo-light.png'
                className='card-logo card-logo-light'
                alt='logo light'
                height='50'
              />
              <div className=' mt-4'>
                <p className='text-muted mb-1' id='address-details'>
                  Immeuble Mananui, Auae, Faa'a
                </p>
                <p className='text-muted mb-0' id='zip-code'>
                  BP 1904 - 98713 Papeete - Tahiti
                </p>
              </div>
            </div>
            <div className='col-4'>
              <h6>
                <span className='text-muted fw-normal'>N°Tahiti : </span>
                <span id='legal-register-no' style={{ fontSize: '0.8rem' }}>
                  RCS N°21 412 B - N°TAHITI E48924
                </span>
              </h6>
              <h6>
                <span className='text-muted fw-normal'>Email : </span>
                <span id='email'>itahitilab@lwane.com</span>
              </h6>
              <h6>
                <span className='text-muted fw-normal'>Contact :</span> Claude
              </h6>
              <h6 className='mb-0'>
                <span className='text-muted fw-normal'>Téléphone : </span>
                <span id='contact-no'> 87 77 58 67</span>
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className='col-lg-12'>
        <div className='card-body p-4 '>
          <div className='row g-3'>
            <div className='col-8'>
              <h6 className='text-muted text-uppercase fw-semibold mb-3 fs-13'>
                A l'attention de
              </h6>
              <p className='fw-medium mb-2' id='billing-name'>
                {filteredInvoice?.customer_info.name}
              </p>
              <p className='mb-1' id='billing-address-line-1'>
                {filteredInvoice?.customer_info.address}
              </p>
            </div>
            <div className='col-4'>
              <p className='fw-medium mb-2' id='shipping-name'>
                <span className=' text-muted'>
                  @ :{' '}
                </span>
                {filteredInvoice?.customer_info.email}
              </p>
              <p className=' mb-1' id='shipping-address-line-1'>
                <span className='text-muted'>
                  <i className='ri-phone-line'></i> :{' '}
                </span>
                <span id='billing-phone-no'>
                  +(689) {filteredInvoice?.customer_info.phone}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-12'>
        <div className='card-body p-4 border-top border-top-dashed'>
          <div className='row justify-content-between'>
            <div className='col-lg-4 col-sm-4 col-4'>
              <p className='text-muted mb-2 text-uppercase fw-semibold fs-13'>N° Facture</p>
              <h5 className='fs-15 mb-0'>
                <span id='invoice-no'>{filteredInvoice?.invoiceNum}</span>
              </h5>
            </div>
            <div className='col-lg-4 col-sm-4 col-4'>
              <p className='text-muted mb-2 text-uppercase fw-semibold fs-13'>Date</p>
              <h5 className='fs-15 mb-0'>
                <span id='invoice-date'>{filteredInvoice?.created_at.slice(0, 10)}</span>{' '}
                <small className='text-muted' id='invoice-time'>
                  {filteredInvoice?.created_at.slice(12, 20)}PM
                </small>
              </h5>
            </div>
            <div className='col-lg-4 col-sm-4 col-4 '>
              <p className='text-muted mb-2 text-uppercase fw-semibold fs-13'>
                Status du paiement
              </p>
              <span className='badge badge-soft-success fs-12' id='payment-status'>
                {filteredInvoice?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderDetail