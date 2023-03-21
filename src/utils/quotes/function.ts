import { supabase } from '../supabaseClient'


export const _getQuoteById = async (quoteId: any, setData: any) => {
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


export const _getInvoiceById = async (id: any, setData: any) => {
  let { data: factures, error } = await supabase
    .from('invoices2')
    .select('*, detailBill(*)')
    .eq('id', id)
    .single()

  if (factures) {
    setData(factures)
  }
  if (error) {
    console.log(error)
  }
}
