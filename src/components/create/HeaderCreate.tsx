import React from 'react'

import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Input from '../ui/Input'
import TextArea from '../ui/TextArea'
import HeaderOwner from '../ui/HeaderOwer'

dayjs.extend(customParseFormat)
/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

const HeaderCreate = ({ headerProps, title }: any) => {
  const {
    nameCustomer,
    setNameCustomer,
    emailCustomer,
    setEmailCustomer,
    subject,
    setSubject,
    addressCustomer,
    setAddressCustomer,
    phoneCustomer,
    setPhoneCustomer,
    docNum,
    setDocNum,
    setDocCreatedAt,
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
    setDocCreatedAt(dateNow)
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDocCreatedAt(dateString)
  }

  return (
    <>
      <HeaderOwner />

      <div className='card-body p-4 '>
        <div className='row'>
          <div className='col-12 text-center'>
            <h3 className='text-uppercase teko fs-2'>{title}</h3>
          </div>
          <div className='col-lg-5 col-md-6 col-sm-6'>
            <div className='mb-2'>
              <Input
                type='text'
                placeholder='Objet'
                data={subject}
                setData={setSubject}
                required={true}
              />
            </div>
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
              data={docNum}
              setData={setDocNum}
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
                    <option value='Remboursement'>Remboursement</option>
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

export default HeaderCreate
