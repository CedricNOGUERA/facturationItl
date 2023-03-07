import React from 'react'

const HeaderCreate = ({headerProps}: any) => {
  
    const {nameCustomer, setNameCustomer, emailCustomer, setEmailCustomer, avatarCustomer, setAvatarCustomer, addressCustomer, setAddressCustomer, phoneCustomer, setPhoneCustomer, invoiceNum, setInvoiceNum, invoiceCreatedAt, setInvoiceCreatedAt, status, setStatus} = headerProps
  
    return (
    <>
      <div className='card-body border-bottom border-bottom-dashed p-4'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='profile-user mx-auto  mb-3'>
              <input
                id='profile-img-file-input'
                type='file'
                className='profile-img-file-input'
              />
              <label htmlFor='profile-img-file-input' className='d-block' tabIndex={0}>
                <span
                  className='overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded'
                  style={{ height: '60px', width: '256px' }}
                >
                  <img
                    src='assets/images/logo-dark.png'
                    className='card-logo card-logo-dark user-profile-image img-fluid'
                    alt='logo dark'
                  />
                  <img
                    src='assets/images/logo-light.png'
                    className='card-logo card-logo-light user-profile-image img-fluid'
                    alt='logo light'
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

      <div className='card-body p-4 '>
        <div className='row'>
          <div className='col-lg-4 col-sm-6'>
            <div>
              <label htmlFor='billingName' className='text-muted text-uppercase fw-semibold'>
                A l'attention de :
              </label>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                id='billingName'
                className='form-control bg-light border-0'
                placeholder='Nom'
                value={nameCustomer}
                onChange={(e: any) => setNameCustomer(e.currentTarget.value)}
                required
              />
              <div className='invalid-feedback'>Saisissez un nom</div>
            </div>
            <div className='mb-2'>
              <textarea
                className='form-control bg-light border-0'
                id='billingAddress'
                rows={3}
                placeholder='Adresse'
                value={addressCustomer}
                onChange={(e: any) => setAddressCustomer(e.currentTarget.value)}
                required
              ></textarea>
              <div className='invalid-feedback'>Saisissez une adresse</div>
            </div>
           
           
          </div>
          <div className='col-lg-2 col-sm-0'></div>
          <div className='col-lg-4 col-sm-6'>
            <div>
              <label htmlFor='billingName' className='text-muted text-uppercase fw-semibold'>
                <i className='ri-mail-line'></i>
              </label>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                id='billingName'
                className='form-control bg-light border-0'
                placeholder='Email'
                value={emailCustomer}
                onChange={(e: any) => setEmailCustomer(e.currentTarget.value)}
                required
              />
              <div className='invalid-feedback'>Saisissez un email</div>
            </div>
           
            <div className='mb-2'>
              <input
                type='text'
                className='form-control bg-light border-0'
                data-plugin='cleave-phone'
                id='billingPhoneno'
                placeholder='Téléphone'
                value={phoneCustomer}
                onChange={(e: any) => setPhoneCustomer(e.currentTarget.value)}
                required
              />
              <div className='invalid-feedback'>Saisissez un n° de téléphone</div>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                id='billingName'
                className='form-control bg-light border-0'
                placeholder='Avatar'
                value={avatarCustomer}
                onChange={(e: any) => setAvatarCustomer(e.currentTarget.value)}
              />
              <div className='invalid-feedback'>Saisissez un nom</div>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body p-4 border-top border-top-dashed'>
        <div className='row g-3'>
          <div className='col-lg-4 col-sm-6'>
            <label htmlFor='invoicenoInput'>N° Facture</label>
            <input
              type='text'
              className='form-control bg-light border-0 text-muted'
              id='invoicenoInput'
              placeholder='N° facture'
              value={invoiceNum}
              onChange={(e: any) => setInvoiceNum(e.currentTarget.value)}
            />
          </div>

          <div className='col-lg-4 col-sm-6'>
            <div>
              <label htmlFor='date-field'>Date</label>

              <input
                type='text'
                className='form-control bg-light border-0'
                id='date-field'
                placeholder='Entrer le nom'
                data-time='true'
                value={invoiceCreatedAt}
                onChange={(e) => setInvoiceCreatedAt(e.currentTarget.value)}
                required
              />
            </div>
          </div>

          <div className='col-lg-4 col-sm-6'>
            <label htmlFor='choices-payment-status'>Status du paiement</label>
            <div className='input-light'>
              <select
                className='form-control bg-light border-0'
                data-choices
                data-choices-search-false
                id='choices-payment-status'
                required
                value={status}
                onChange={(e: any) => setStatus(e.currentTarget.value)}
              >
                <option value=''>Sélectionner un Status</option>
                <option value='Paid'>Payé</option>
                <option value='Unpaid'>Impayé</option>
                <option value='Refund'>Remboursement</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderCreate