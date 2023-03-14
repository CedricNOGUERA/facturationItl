import React from 'react'
import { supabase } from '../../utils/supabaseClient'
import ButtonTableCreate from '../../components/create/ButtonTableCreate'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { notification } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import ProductItemUpdate from '../../components/update/productItemUpdate'
import HeaderUpdate from '../../components/update/HeaderUpdate'
import BottomTableUpdate from '../../components/update/BottomTableUpdate'

const Update = () => {
  const [invoiceNum, setInvoiceNum] = React.useState<any>('')
  const [invoiceCreatedAt, setInvoiceCreatedAt] = React.useState<any>('')
  const [status, setStatus] = React.useState<string>('')

  const [nameCustomer, setNameCustomer] = React.useState<string>('')
  const [emailCustomer, setEmailCustomer] = React.useState<string>('')
  const [phoneCustomer, setPhoneCustomer] = React.useState<string>('')
  const [avatarCustomer, setAvatarCustomer] = React.useState<string>('')
  const [addressCustomer, setAddressCustomer] = React.useState<string>('')
  const [noteInvoice, setNoteInvoice] = React.useState<string>(
    "Tous les comptes doivent être payés dans les 45 jours suivant la réception de facture. A régler par chèque ou carte bancaire ou paiement direct en ligne. Si le compte n'est pas payé dans les 45 jours, une majoration du total de la facture vous sera imputé."
  )
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
  }, [])

  React.useEffect(() => {
    setProductList(filteredInvoice?.detailBill)
    setDate(filteredInvoice?.createdAt)
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

    if (productList?.length - initProductList?.length > 0) {
      const newData = productList?.slice(initProductList?.length, productList?.length)

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

  const headerUpdateProps = {
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
    status,
    setStatus,
    filteredInvoice,
    date,
    setDate,
  }

  const productItemProps = {
    productList,
    handleDeleteProduct,
    handleChangeProduct,
    substQty,
    addQty,
  }
  const bottomTableProps = { handleAddProduct, htAmount, totalTva_13, totalTva_16 }

  return (
    <div className='row justify-content-center'>
      {contextHolder}
      <div className='col-xxl-9'>
        <div className='card'>
          <form onSubmit={handleUpdateInvoice} className='needs-validation' id='invoice_form'>
            <HeaderUpdate headerUpdateProps={headerUpdateProps} />
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
                 
                  <BottomTableUpdate bottomTableProps={bottomTableProps} />
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
                ></textarea>
              </div>
              <ButtonTableCreate />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
