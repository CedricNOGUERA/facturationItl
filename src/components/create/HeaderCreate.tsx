import React from 'react'

import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'

dayjs.extend(customParseFormat)
/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

const HeaderCreate = ({ headerProps, title }: any) => {
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
    setInvoiceCreatedAt,
    status,
    setStatus,
  } = headerProps

  const dateNow =
    (new Date().getDate().toString().length === 1
      ? '0' + new Date().getDate()
      : new Date().getDate()) +
    '/' +
    (new Date().getMonth().toString().length === 1
      ? '0' + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    '/' +
    new Date().getFullYear()

  React.useEffect(() => {
    setInvoiceCreatedAt(dateNow)
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setInvoiceCreatedAt(dateString)
  }

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
                  style={{ height: '50px', width: '256px' }}
                >
                  <img
                    src='assets/images/logo-dark.png'
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

      <div className='card-body p-4 '>
        <div className='row'>
          <div className='col-12 text-center'>
            <h3 className='text-uppercase teko fs-2' >{title}</h3>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-6'>
            <div>
              <label htmlFor='billingName' className='text-muted text-uppercase fw-semibold'>
                A l'attention de :
              </label>
            </div>
            <div className='mb-2'>
              <Input
                type='text'
                placeholder='Nom'
                data={nameCustomer}
                setData={setNameCustomer}
                required={true}
              />
            </div>
            <div className='mb-2'>
              <TextArea
                placeholder={'Adresse'}
                data={addressCustomer}
                setData={setAddressCustomer}
                required={true}
              />
              <div className='invalid-feedback'>Saisissez une adresse</div>
            </div>
          </div>
          <div className='col-lg-2 d-lg-block d-md-none d-sm-none'></div>
          <div className='col-lg-5 col-md-6 col-sm-6'>
            <div>
              <label htmlFor='billingEmail' className='text-muted text-uppercase fw-semibold'>
                <i className='ri-mail-line'></i>
              </label>
            </div>
            <div className='mb-2'>
              <Input
                type='text'
                placeholder='Email'
                data={emailCustomer}
                setData={setEmailCustomer}
                required={true}
              />
            </div>

            <div className='mb-2'>
              <Input
                type='text'
                placeholder='Téléphone'
                data={phoneCustomer}
                setData={setPhoneCustomer}
                required={true}
              />

              <div className='invalid-feedback'>Saisissez un n° de téléphone</div>
            </div>
            <div className='mb-2'>
              <Input
                type='text'
                placeholder='Avatar'
                data={avatarCustomer}
                setData={setAvatarCustomer}
                required={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='card-body p-4 border-top border-top-dashed'>
        <div className='row g-3'>
          <div className='col-lg-4 col-sm-6'>
            <label htmlFor='invoicenoInput'>N° Facture</label>
            <Input
              type='text'
              placeholder='N° facture'
              data={invoiceNum}
              setData={setInvoiceNum}
              required={true}
            />
          </div>

          <div className='col-lg-4 col-sm-6'>
            <div>
              <label htmlFor='date-field'>Date</label>
              <DatePicker
                className='form-control bg-light border-0'
                defaultValue={dayjs(dateNow, dateFormatList[0])}
                format={dateFormatList}
                onChange={onChange}
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
                <option value='Payée'>Payée</option>
                <option value='Impayée'>Impayée</option>
                <option value='Remboursement'>Remboursement</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderCreate
