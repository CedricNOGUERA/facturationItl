import React from 'react'
import ProductItem from '../../components/create/ProductItem'
import { supabase } from '../../utils/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import Header from '../../components/create/HeaderCreate'
import BottomTableCreate from '../../components/create/BottomTableCreate'
import ButtonTableCreate from '../../components/create/ButtonTableCreate'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { _getTotalTva, _htAmount, _updateQty , _handleChangeProduct} from '../../utils/function'
import TableHeader from '../../components/ui/TableHeader'

const CreateQuote = () => {
  const navigate = useNavigate()
  const [docNum, setDocNum] = React.useState<any>('')
  const [docCreatedAt, setDocCreatedAt] = React.useState<any>('')
  const [status, setStatus] = React.useState<string>('')

  const [nameCustomer, setNameCustomer] = React.useState<string>('')
  const [emailCustomer, setEmailCustomer] = React.useState<string>('')
  const [phoneCustomer, setPhoneCustomer] = React.useState<string>('')
  const [avatarCustomer, setAvatarCustomer] = React.useState<string>('')
  const [addressCustomer, setAddressCustomer] = React.useState<string>('')
  const [subject, setSubject] = React.useState<string>('')

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

  /////////////// succes notification ////////////////

  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Votre devis est enregistré.',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
    })
  }

  /////////////// function mapped in productItem component ////////////////

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
  
  const handleDeleteProduct = (id: any) => {
    const newList = productList?.filter((prod: any) => prod.id !== id)

    setProductList(newList)
  }

  const createQuote = async (e: any) => {
    const invoiceId: any = uuidv4()

    e.preventDefault()

    const { data: dataz, error: errorz } = await supabase.from('quotes').insert([
      {
        id: invoiceId,
        invoiceNum: docNum,
        createdAt: docCreatedAt,
        status: "En cours",
        subject: subject,
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
    if (dataz) {
      console.log(dataz)
    }

    if (errorz) {
      console.log(errorz)
    } else {
      const promises = productList?.map((prod: any, indx: any) => {
        return supabase.from('detailQuote').insert([
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
        setDocNum('')
        setDocCreatedAt('')
        setStatus('')
        setNameCustomer('')
        setEmailCustomer('')
        setPhoneCustomer('')
        setAvatarCustomer('')
        setAddressCustomer('')
        openNotification()

        setTimeout(() => {
          navigate('/' + invoiceId + '/devis')
        }, 2500)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const amountHT = _htAmount(productList)
  const totalTva_13 = _getTotalTva(productList, 0.13)
  const totalTva_16 = _getTotalTva(productList, 0.16)

 



  const headerProps = {
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
    docNum,
    setDocNum,
    setDocCreatedAt,
    status,
    setStatus,
  }

  const productItemProps = {
    productList,
    setProductList,
    handleDeleteProduct,
  }

  const bottomTableProps = { handleAddProduct, amountHT, totalTva_13, totalTva_16 }

  return (
    <div className='row justify-content-center'>
      {contextHolder}
      <div className='col-xxl-9'>
        <div className='card'>
          <form onSubmit={createQuote} className='needs-validation' id='invoice_form'>
            <Header headerProps={headerProps} title={'DEVIS'} />
            <div className='card-body p-4'>
              <div className='table-responsive mb-5'>
                <table className='invoice-table table table-borderless table-nowrap mb-0'>
                  <TableHeader />
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
              <div className='my-4'>
                <p></p>
              </div>
              <ButtonTableCreate />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateQuote
