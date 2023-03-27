import { supabase } from './supabaseClient'

export const _getUserData = async (setUserdata: any) => {
  let { data: users, error } = await supabase.from('users').select('*, friendArea(*)')

  if (users) {
    setUserdata(users)
  }
  if (error) {
    console.log(error)
  }
}

export const _getGlobalData = async (table: any, foreignTable: any, setData: any, setIsLoading: any) => {
  let { data, error } = await supabase
    .from(table)
    .select(foreignTable)

  if (data) {
    setData(data)
    setIsLoading(false)
  }
  if (error) {
    console.log(error)
    setIsLoading(true)
  }
}
export const _getDocById = async (quoteId: any, setData: any) => {
  let { data: quotes, error } = await supabase
    .from('quotes')
    .select('*, detailQuote(*)')
    .eq('id', quoteId)
    .single()

  if (quotes) {
    setData(quotes)
  }
  if (error) {
    console.log(error)
  }
}
export const _getInvoiceById = async (id: any, setData: any, ) => {
  let { data: invoices2, error } = await supabase
    .from('invoices2')
    .select('*, detailBill(*)')
    .eq('id', id)
    .single()

  if (invoices2) {
    setData(invoices2)
  }
  if(error){
    console.log(error)
  }
}

export function _getTotalTva(filteredData: any, tva: number) {
  const totalTva = filteredData
    ?.filter((bill: any) => Number(bill.tva) === tva)
    ?.reduce((acc: any, current: any) => acc + current.price * current.tva * current?.qty, 0)

  return totalTva ?? 0
}

export const _htAmount = (filteredData: any) => {
  const ht = filteredData?.reduce(
    (acc: any, current: any) => acc + current.price * current.qty,
    0
  )
  return ht
}

export const _handleAddProduct = (data: any, setData: any) => {
  const newTab = [
    ...data,
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
  setData(newTab)
}

export const _handleCancel = async (id: any, getData: any, db: string, status: string) => {
  const { data, error } = await supabase.from(db).update({ status: status }).eq('id', id)

  if (!error) {
    console.log('success')
    getData()
  }

  if (data) {
    console.log('success')
  }

  if (error) {
    console.log(error)
  }
}

export const _updateQty = (
  qtyModifier: number,
  indx: number,
  key: string,
  productList: any,
  setProductList: any
) => {
  const newProduits: any = [...productList]
  newProduits[indx][key] += qtyModifier
  setProductList(newProduits)
}

export  const _addQty = (qty: any, indx: any, key: any, productList: any, setProductList: any) => {
  _updateQty(1, indx, key, productList, setProductList)
}


export const _substQty = (qty: any, indx: any, key: any, productList: any, setProductList: any) => {
  if (qty > 1) {
    _updateQty(-1, indx, key, productList, setProductList)
  }
}



export const _updateItem = (productList: any, db: any) => {
  productList?.map((prod: any, indx: any) => {
    return supabase
      .from(db)
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
}

export const _addItem = async (newData: any, filteredInvoice: any, navigate: any, db: any) => {
  const promises = newData?.map((prod: any, indx: any) => {
    return supabase.from(db).insert([
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
    setTimeout(() => {
      navigate('/')
    }, 2500)
  } catch (error) {
    console.log(error)
  }
}

export const _deleteItem = async (unique: any, navigate: any, db: any) => {
  const promises = unique?.map((prodId: any) => {
    return supabase.from(db).delete().eq('id', prodId)
  })
  try {
    await Promise.all(promises)
    setTimeout(() => {
      navigate('/')
    }, 2500)
  } catch (error) {
    console.log(error)
  }
}

export const _handleChangeProduct = (e: any, indx: any, key: any, data: any, setProductList: any) => {
  const newProduits: any = [...data]
  newProduits[indx][key] = key === 'qty' ? parseInt(e.target?.value) : e.target?.value
  setProductList(newProduits)
}
