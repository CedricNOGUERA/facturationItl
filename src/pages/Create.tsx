import React from 'react'
import { useForm } from 'react-hook-form'
import ProductItem from '../components/create/ProductItem'
import { supabase } from '../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import Header from '../components/create/HeaderCreate'
import BottomTableCreate from '../components/create/BottomTableCreate'
import ButtonTableCreate from '../components/create/ButtonTableCreate'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const { register, handleSubmit } = useForm()
  const [data, setData] = React.useState('')

  const [invoiceNum, setInvoiceNum] = React.useState<any>('')
  const [invoiceCreatedAt, setInvoiceCreatedAt] = React.useState<any>('')
  const [status, setStatus] = React.useState<string>('')

  const [nameCustomer, setNameCustomer] = React.useState<string>('')
  const [emailCustomer, setEmailCustomer] = React.useState<string>('')
  const [phoneCustomer, setPhoneCustomer] = React.useState<string>('')
  const [avatarCustomer, setAvatarCustomer] = React.useState<string>('')
  const [addressCustomer, setAddressCustomer] = React.useState<string>('')

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

  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Votre facture est enregistrée.',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
    })
  }

  const amountHT = productList.reduce(
    (acc: any, current: any) => acc + current.price * current.qty,
    0
  )

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

  const createInvoice = async (e: any) => {
    const invoiceId: any = uuidv4()

    e.preventDefault()

    const { data: dataz, error: errorz } = await supabase.from('invoices2').insert([
      {
        id: invoiceId,
        invoiceNum: invoiceNum,
        createdAt: invoiceCreatedAt,
        status: status,
        name_customer: nameCustomer,
        email_customer: emailCustomer,
        customer_info: {
          id: Math.random(),
          name: nameCustomer,
          email: emailCustomer,
          phone: phoneCustomer,
          avatar: avatarCustomer,
          address: addressCustomer,
        },

        amount_ht: amountHT,
        amount_ttc: parseInt(
          (amountHT + totalTva_13 + totalTva_16 + amountHT * 0.01).toFixed(2)
        ),
      },
    ])

    if (errorz) {
      console.log(errorz)
    } else {
      const promises = productList?.map((prod: any, indx: any) => {
        return supabase.from('detailBill').insert([
          {
            designation: prod.name,
            detailDesignation: prod.detail,
            qty: prod.qty,
            price: prod.price,
            amount_ttc: parseInt((prod.qty * prod.price * (1 + prod.tva + 0.01)).toFixed(2)),
            amount_ht: prod.qty * prod.price,
            invoice_id: invoiceId,
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
    ?.filter((bill: any) => bill.tva == 0.13)
    ?.reduce((acc: any, current: any) => acc + current.price * current.qty * current.tva, 0)
  const totalTva_16 = productList
    ?.filter((bill: any) => bill.tva == 0.16)
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
    handleSubmit,
    setData,
    productList,
    setProductList,
    handleDeleteProduct,
    register,
    handleChangeProduct,
    substQty,
    addQty,
  }
  const bottomTableProps = { handleAddProduct, amountHT, totalTva_13, totalTva_16 }
  const test = () => {
    alert('hello')
  }

  return (
    <div className='row justify-content-center'>
      {contextHolder}
      <div className='col-xxl-9'>
        <div className='card'>
          <form onSubmit={createInvoice} className='needs-validation' id='invoice_form'>
            <Header headerProps={headerProps} />
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
                      <ProductItem
                        productItemProps={productItemProps}
                        key={prod.id}
                        prod={prod}
                        indx={indx}
                      />
                    ))}
                  </tbody>
                  <BottomTableCreate bottomTableProps={bottomTableProps} />
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
                  rows={3}
                  defaultValue="Tous les comptes doivent être payés dans les 45 jours suivant la réception de facture. A régler par chèque ou carte bancaire ou paiement direct en ligne. Si le compte n'est pas payé dans les 45 jours les détails des crédits fournis comme confirmation de les travaux entrepris seront facturés au tarif convenu Noté ci-dessus."
                  readOnly
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

export default Create
