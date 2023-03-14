import React from 'react'
import ProductItem from '../../components/create/ProductItem'
import { supabase } from '../../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import Header from '../../components/create/HeaderCreate'
import BottomTableCreate from '../../components/create/BottomTableCreate'
import ButtonTableCreate from '../../components/create/ButtonTableCreate'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { notification } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import ProductItemUpdate from '../../components/update/productItemUpdate'

const Update2 = () => {

  const [invoiceNum, setInvoiceNum] = React.useState<any>('')
  const [invoiceCreatedAt, setInvoiceCreatedAt] = React.useState<any>('')
  const [status, setStatus] = React.useState<string>('')

  const [nameCustomer, setNameCustomer] = React.useState<string>('')
  const [emailCustomer, setEmailCustomer] = React.useState<string>('')
  const [phoneCustomer, setPhoneCustomer] = React.useState<string>('')
  const [avatarCustomer, setAvatarCustomer] = React.useState<string>('')
  const [addressCustomer, setAddressCustomer] = React.useState<string>('')
  const [noteInvoice, setNoteInvoice] = React.useState<string>('Tous les comptes doivent être payés dans les 45 jours suivant la réception de facture. A régler par chèque ou carte bancaire ou paiement direct en ligne. Si le compte n\'est pas payé dans les 45 jours, une majoration du total de la facture vous sera imputé.')
  const [date, setDate] = React.useState<string>('')


  const [filteredInvoice, setFilteredInvoice] = React.useState<any>()
  const [htAmount, setHtAmount] = React.useState<any>(0)

  const params = useParams()


  const [productList, setProductList] = React.useState([
    {
      id: 1,
      name: '',
      detail: '',
      tva: 0,
      price: 0,
      qty: 1,
      amount: 0,
    },
  ])
  const [initProductList, setInitProductList] = React.useState<any>([])


  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  React.useEffect(() => {
    getInvoiceById()
    setDate(filteredInvoice?.createdAt)
  }, [])

  React.useEffect(() => {
    setProductList(filteredInvoice?.detailBill)
  }, [filteredInvoice])

  React.useEffect(() => {
    setHtAmount(
      productList?.reduce((acc: any, current: any) => acc + current.price * current.qty, 0)
    )
  }, [productList])

// console.log(filteredInvoice)
  
  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Votre facture est enregistrée.',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
    })
  }

  const amountHT = productList?.reduce(
    (acc: any, current: any) => acc + current.price * current.qty,
    0
  )


  const getInvoiceById = async () => {
    let { data: invoices2, error } = await supabase
      .from('invoices2')
      .select('*, detailBill(*)')
      .eq('id', params.id)
      .single()
      
      if (invoices2) {
        setFilteredInvoice(invoices2)
        setInitProductList(invoices2.detailBill)
      }
    if (error) {
      console.log(error)
    }
  }

  const handleAddProduct = () => {
    const newTab = [
      ...productList,
      {
        id: Math.random(),
        name: '',
        detail: '',
        tva: 0,
        price: 0,
        qty: 1,
        amount: 0,
      },
    ]
    setProductList(newTab)
  }
  const handleChangeProduct = (e: any, indx: any, key: any) => {
    const newProduits: any = [...productList]
    newProduits[indx][key] = e.target.value
    setProductList(newProduits)
  }
  const handleDeleteProduct = (id: any) => {
    const newList = productList?.filter((prod: any) => prod.id !== id)

    setProductList(newList)
  }

  
  const handleUpdateInvoice = async (e: any) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('invoices2')
      .update({
        invoiceNum: invoiceNum ? invoiceNum : filteredInvoice?.invoiceNum,
        createdAt: invoiceCreatedAt ? invoiceCreatedAt : filteredInvoice?.createdAt,
        status: status ? status : filteredInvoice?.status,
        customer_info: {
          name: nameCustomer ? nameCustomer : filteredInvoice?.customer_info.name,
          email: emailCustomer ? emailCustomer : filteredInvoice?.customer_info.email,
          phone: phoneCustomer ? phoneCustomer : filteredInvoice?.customer_info.phone,
          avatar: avatarCustomer ? avatarCustomer : filteredInvoice?.customer_info.avatar,
          address: addressCustomer ? addressCustomer : filteredInvoice?.customer_info.address,
        },
        amount_ht: htAmount ? htAmount : filteredInvoice?.customer_info.amount_ht,
        amount_ttc: htAmount
          ? parseInt((htAmount + totalTva_13 + totalTva_16 + htAmount * 0.01).toFixed(2))
          : filteredInvoice?.customer_info.amount_ht,
      })
      .eq('id', params?.id)



    const promises = productList?.map((prod: any, indx: any) => {
      return supabase
        .from('detailBill')
        .update({
          designation: prod.designation,
          detailDesignation: prod.detailDesignation,
          qty: prod.qty,
          price: prod.price,
          tva: parseFloat(prod.tva),
          amount_ttc: parseInt(
            (prod.qty * prod.price * (1 + parseFloat(prod.tva) + 0.01)).toFixed(2)
          ),
          amount_ht: prod.qty * prod.price,
        })
        .eq('id', prod.id)
    })

    try {
      await Promise.all(promises)
      console.log(promises)
      openNotification()
      setInvoiceNum('')
      setInvoiceCreatedAt('')
      setStatus('')
      setNameCustomer('')
      setEmailCustomer('')
      setPhoneCustomer('')
      setAvatarCustomer('')
      setAddressCustomer('')
      setTimeout(() => {
        navigate('/')
      }, 2500)
    } catch (error) {
      console.log(error)
    }

    if(productList?.length - initProductList?.length > 0){
      const newData = productList?.slice(initProductList?.length,productList?.length)

      console.log(newData)

      const promises = newData?.map((prod: any, indx: any) => {
        return supabase.from('detailBill').insert([
          {
            designation: prod.designation,
            detailDesignation: prod.detailDesignation,
            qty: prod.qty,
            price: prod.price,
            amount_ttc: parseInt((prod.qty * prod.price * (1 + prod.tva + 0.01)).toFixed(2)),
            amount_ht: prod.qty * prod.price,
            invoice_id: filteredInvoice.id,
            tva: prod.tva,
          },
        ])
      })

      try {
        await Promise.all(promises)
        console.log('good aussi')
        setInvoiceNum('')
        setInvoiceCreatedAt('')
        setStatus('')
        setNameCustomer('')
        setEmailCustomer('')
        setPhoneCustomer('')
        setAvatarCustomer('')
        setAddressCustomer('')
        openNotification()

        setTimeout(() => {
          navigate('/')
        }, 2500)
      } catch (error) {
        console.log(error)
      }

    }


  }


  const totalTva_13 = productList
    ?.filter((bill: any) => Number(bill.tva) === 0.13)
    ?.reduce((acc: any, current: any) => acc + current.price * current.qty * current.tva, 0)
  const totalTva_16 = productList
    ?.filter((bill: any) => Number(bill.tva) === 0.16)
    ?.reduce((acc: any, current: any) => acc + current.price * current.qty * current.tva, 0)

  const addQty = (qty: any, indx: any, key: any) => {
    const newProduits: any = [...productList]
    newProduits[indx][key] = qty + 1
    setProductList(newProduits)
  }

  const substQty = (qty: any, indx: any, key: any) => {
    if (qty > 1) {
      const newProduits: any = [...productList]
      newProduits[indx][key] = qty - 1
      setProductList(newProduits)
    }
  }

  const headerProps = {
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
    invoiceCreatedAt,
    setInvoiceCreatedAt,
    status,
    setStatus,
  }

  const productItemProps = {
    productList,
    handleDeleteProduct,
    handleChangeProduct,
    substQty,
    addQty,
  }
  const bottomTableProps = { handleAddProduct, amountHT, totalTva_13, totalTva_16 }
  return (
    <div className='row justify-content-center'>
      {contextHolder}
      <div className='col-xxl-9'>
        <div className='card'>
          <form 
          onSubmit={handleUpdateInvoice}
           className='needs-validation' id='invoice_form'>
            {/* <Header headerProps={headerProps} /> */}
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
                    N°Tahiti :
                    <div className='mb-2 text-muted'>RCS N°21 412 B - N°TAHITI E48924</div>
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
                    <label
                      htmlFor='billingName'
                      className='text-muted text-uppercase fw-semibold'
                    >
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
                        filteredInvoice?.email_customer
                          ? filteredInvoice?.email_customer
                          : 'Email'
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
                          value={addressCustomer}
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
                    placeholder={
                      filteredInvoice?.createdAt ? filteredInvoice?.createdAt : 'Entrez une date'
                    }
                    value={date}
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
            <div className='card-body p-4'>
              <div className='table-responsive'>
                <table className='invoice-table table table-borderless table-nowrap mb-0'>
                  <thead className='align-middle'>
                    <tr className='table-active'>
                      <th scope='col' style={{ width: '50px' }}>
                        #
                      </th>
                      <th scope='col'>Désignations</th>
                      <th scope='col' style={{ width: '80px' }}>
                        <div className='d-flex currency-select input-light align-items-center '>
                          Tva
                        </div>
                      </th>
                      <th scope='col' style={{ width: '120px' }}>
                        <div className='d-flex currency-select input-light align-items-center'>
                          Prix
                        </div>
                      </th>
                      <th scope='col' style={{ width: '105px' }}>
                        Quantité
                      </th>
                      <th scope='col' style={{ width: '105px' }}>
                        Montant Tva
                      </th>
                      <th scope='col' className='text-end' style={{ width: '150px' }}>
                        Montant HT
                      </th>
                      <th scope='col' className='text-end' style={{ width: '105px' }}></th>
                    </tr>
                  </thead>
                  <tbody id='newlink'>
                    {productList?.map((prod: any, indx: any) => (
                      <ProductItemUpdate
                        productItemProps={productItemProps}
                        key={prod.id}
                        prod={prod}
                        indx={indx}
                      />
                    ))}
                  </tbody>
                  <tbody>
                    <tr>
                      <td colSpan={5}>
                        <span
                          onClick={handleAddProduct}
                          id='add-item'
                          className='btn btn-soft-secondary fw-medium'
                        >
                          <i className='ri-add-fill me-1 align-bottom'></i> Ajouter un prodruit
                        </span>
                      </td>
                    </tr>
                    <tr className='border-top border-top-dashed mt-2'>
                      <td colSpan={5}></td>
                      <td colSpan={2} className='p-0'>
                        <table className='table table-borderless table-sm table-nowrap align-middle mb-0'>
                          <tbody>
                            <tr>
                              <th scope='row'>Total HT</th>
                              <td style={{ width: '150px' }}>
                                <input
                                  type='text'
                                  className='form-control bg-light border-0 text-end'
                                  id='cart-subtotal'
                                  value={new Intl.NumberFormat().format(htAmount)}
                                  readOnly
                                />
                              </td>
                            </tr>
                            {totalTva_13 !== 0 && (
                              <tr>
                                <th scope='row'>TVA (13%)</th>
                                <td className='text-end'>
                                  <input
                                    type='text'
                                    className='form-control bg-light border-0 text-end'
                                    id='tax13'
                                    value={`${new Intl.NumberFormat().format(totalTva_13)}`}
                                    readOnly
                                  />
                                </td>
                              </tr>
                            )}
                            {totalTva_16 !== 0 && (
                              <tr>
                                <th scope='row'>TVA (16%)</th>
                                <td className='text-end'>
                                  <input
                                    type='text'
                                    className='form-control bg-light border-0 text-end'
                                    id='tax16'
                                    value={`${new Intl.NumberFormat().format(totalTva_16)}`}
                                    readOnly
                                  />
                                </td>
                              </tr>
                            )}

                            <tr>
                              <th scope='row'>CPS (1%)</th>
                              <td>
                                <input
                                  type='text'
                                  className='form-control bg-light border-0 text-end'
                                  id='ht'
                                  value={`${new Intl.NumberFormat().format(htAmount * 0.01)}`}
                                  readOnly
                                />
                              </td>
                            </tr>
                            <tr></tr>
                            <tr className='border-top border-top-dashed'>
                              <th scope='row'>Total</th>
                              <td>
                                <input
                                  type='text'
                                  className='form-control bg-light border-0 text-end'
                                  id='cart-total'
                                  value={`${
                                    new Intl.NumberFormat().format(htAmount + totalTva_13 + totalTva_16 + htAmount * 0.01)
                                  }`}
                                  readOnly
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                  {/* <BottomTableCreate bottomTableProps={bottomTableProps} /> */}
                </table>
              </div>
              <div className='mt-4'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label text-muted text-uppercase fw-semibold'
                >
                  NOTES
                </label>
                <textarea
                  className='form-control alert alert-info'
                  id='exampleFormControlTextarea1'
                  placeholder='Notes'
                  rows={2}
                  value={noteInvoice}
                  onChange={(e) => setNoteInvoice(e.currentTarget.value)}
                  
                >
                </textarea>
              </div>
              <ButtonTableCreate />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update2
