import { supabase } from "./supabaseClient";

  
  export  const _getUserData = async (setUserdata: any) => {
    let { data: users, error } = await supabase.from("users").select('*, friendArea(*)');
    
    if (users) {
      setUserdata(users);
    }
    if (error){
        console.log(error)
    }
  };

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
  




  export function _getTotalTva(filteredData: any, tva: number) {
    const totalTva = filteredData
      ?.filter((bill: any) => Number(bill.tva) === tva)
      ?.reduce((acc: any, current: any) => acc + current.price * current.tva, 0)
  
    return totalTva ?? 0
  }
  
  export const _htAmount = (filteredData: any) => {
    const ht = filteredData?.reduce(
      (acc: any, current: any) => acc + current.price * current.qty,
      0
    )
    return ht
  }

  export  const _handleAddProduct = (data: any, setData: any) => {
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


  export const _handleCancel = async(id: any, getData: any, db: string, status: string) => {

    const { data, error } = await supabase
  .from(db)
  .update({ status: status })
  .eq('id', id)

  
  if(!error){
    console.log('success')
    getData()
  }



  if(data){
    console.log('success')
  }

  if(error){
    console.log(error)
  }


  }


