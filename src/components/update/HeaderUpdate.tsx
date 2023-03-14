import React from 'react'

const HeaderUpdate = ({ headerUpdateProps }: any) => {
  const {
    nameCustomer,
    setNameCustomer,
    emailCustomer,
    setEmailCustomer,
    avatarCustomer,
    setAvatarCustomer,
    addressCustomer,
    setAddressCustomer,
    phoneCustomer,
    setPhoneCustomer,
    invoiceNum,
    setInvoiceNum,
    status,
    setStatus,
    filteredInvoice,
    date,
    setDate,
  } = headerUpdateProps

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
      <div className='card-body p-4'>
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
                className='form-control bg-light border-0'
                id='billingName'
                placeholder={
                  filteredInvoice?.name_customer ? filteredInvoice?.name_customer : 'Nom'
                }
                value={nameCustomer}
                onChange={(e) => setNameCustomer(e.currentTarget.value)}
              />
              <div className='invalid-feedback'>Saisissez un nom</div>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='form-control bg-light border-0'
                id='billingEmail'
                placeholder={
                  filteredInvoice?.email_customer ? filteredInvoice?.email_customer : 'Email'
                }
                value={emailCustomer}
                onChange={(e) => setEmailCustomer(e.currentTarget.value)}
              />
              <div className='invalid-feedback'>Saisissez un nom</div>
            </div>
            <div className='mb-2'>
              <input
                type='text'
                className='form-control bg-light border-0'
                id='billingAvatar'
                placeholder={
                  filteredInvoice?.customer_info?.avatar
                    ? filteredInvoice?.customer_info?.avatar
                    : 'Avatar'
                }
                value={avatarCustomer}
                onChange={(e) => setAvatarCustomer(e.currentTarget.value)}
              />
              <div className='invalid-feedback'>Saisissez un nom</div>
            </div>
          </div>
          <div className='col-sm-6 ms-auto'>
            <div className='row'>
              <div className='col-lg-8'>
                <div>
                  <label
                    htmlFor='shippingName'
                    className='text-muted text-uppercase fw-semibold'
                  >
                    <i className='ri-mail-line'></i>
                  </label>
                </div>
                <div className='mb-2'>
                  <textarea
                    className='form-control bg-light border-0'
                    id='billingAddress'
                    rows={3}
                    placeholder={
                      filteredInvoice?.customer_info?.address
                        ? filteredInvoice?.customer_info?.address
                        : 'Adresse'
                    }
                    value={addressCustomer ? addressCustomer : ''}
                    onChange={(e) => setAddressCustomer(e.currentTarget.value)}
                  ></textarea>
                  <div className='invalid-feedback'>Saisissez une adresse</div>
                </div>
                <div className='mb-2'>
                  <input
                    type='text'
                    className='form-control bg-light border-0'
                    data-plugin='cleave-phone'
                    id='billingPhoneno'
                    placeholder={
                      filteredInvoice?.customer_info?.phone
                        ? filteredInvoice?.customer_info?.phone
                        : 'Téléphone'
                    }
                    value={phoneCustomer}
                    onChange={(e) => setPhoneCustomer(e.currentTarget.value)}
                  />
                  <div className='invalid-feedback'>Saisissez un n° de téléphone</div>
                </div>
              </div>
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
              placeholder={
                filteredInvoice?.invoiceNum ? filteredInvoice?.invoiceNum : 'N° facture'
              }
              value={invoiceNum}
              onChange={(e) => setInvoiceNum(e.currentTarget.value)}
            />
          </div>
          <div className='col-lg-4 col-sm-6'>
            <label htmlFor='date-field'>Date</label>
            <input
              type='text'
              className='form-control search bg-light border-light'
              // id='date-field'
              placeholder={
                filteredInvoice?.createdAt ? filteredInvoice?.createdAt : 'Entrez une date'
              }
              value={date ? date : 'Saisissez une date'}
              onChange={(e) => {
                setDate(e.currentTarget.value)
              }}
            />
            <button
              className='btn btn-link position-absolute end-0 top-50 text-decoration-none text-muted password-addon'
              type='button'
              id='password-addon'
            >
              <i className='ri-calendar-event-line align-middle'></i>
            </button>
          </div>
          <div className='col-lg-4 col-sm-6'>
            <label htmlFor='choices-payment-status'>Status du paiement</label>
            <div className='input-light'>
              <select
                className='form-control bg-light border-0'
                data-choices
                data-choices-search-false
                id='choices-payment-status'
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value)}
              >
                <option value=''>
                  {filteredInvoice?.status
                    ? filteredInvoice?.status
                    : 'Sélectionner un status'}
                </option>
                <option value='Paid'>Payée</option>
                <option value='Unpaid'>Impayée</option>
                <option value='Refund'>Remboursement</option>
                <option value='Cancel'>Annulée</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderUpdate
