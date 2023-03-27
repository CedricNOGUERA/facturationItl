import React from 'react'
import { supabase } from '../../utils/supabaseClient'
import ButtonTableCreate from '../../components/create/ButtonTableCreate'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { notification } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import ProductItemUpdate from '../../components/update/productItemUpdate'
import HeaderUpdate from '../../components/update/HeaderUpdate'
import BottomTableUpdate from '../../components/update/BottomTableUpdate'
import TableHeader from '../../components/ui/TableHeader'
import { _addItem, _deleteItem, _getTotalTva, _htAmount, _updateQty } from '../../utils/function'

const Update = () => {
  const [invoiceNum, setInvoiceNum] = React.useState<any>('')
  const [invoiceCreatedAt, setInvoiceCreatedAt] = React.useState<any>('')
  const [status, setStatus] = React.useState<string>('')

  const [nameCustomer, setNameCustomer] = React.useState<string>('')
  const [emailCustomer, setEmailCustomer] = React.useState<string>('')
  const [phoneCustomer, setPhoneCustomer] = React.useState<string>('')
  const [avatarCustomer, setAvatarCustomer] = React.useState<string>('')
  const [subject, setSubject] = React.useState<string>('')
  const [addressCustomer, setAddressCustomer] = React.useState<string>('')
  const [noteInvoice, setNoteInvoice] = React.useState<string>(
    "Tous les comptes doivent être payés dans les 45 jours suivant la réception de facture. A régler par chèque ou carte bancaire ou paiement direct en ligne."
  )
  const [unique, setUnique] = React.useState<any>([]);

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
  }, [params.id])

  React.useEffect(() => {
    setProductList(filteredInvoice?.detailBill)
    setDate(filteredInvoice?.createdAt)
  }, [filteredInvoice])

  React.useEffect(() => {
    setHtAmount(
      _htAmount(productList)
    )
  }, [productList])


  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Votre facture est modifiée.',
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
    newProduits[indx][key] = key === "qty" ? parseInt(e.target.value) : e.target.value
    setProductList(newProduits)
  }
  const handleDeleteProduct = (id: any) => {
    const newList = productList?.filter((prod: any) => prod.id !== id)
    const tab= [...unique]

    tab.push(id)
    setProductList(newList)
    setUnique(tab)

  }

  const handleUpdateInvoice = async (e: any) => {
    e.preventDefault()

    /////Update header invoice data
    const { data, error } = await supabase
      .from('invoices2')
      .update({
        invoiceNum: invoiceNum ? invoiceNum : filteredInvoice?.invoiceNum,
        createdAt: invoiceCreatedAt ? invoiceCreatedAt : filteredInvoice?.createdAt,
        status: status ? status : filteredInvoice?.status,
        subject: subject ? subject : filteredInvoice?.subject,
        customer_info: {
          name: nameCustomer ? nameCustomer : filteredInvoice?.customer_info.name,
          email: emailCustomer ? emailCustomer : filteredInvoice?.customer_info.email,
          phone: phoneCustomer ? phoneCustomer : filteredInvoice?.customer_info.phone,
          avatar: avatarCustomer ? avatarCustomer : filteredInvoice?.customer_info.avatar,
          address: addressCustomer ? addressCustomer : filteredInvoice?.customer_info.address,
        },
        name_customer: nameCustomer ? nameCustomer : filteredInvoice?.name_customer,
        email_customer: emailCustomer ? emailCustomer : filteredInvoice?.email_customer,
        amount_ht: htAmount ? htAmount : filteredInvoice?.customer_info.amount_ht,
        amount_ttc: htAmount
          ? parseInt((htAmount + totalTva_13 + totalTva_16 + htAmount * 0.01).toFixed(2))
          : filteredInvoice?.customer_info.amount_ht,
      })
      .eq('id', params?.id)


      /////Update prod existing in list
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
        navigate('/' + params.id + '/facture')
      }, 2500)
    } catch (error) {
      console.log(error)
    }

    //When add new prod
    if (productList?.length - initProductList?.length > 0) {
      const newData = productList?.slice(initProductList?.length, productList?.length)

      console.log(newData)
       _addItem(newData, filteredInvoice, navigate, 'detailBill')

    
    }
      ///When delete prod in list
    if (unique && unique.length > 0) {

      _deleteItem(unique, navigate, 'detailBill')

    }

  }

  const totalTva_13 = _getTotalTva(productList, 0.13)
  const totalTva_16 = _getTotalTva(productList, 0.16)
  

  const addQty = (qty: any, indx: any, key: any) => {

    _updateQty(1, indx, key, productList, setProductList)

  }

  const substQty = (qty: any, indx: any, key: any) => {
    if (qty > 1) {
      _updateQty(-1, indx, key, productList, setProductList)
    }
  }

  const headerUpdateProps = {
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
            <HeaderUpdate headerUpdateProps={headerUpdateProps} title='FACTURE' />
            <div className='card-body p-4'>
              <div className='table-responsive'>
                <table className='invoice-table table table-borderless table-nowrap mb-0'>
                <TableHeader />
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
