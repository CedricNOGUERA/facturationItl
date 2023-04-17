import React from 'react'
import HeaderOwner from '../ui/HeaderOwer'
import Input from '../ui/Input'

const HeaderUpdate = ({ headerUpdateProps, title }: any) => {
  const {
    nameCustomer,
    setNameCustomer,
    emailCustomer,
    setEmailCustomer,
    avatarCustomer,
    setAvatarCustomer,
    subject,
    setSubject,
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
      <HeaderOwner />
      <div className='card-body p-4'>
        <div className='row'>
          <div className='col-12 text-center'>
            <h3 className='text-uppercase teko fs-2'>{title}</h3>
          </div>
          <div className='col-lg-4 col-sm-6'>
            <div className='mb-2'>
              <Input
                type='text'
                placeholder={filteredInvoice?.subject ? filteredInvoice?.subject : 'Objet'}
                data={subject}
                setData={setSubject}
                required={false}
              />
            </div>
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
                type='email'
                className='form-control bg-light border-0'
                id='billingEmail'
                placeholder={
                  filteredInvoice?.email_customer ? filteredInvoice?.email_customer : 'Email'
                }
                value={emailCustomer}
                onChange={(e) => setEmailCustomer(e.currentTarget.value)}
              />
              <div className='invalid-feedback'>Saisissez un email</div>
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
                {title === 'DEVIS' ? (
                  <>
                    <option value='En cours'>En cours</option>
                    <option value='Validé'>Validé</option>
                    <option value='Annulé'>Annulé</option>
                  </>
                ) : (
                  <>
                    <option value='Payée'>Payée</option>
                    <option value='Impayée'>Impayée</option>
                    <option value='Annulée'>Annulée</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderUpdate
